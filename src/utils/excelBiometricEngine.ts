import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Teacher, Student, TeacherPayroll, FeeVoucher, BiometricPunch, BiometricSettings } from '../types';

export const DEFAULT_BIOMETRIC_SETTINGS: BiometricSettings = {
  officialStartTime: '07:30',
  officialEndTime: '14:00',
  lateGraceMinutes: 10,
  latePenaltyType: 'fixed_amount',
  fixedLatePenaltyAmount: 100,
  latesPerAbsentDay: 3,
  unapprovedAbsentDeductionRate: 'proportional_30',
  workingDaysPerMonth: 30
};

// Helper: parse time HH:mm
function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':');
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
}

// Format date YYYY-MM-DD
export function formatDateISO(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

// Format currency
export function formatPKR(amount: number): string {
  return `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;
}

// -------------------------------------------------------------
// 1. SAMPLE EXCEL TEMPLATE GENERATORS
// -------------------------------------------------------------
export function downloadTeacherSampleTemplate(): void {
  const sampleData = [
    {
      Teacher_ID: 'T-101',
      Full_Name: 'مولانا حافظ عبد الرحمن',
      Phone_Number: '03001234567',
      Department_Program: 'حفظ القرآن',
      Base_Monthly_Salary: 35000,
      Joining_Date: '2024-01-15'
    },
    {
      Teacher_ID: 'T-102',
      Full_Name: 'قاری محمد عثمان',
      Phone_Number: '03129876543',
      Department_Program: 'ناظرہ و تجوید',
      Base_Monthly_Salary: 30000,
      Joining_Date: '2024-03-01'
    }
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Teachers_Sample');
  XLSX.writeFile(wb, 'Madrasa_Teachers_Import_Template.xlsx');
}

export function downloadStudentSampleTemplate(): void {
  const sampleData = [
    {
      Roll_No: '1001',
      Full_Name: 'محمد احمد',
      Parent_Name: 'عبد اللہ',
      Parent_Phone: '03001122334',
      Program: 'حفظ القرآن',
      Monthly_Fee: 2000,
      Admission_Date: '2025-01-10'
    },
    {
      Roll_No: '1002',
      Full_Name: 'حسان بن ثابت',
      Parent_Name: 'محمد فاروق',
      Parent_Phone: '03335556677',
      Program: 'ناظرہ قرآن',
      Monthly_Fee: 1500,
      Admission_Date: '2025-02-01'
    }
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Students_Sample');
  XLSX.writeFile(wb, 'Madrasa_Students_Import_Template.xlsx');
}

// -------------------------------------------------------------
// 2. EXCEL / CSV BULK IMPORTERS
// -------------------------------------------------------------
export async function parseTeachersFile(file: File): Promise<Partial<Teacher>[]> {
  const data = await readFileAsRows(file);
  const teachers: Partial<Teacher>[] = [];

  data.forEach((row: any, idx: number) => {
    const teacherId = String(row.Teacher_ID || row.Biometric_ID || row.ID || `T-${101 + idx}`).trim();
    const fullName = String(row.Full_Name || row.Name || row.Teacher_Name || '').trim();
    if (!fullName) return;

    const phoneNumber = String(row.Phone_Number || row.Phone || row.Contact || '03000000000').trim();
    const programId = String(row.Department_Program || row.Program || row.Department || 'hifz').trim();
    const baseSalary = parseFloat(row.Base_Monthly_Salary || row.Salary || row.Monthly_Salary || '25000') || 25000;
    const joiningDate = String(row.Joining_Date || row.Date || formatDateISO()).trim();

    teachers.push({
      id: teacherId,
      biometricId: teacherId,
      fullName,
      phoneNumber,
      programId,
      baseSalary,
      joiningDate,
      status: 'active'
    });
  });

  return teachers;
}

export async function parseStudentsFile(file: File): Promise<Partial<Student>[]> {
  const data = await readFileAsRows(file);
  const students: Partial<Student>[] = [];

  data.forEach((row: any, idx: number) => {
    const rollNo = String(row.Roll_No || row.ID || row.RollNo || `${1001 + idx}`).trim();
    const fullName = String(row.Full_Name || row.Name || row.Student_Name || '').trim();
    if (!fullName) return;

    const parentName = String(row.Parent_Name || row.Father_Name || row.Guardian || '').trim();
    const parentPhone = String(row.Parent_Phone || row.Phone || row.Contact || '03000000000').trim();
    const programId = String(row.Program || row.Department || 'nazra').trim();
    const monthlyFee = parseFloat(row.Monthly_Fee || row.Fee || row.MonthlyFee || '1500') || 1500;
    const admissionDate = String(row.Admission_Date || row.Date || formatDateISO()).trim();

    students.push({
      id: `std-${rollNo}`,
      rollNo,
      fullName,
      parentName,
      parentPhone,
      programId,
      monthlyFee,
      admissionDate,
      status: 'active'
    });
  });

  return students;
}

// -------------------------------------------------------------
// 3. BIOMETRIC ATTENDANCE LOG PARSER
// -------------------------------------------------------------
export async function parseBiometricLogs(
  file: File, 
  settings: BiometricSettings = DEFAULT_BIOMETRIC_SETTINGS
): Promise<BiometricPunch[]> {
  const rows = await readFileAsRows(file);
  const punchesByTeacherDate: Record<string, { biometricId: string; date: string; rawPunches: string[] }> = {};

  rows.forEach((row: any) => {
    const biometricId = String(
      row.User_ID || row.Biometric_ID || row.UserID || row.ID || row.Badgenumber || row['User ID'] || row['Biometric ID'] || row.UserNo || ''
    ).trim();

    if (!biometricId) return;

    let dateStr = '';
    let timeStr = '';

    // Handle combined DateTime column vs separate Date & Time
    const dateTime = row.DateTime || row.PunchTime || row.Time_Punch || row['Punch Time'] || row['Log Time'] || row.LogDate;
    if (dateTime) {
      const dtObj = new Date(dateTime);
      if (!isNaN(dtObj.getTime())) {
        dateStr = dtObj.toISOString().split('T')[0];
        timeStr = dtObj.toTimeString().split(' ')[0];
      } else {
        const parts = String(dateTime).split(' ');
        if (parts.length >= 2) {
          dateStr = parts[0];
          timeStr = parts[1];
        }
      }
    } else {
      dateStr = String(row.Date || row.Log_Date || formatDateISO()).trim();
      timeStr = String(row.Time || row.Log_Time || '07:30:00').trim();
    }

    if (!dateStr) return;

    const key = `${biometricId}_${dateStr}`;
    if (!punchesByTeacherDate[key]) {
      punchesByTeacherDate[key] = { biometricId, date: dateStr, rawPunches: [] };
    }
    if (timeStr && !punchesByTeacherDate[key].rawPunches.includes(timeStr)) {
      punchesByTeacherDate[key].rawPunches.push(timeStr);
    }
  });

  const officialStartMins = parseTimeToMinutes(settings.officialStartTime);
  const graceMins = settings.lateGraceMinutes || 10;
  const lateCutoffMins = officialStartMins + graceMins;

  const resultPunches: BiometricPunch[] = [];

  Object.values(punchesByTeacherDate).forEach(item => {
    item.rawPunches.sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b));

    const checkInTime = item.rawPunches[0] || '07:30:00';
    const checkOutTime = item.rawPunches.length > 1 ? item.rawPunches[item.rawPunches.length - 1] : undefined;

    const checkInMins = parseTimeToMinutes(checkInTime);
    let status: BiometricPunch['status'] = 'on-time';
    let lateMinutes = 0;

    if (checkInMins > lateCutoffMins) {
      status = 'late';
      lateMinutes = checkInMins - officialStartMins;
    }

    // Half day check if check-in is later than 11:00 AM
    if (checkInMins >= 11 * 60) {
      status = 'half-day';
    }

    resultPunches.push({
      id: `punch-${item.biometricId}-${item.date}`,
      biometricId: item.biometricId,
      teacherId: item.biometricId,
      date: item.date,
      checkInTime,
      checkOutTime,
      status,
      lateMinutes,
      rawPunches: item.rawPunches
    });
  });

  return resultPunches;
}

// Helper to read CSV/XLSX or TXT file into generic JSON row objects
async function readFileAsRows(file: File): Promise<any[]> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'xlsx' || extension === 'xls') {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  // Text / CSV
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err)
    });
  });
}

// -------------------------------------------------------------
// 4. PAYROLL CALCULATION ENGINE
// -------------------------------------------------------------
export function calculateTeacherPayroll(
  monthYear: string, // "YYYY-MM"
  teachers: Teacher[],
  punches: BiometricPunch[],
  existingPayrolls: TeacherPayroll[] = [],
  settings: BiometricSettings = DEFAULT_BIOMETRIC_SETTINGS
): TeacherPayroll[] {
  const [yearStr, monthStr] = monthYear.split('-');
  const year = parseInt(yearStr, 10) || new Date().getFullYear();
  const daysInMonth = settings.workingDaysPerMonth || 30;

  return teachers.map(teacher => {
    const bioId = teacher.biometricId || teacher.id;
    
    // Find punches for this teacher in this month
    const teacherPunches = punches.filter(p => {
      const isTeacher = p.biometricId === bioId || p.teacherId === teacher.id;
      return isTeacher && p.date.startsWith(monthYear);
    });

    const presentCount = teacherPunches.filter(p => p.status === 'on-time' || p.status === 'late').length;
    const lateCount = teacherPunches.filter(p => p.status === 'late').length;
    const halfDayCount = teacherPunches.filter(p => p.status === 'half-day').length;
    const leaveCount = teacherPunches.filter(p => p.status === 'leave').length;

    // Absent count: working days - (present + halfDay/2 + leave)
    const trackedDays = presentCount + halfDayCount + leaveCount;
    const unapprovedAbsents = Math.max(0, daysInMonth - trackedDays);

    const teacherSalary = teacher.baseSalary || 25000;
    const teacherName = teacher.fullName || teacher.nameUr || teacher.nameEn || 'استاد';

    // Calculate Late Penalty
    let latePenalty = 0;
    if (settings.latePenaltyType === 'fixed_amount') {
      latePenalty = lateCount * (settings.fixedLatePenaltyAmount || 100);
    } else {
      const latesPerDay = settings.latesPerAbsentDay || 3;
      const penaltyDays = Math.floor(lateCount / latesPerDay);
      latePenalty = Math.round(penaltyDays * (teacherSalary / daysInMonth));
    }

    // Calculate Absent Deduction
    const dailyWage = teacherSalary / daysInMonth;
    const absentDeduction = Math.round((unapprovedAbsents * dailyWage) + (halfDayCount * dailyWage * 0.5));

    // Preserve existing bonus or payment status if already created
    const existing = existingPayrolls.find(p => p.teacherId === teacher.id && p.month === monthYear);
    const bonusAmount = existing?.bonusAmount || 0;
    const netSalary = Math.max(0, Math.round(teacherSalary - latePenalty - absentDeduction + bonusAmount));

    return {
      id: existing?.id || `payroll-${teacher.id}-${monthYear}`,
      teacherId: teacher.id,
      teacherName,
      biometricId: bioId,
      month: monthYear,
      year,
      baseSalary: teacherSalary,
      baseAmount: teacherSalary,
      workingDays: daysInMonth,
      presentDays: presentCount,
      lateArrivalsCount: lateCount,
      latePenaltyDeduction: latePenalty,
      absentDaysCount: unapprovedAbsents,
      absentDeduction,
      bonusAmount,
      deductions: latePenalty + absentDeduction,
      netSalary,
      netAmount: netSalary,
      status: existing?.status || 'unpaid',
      paymentDate: existing?.paymentDate,
      paymentMethod: existing?.paymentMethod,
      referenceNo: existing?.referenceNo
    };
  });
}

// -------------------------------------------------------------
// 5. FEE VOUCHER GENERATOR
// -------------------------------------------------------------
export function generateMonthlyFeeVouchers(
  monthYear: string, // "YYYY-MM"
  students: Student[],
  existingVouchers: FeeVoucher[] = []
): FeeVoucher[] {
  const [yearStr] = monthYear.split('-');
  const year = parseInt(yearStr, 10) || new Date().getFullYear();

  const updatedVouchers = [...existingVouchers];

  students.forEach(student => {
    if (student.status !== 'active') return;

    const exists = updatedVouchers.some(v => v.studentId === student.id && v.month === monthYear);
    if (!exists) {
      updatedVouchers.push({
        id: `voucher-${student.id}-${monthYear}`,
        studentId: student.id,
        studentRollNo: student.rollNo,
        studentName: student.fullName,
        parentName: student.parentName,
        programId: student.programId,
        month: monthYear,
        year,
        amount: student.monthlyFee || 1500,
        status: 'unpaid'
      });
    }
  });

  return updatedVouchers;
}

// -------------------------------------------------------------
// 6. EXCEL EXPORT ENGINE
// -------------------------------------------------------------
export function exportToExcel(filename: string, sheetName: string, data: any[]): void {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}_${formatDateISO()}.xlsx`);
}
