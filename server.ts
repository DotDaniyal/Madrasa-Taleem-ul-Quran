import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  loadDatabase,
  saveDatabase,
  getPublicData,
  getAdminFullData,
  saveModuleData,
  addOnlineAdmission,
  addContactMessage,
  saveUploadedMedia,
  generateCSV,
  addAuditLog,
  DatabaseSchema
} from './src/server/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsers with high limit for image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve uploaded assets directly
const uploadsDir = path.resolve(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Initialize database on boot
loadDatabase();

// -------------------------------------------------------------
// Public Endpoints
// -------------------------------------------------------------

// 1. Get published public website content & configuration
app.get('/api/public-data', (req: Request, res: Response) => {
  try {
    const data = getPublicData();
    res.json({ success: true, data });
  } catch (err: any) {
    console.error('API /public-data error:', err);
    res.status(500).json({ success: false, error: 'Failed to load public website data' });
  }
});

// 2. Submit admission application from public website
app.post('/api/admissions/submit', (req: Request, res: Response) => {
  try {
    const { studentName, fatherName, age, programId, currentLevelUr, guardianPhone, address, previousMadrasa, notes } = req.body;
    if (!studentName || !fatherName || !guardianPhone || !programId) {
      return res.status(400).json({ success: false, error: 'Missing required admission fields' });
    }
    const newApp = addOnlineAdmission({
      studentName,
      fatherName,
      age: age || '',
      programId,
      currentLevelUr: currentLevelUr || '',
      guardianPhone,
      address: address || '',
      previousMadrasa: previousMadrasa || '',
      notes: notes || '',
      status: 'pending'
    });
    res.json({ success: true, application: newApp, message: 'درخواست کامیابی کے ساتھ موصول ہو گئی ہے۔' });
  } catch (err: any) {
    console.error('API /admissions/submit error:', err);
    res.status(500).json({ success: false, error: 'Failed to submit admission application' });
  }
});

// 3. Submit contact inquiry message
app.post('/api/contact/submit', (req: Request, res: Response) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, phone, and message are required' });
    }
    const newMsg = addContactMessage({
      name,
      phone,
      email: email || '',
      message
    });
    res.json({ success: true, message: 'آپ کا پیغام کامیابی سے موصول ہو گیا ہے۔' });
  } catch (err: any) {
    console.error('API /contact/submit error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// -------------------------------------------------------------
// Authentication Endpoints
// -------------------------------------------------------------

// Active in-memory session tokens for admin sessions
const sessions = new Map<string, { userId: string; username: string; role: string; name: string }>();

app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { username, password, passcode } = req.body;
    const db = loadDatabase();
    
    // Support PIN code '1234' or username/password match
    const pin = passcode || password;
    let foundUser = db.adminUsers.find(
      u => (u.username.toLowerCase() === (username || '').toLowerCase() || pin === '1234') && 
           (u.passwordHash === pin || (pin === '1234' && u.role === 'super_admin'))
    );

    // If passcode 1234 was given with default admin
    if (!foundUser && pin === '1234') {
      foundUser = db.adminUsers[0];
    }

    if (!foundUser) {
      return res.status(401).json({ success: false, error: 'غلط معلومات! صارف نام یا پاس ورڈ درست نہیں ہے۔' });
    }

    if (!foundUser.isActive) {
      return res.status(403).json({ success: false, error: 'یہ اکاؤنٹ غیر فعال ہے۔ برائے مہربانی سپر ایڈمن سے رابطہ کریں۔' });
    }

    // Generate session token
    const token = `tmq-auth-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const sessionData = {
      userId: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
      name: foundUser.name
    };
    sessions.set(token, sessionData);

    // Update last login
    foundUser.lastLogin = new Date().toLocaleString();
    saveDatabase(db);
    addAuditLog(foundUser.name, foundUser.role, 'LOGIN', 'Authentication', `Admin logged in successfully from IP: ${req.ip}`);

    res.json({
      success: true,
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role
      }
    });
  } catch (err: any) {
    console.error('API /auth/login error:', err);
    res.status(500).json({ success: false, error: 'Login error' });
  }
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    sessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out' });
});

// Middleware to authenticate admin requests
function requireAdmin(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: missing authorization token' });
  }
  const token = authHeader.substring(7);
  const session = sessions.get(token);
  if (!session) {
    return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' });
  }
  (req as any).adminUser = session;
  next();
}

// -------------------------------------------------------------
// Admin Management Endpoints
// -------------------------------------------------------------

// 1. Get complete admin dataset
app.get('/api/admin/data', requireAdmin, (req: Request, res: Response) => {
  try {
    const fullData = getAdminFullData();
    res.json({ success: true, data: fullData });
  } catch (err: any) {
    console.error('API /admin/data error:', err);
    res.status(500).json({ success: false, error: 'Failed to load administrative dataset' });
  }
});

// 2. Save any module (settings, pagesContent, students, teachers, etc.)
app.post('/api/admin/save-module', requireAdmin, (req: Request, res: Response) => {
  try {
    const { moduleName, data } = req.body;
    const adminUser = (req as any).adminUser;
    
    if (!moduleName || data === undefined) {
      return res.status(400).json({ success: false, error: 'moduleName and data are required' });
    }

    const updatedDb = saveModuleData(moduleName, data, adminUser);
    res.json({ success: true, data: updatedDb, message: 'تبدیلیاں کامیابی کے ساتھ محفوظ ہو گئیں۔' });
  } catch (err: any) {
    console.error('API /admin/save-module error:', err);
    res.status(500).json({ success: false, error: 'Failed to update module' });
  }
});

// 3. Upload Media image
app.post('/api/admin/upload-media', requireAdmin, (req: Request, res: Response) => {
  try {
    const { filename, base64Data, title, altText } = req.body;
    const adminUser = (req as any).adminUser;

    if (!base64Data || !filename) {
      return res.status(400).json({ success: false, error: 'filename and base64Data are required' });
    }

    const mediaItem = saveUploadedMedia(filename, base64Data, title || '', altText || '', adminUser);
    res.json({ success: true, mediaItem, message: 'تصویر کامیابی کے ساتھ اپ لوڈ ہو گئی۔' });
  } catch (err: any) {
    console.error('API /admin/upload-media error:', err);
    res.status(500).json({ success: false, error: 'Failed to upload media asset' });
  }
});

// 4. Delete Media
app.post('/api/admin/delete-media', requireAdmin, (req: Request, res: Response) => {
  try {
    const { mediaId } = req.body;
    const adminUser = (req as any).adminUser;
    const db = loadDatabase();
    
    const target = db.mediaLibrary.find(m => m.id === mediaId);
    if (!target) {
      return res.status(404).json({ success: false, error: 'Media asset not found' });
    }

    // Try deleting file from disk if it is in uploads
    if (target.url.startsWith('/uploads/')) {
      const diskPath = path.join(__dirname, 'public', target.url);
      if (fs.existsSync(diskPath)) {
        fs.unlinkSync(diskPath);
      }
    }

    db.mediaLibrary = db.mediaLibrary.filter(m => m.id !== mediaId);
    addAuditLog(adminUser.name, adminUser.role, 'DELETE_MEDIA', 'Media Library', `Deleted media asset: ${target.filename}`);
    saveDatabase(db);
    res.json({ success: true, message: 'فائل کامیابی کے ساتھ حذف ہو گئی۔' });
  } catch (err: any) {
    console.error('API /admin/delete-media error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete media' });
  }
});

// 5. Export Database Backup
app.get('/api/admin/backup/export', requireAdmin, (req: Request, res: Response) => {
  try {
    const db = loadDatabase();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=madrasa_backup_${new Date().toISOString().split('T')[0]}.json`);
    res.send(JSON.stringify(db, null, 2));
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Backup export failed' });
  }
});

// 6. Restore Database Backup
app.post('/api/admin/backup/restore', requireAdmin, (req: Request, res: Response) => {
  try {
    const { backupData } = req.body;
    const adminUser = (req as any).adminUser;
    if (!backupData || !backupData.settings) {
      return res.status(400).json({ success: false, error: 'Invalid backup format' });
    }
    saveDatabase(backupData);
    addAuditLog(adminUser.name, adminUser.role, 'RESTORE_BACKUP', 'System', 'Restored complete database from backup snapshot');
    res.json({ success: true, message: 'بیک اپ کامیابی سے بحال کر دیا گیا۔' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Backup restore failed' });
  }
});

// 7. Reset to default seeds
app.post('/api/admin/backup/reset-seeds', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const dbPath = path.join(__dirname, 'data', 'db.json');
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    const freshDb = loadDatabase();
    addAuditLog(adminUser.name, adminUser.role, 'RESET_SEEDS', 'System', 'Reset madrasa database to clean default seed data');
    res.json({ success: true, data: freshDb, message: 'ڈیٹا کامیابی کے ساتھ ابتدائی حالت پر بحال کر دیا گیا۔' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to reset seeds' });
  }
});

// 8. CSV Exports
app.get('/api/admin/export-csv', requireAdmin, (req: Request, res: Response) => {
  try {
    const type = (req.query.type as any) || 'students';
    const csvData = generateCSV(type);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=madrasa_${type}_${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csvData);
  } catch (err: any) {
    res.status(500).send('Failed to generate CSV');
  }
});

// -------------------------------------------------------------
// Vite Dev Server / Static Production Server
// -------------------------------------------------------------

async function startServer() {
  if (!isProduction) {
    // Dynamic import of vite in dev mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the compiled dist directory
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Madrasa System Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
