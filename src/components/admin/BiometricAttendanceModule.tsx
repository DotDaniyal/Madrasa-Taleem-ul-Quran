import React, { useState } from 'react';
import { Teacher, BiometricPunch, BiometricSettings } from '../../types';
import { 
  parseBiometricLogs, 
  DEFAULT_BIOMETRIC_SETTINGS, 
  formatDateISO 
} from '../../utils/excelBiometricEngine';
import { 
  Upload, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Settings, 
  Filter, 
  Search, 
  UserCheck, 
  Calendar, 
  Info, 
  Save, 
  RefreshCw 
} from 'lucide-react';

interface BiometricAttendanceModuleProps {
  teachers: Teacher[];
  punches: BiometricPunch[];
  settings?: BiometricSettings;
  onSavePunches: (newPunches: BiometricPunch[]) => void;
  onSaveSettings: (newSettings: BiometricSettings) => void;
  isUrdu: boolean;
}

export const BiometricAttendanceModule: React.FC<BiometricAttendanceModuleProps> = ({
  teachers,
  punches = [],
  settings = DEFAULT_BIOMETRIC_SETTINGS,
  onSavePunches,
  onSaveSettings,
  isUrdu
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(formatDateISO());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string>('');

  // Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [tempSettings, setTempSettings] = useState<BiometricSettings>(settings);

  // Manual Punch Modal
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualTeacherId, setManualTeacherId] = useState<string>('');
  const [manualCheckIn, setManualCheckIn] = useState<string>('07:30');
  const [manualCheckOut, setManualCheckOut] = useState<string>('14:00');
  const [manualStatus, setManualStatus] = useState<BiometricPunch['status']>('on-time');
  const [manualNotes, setManualNotes] = useState<string>('');

  // Handle Biometric Log Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const parsedPunches = await parseBiometricLogs(file, settings);
      if (parsedPunches.length === 0) {
        alert(isUrdu ? 'فائل میں کوئی پنچ ریکارڈ نہیں ملا' : 'No biometric punch records found in file.');
        setIsUploading(false);
        return;
      }

      // Merge parsed punches with existing
      const existingMap = new Map(punches.map(p => [`${p.biometricId}_${p.date}`, p]));
      parsedPunches.forEach(p => {
        existingMap.set(`${p.biometricId}_${p.date}`, p);
      });

      const updatedList = Array.from(existingMap.values());
      onSavePunches(updatedList);

      setUploadSuccessMsg(
        isUrdu 
          ? `بائیو میٹرک فائل سے ${parsedPunches.length} ریکارڈز کامیا بی سے اپلوڈ ہو گئے!` 
          : `Successfully imported ${parsedPunches.length} biometric punch records!`
      );
      setTimeout(() => setUploadSuccessMsg(''), 5000);
    } catch (err: any) {
      alert((isUrdu ? 'فائل پروسیسنگ میں خرابی: ' : 'Error processing file: ') + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Add manual punch
  const handleSaveManualPunch = () => {
    if (!manualTeacherId) {
      alert(isUrdu ? 'براہِ کرم استاد منتخب کریں' : 'Please select a teacher.');
      return;
    }

    const teacher = teachers.find(t => t.id === manualTeacherId);
    const bioId = teacher?.biometricId || teacher?.id || manualTeacherId;

    const newPunch: BiometricPunch = {
      id: `punch-manual-${bioId}-${selectedDate}-${Date.now()}`,
      biometricId: bioId,
      teacherId: teacher?.id,
      date: selectedDate,
      checkInTime: manualCheckIn,
      checkOutTime: manualCheckOut,
      status: manualStatus,
      adminNotes: manualNotes || (isUrdu ? 'ایڈمن مینول اندراج' : 'Manual Admin Adjustment')
    };

    const existingMap = new Map(punches.map(p => [`${p.biometricId}_${p.date}`, p]));
    existingMap.set(`${bioId}_${selectedDate}`, newPunch);

    onSavePunches(Array.from(existingMap.values()));
    setShowManualModal(false);
    setManualNotes('');
  };

  // Filtered punches
  const datePunches = punches.filter(p => p.date === selectedDate);

  // Compute metrics for selected date
  const totalTeachers = teachers.length;
  const onTimeCount = datePunches.filter(p => p.status === 'on-time').length;
  const lateCount = datePunches.filter(p => p.status === 'late').length;
  const halfDayCount = datePunches.filter(p => p.status === 'half-day').length;
  const presentTotal = onTimeCount + lateCount + halfDayCount;
  const absentCount = Math.max(0, totalTeachers - presentTotal);

  const displayRows = teachers.map(t => {
    const bioId = t.biometricId || t.id;
    const punch = datePunches.find(p => p.biometricId === bioId || p.teacherId === t.id);
    return {
      teacher: t,
      punch: punch || {
        id: `absent-${t.id}-${selectedDate}`,
        biometricId: bioId,
        teacherId: t.id,
        date: selectedDate,
        status: 'absent' as const
      }
    };
  }).filter(({ teacher, punch }) => {
    const tName = teacher.fullName || teacher.nameUr || teacher.nameEn || '';
    const matchesSearch = tName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (teacher.biometricId || '').includes(searchQuery);
    if (!matchesSearch) return false;
    if (filterStatus === 'all') return true;
    return punch.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-urdu">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>{isUrdu ? 'بائیو میٹرک ڈیوائس حاضری سسٹم' : 'Biometric Device Machine Integration'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-urdu mt-1">
            {isUrdu ? 'اساتذہ ڈیوائس حاضری لاگز و پینل' : 'Teacher Attendance Logs & Device Import'}
          </h2>
          <p className="text-xs text-slate-500 font-urdu">
            {isUrdu ? 'ZKTeco / Hikvision / USB ڈیوائسز سے پنچ فائلیں اپلوڈ کریں اور خودکار تاخیر چیک کریں' : 'Import USB/Excel/CSV attendance punch logs directly'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Biometric Settings Button */}
          <button
            onClick={() => {
              setTempSettings(settings);
              setShowSettingsModal(true);
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer font-urdu"
          >
            <Settings className="w-4 h-4 text-emerald-800" />
            <span>{isUrdu ? 'ڈیوائس اور جرمانہ سیٹنگز' : 'Device Penalty Rules'}</span>
          </button>

          {/* Manual Entry Modal Button */}
          <button
            onClick={() => setShowManualModal(true)}
            className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer font-urdu shadow-md shadow-emerald-900/10"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{isUrdu ? 'مینول حاضری درج کریں' : 'Manual Attendance'}</span>
          </button>

          {/* Upload Biometric File Button */}
          <label className="bg-amber-500 hover:bg-amber-400 text-emerald-950 px-5 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer font-urdu shadow-lg shadow-amber-500/20">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? (isUrdu ? 'اپلوڈ جاری...' : 'Uploading...') : (isUrdu ? 'ڈیوائس پنچ فائل اپلوڈ' : 'Upload Biometric File')}</span>
            <input 
              type="file" 
              accept=".csv, .xlsx, .xls, .txt" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {uploadSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl font-bold text-sm flex items-center gap-2 font-urdu animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{uploadSuccessMsg}</span>
        </div>
      )}

      {/* Date Selector & Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Date Selector Card */}
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-5 rounded-3xl shadow-sm space-y-2">
          <span className="text-xs text-amber-300 font-bold font-urdu flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {isUrdu ? 'حاضری تاریخ منتخب کریں' : 'Select Date'}
          </span>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-white/10 border border-emerald-500/40 text-white rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* On Time Stat */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-urdu">{isUrdu ? 'وقت پر حاضر' : 'On-Time'}</span>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-0.5">{onTimeCount}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Late Stat */}
        <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-urdu">{isUrdu ? 'تاخیر (لیٹ)' : 'Late Arrival'}</span>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-0.5">{lateCount}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Half Day Stat */}
        <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-urdu">{isUrdu ? 'ہاف ڈے' : 'Half-Day'}</span>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-0.5">{halfDayCount}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Absent Stat */}
        <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-urdu">{isUrdu ? 'غیر حاضر' : 'Absent'}</span>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-0.5">{absentCount}</h3>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUrdu ? 'استاد یا بائیو میٹرک شناختی نام تلاش کریں...' : 'Search teacher name or ID...'}
            className="w-full ps-9 pe-4 py-2 border border-slate-200 rounded-xl text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-600 font-urdu">{isUrdu ? 'فلٹر سٹیٹس:' : 'Status:'}</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-800"
          >
            <option value="all">{isUrdu ? 'تمام سٹیٹس' : 'All Statuses'}</option>
            <option value="on-time">{isUrdu ? 'وقت پر حاضر' : 'On-Time'}</option>
            <option value="late">{isUrdu ? 'تاخیر (لیٹ)' : 'Late'}</option>
            <option value="half-day">{isUrdu ? 'ہاف ڈے' : 'Half-Day'}</option>
            <option value="absent">{isUrdu ? 'غیر حاضر' : 'Absent'}</option>
          </select>
        </div>
      </div>

      {/* Attendance Punch Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs text-slate-700">
            <thead className="bg-emerald-950 text-white font-urdu">
              <tr>
                <th className="p-4 text-start">#</th>
                <th className="p-4 text-start">{isUrdu ? 'استاد گرامی' : 'Teacher Name'}</th>
                <th className="p-4 text-start">{isUrdu ? 'بائیو میٹرک ID' : 'Biometric ID'}</th>
                <th className="p-4 text-start">{isUrdu ? 'چیک ان وقت' : 'Check-In'}</th>
                <th className="p-4 text-start">{isUrdu ? 'چیک آؤٹ وقت' : 'Check-Out'}</th>
                <th className="p-4 text-start">{isUrdu ? 'سٹیٹس' : 'Status'}</th>
                <th className="p-4 text-start">{isUrdu ? 'تفصیل / نوٹس' : 'Notes'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-urdu">
              {displayRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-urdu">
                    {isUrdu ? 'منتخب فلٹر کے مطابق کوئی بائیو میٹرک حاضری لاگ نہیں ملا' : 'No biometric attendance logs found.'}
                  </td>
                </tr>
              ) : (
                displayRows.map(({ teacher, punch }, index) => {
                  let statusBadge = (
                    <span className="bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      {isUrdu ? 'غیر حاضر' : 'Absent'}
                    </span>
                  );

                  if (punch.status === 'on-time') {
                    statusBadge = (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isUrdu ? 'وقت پر حاضر' : 'On-Time'}
                      </span>
                    );
                  } else if (punch.status === 'late') {
                    statusBadge = (
                      <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {isUrdu ? `تاخیر (${punch.lateMinutes || 15} منٹ)` : `Late (${punch.lateMinutes || 15}m)`}
                      </span>
                    );
                  } else if (punch.status === 'half-day') {
                    statusBadge = (
                      <span className="bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {isUrdu ? 'ہاف ڈے' : 'Half-Day'}
                      </span>
                    );
                  }

                  return (
                    <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-400">{index + 1}</td>
                      <td className="p-4 font-bold text-slate-900">{teacher.fullName}</td>
                      <td className="p-4 font-mono font-bold text-emerald-800">{teacher.biometricId || teacher.id}</td>
                      <td className="p-4 font-mono">{punch.checkInTime || '--:--'}</td>
                      <td className="p-4 font-mono">{punch.checkOutTime || '--:--'}</td>
                      <td className="p-4">{statusBadge}</td>
                      <td className="p-4 text-slate-500 text-[11px]">{punch.adminNotes || '--'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Biometric Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-urdu">
                {isUrdu ? 'ڈیوائس اور حاضری جرمانہ اصول' : 'Biometric Penalty & Device Rules'}
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-urdu text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">{isUrdu ? 'مدرسہ آمد کی سرکاری ٹائمنگ' : 'Official Start Time'}</label>
                  <input 
                    type="time" 
                    value={tempSettings.officialStartTime} 
                    onChange={e => setTempSettings({ ...tempSettings, officialStartTime: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">{isUrdu ? 'رعایتی منٹ (Grace Period)' : 'Grace Period (Mins)'}</label>
                  <input 
                    type="number" 
                    value={tempSettings.lateGraceMinutes} 
                    onChange={e => setTempSettings({ ...tempSettings, lateGraceMinutes: parseInt(e.target.value, 10) || 0 })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">{isUrdu ? 'تاخیر (لیٹ) کی کٹوتی کا طریقہ' : 'Late Penalty Deduction Mode'}</label>
                <select 
                  value={tempSettings.latePenaltyType}
                  onChange={e => setTempSettings({ ...tempSettings, latePenaltyType: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs"
                >
                  <option value="fixed_amount">{isUrdu ? 'فی لیٹ آمد فکس رقم کٹوتی (مثلاً 100 روپے)' : 'Fixed Penalty per late (e.g. Rs 100)'}</option>
                  <option value="late_rule_days">{isUrdu ? '3 لیٹ = 1 دن کی غیر حاضری کی تنخواہ کٹوتی' : 'Rule: N Lates = 1 Day Absent Salary'}</option>
                </select>
              </div>

              {tempSettings.latePenaltyType === 'fixed_amount' ? (
                <div>
                  <label className="font-bold block mb-1">{isUrdu ? 'فی لیٹ آمد کٹوتی رقم (روپے)' : 'Fixed Late Penalty Amount (PKR)'}</label>
                  <input 
                    type="number" 
                    value={tempSettings.fixedLatePenaltyAmount} 
                    onChange={e => setTempSettings({ ...tempSettings, fixedLatePenaltyAmount: parseInt(e.target.value, 10) || 0 })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="font-bold block mb-1">{isUrdu ? 'کتنی لیٹ آمد پر 1 دن کی غیر حاضری شمار ہو؟' : 'Lates Count per 1 Day Absent'}</label>
                  <input 
                    type="number" 
                    value={tempSettings.latesPerAbsentDay} 
                    onChange={e => setTempSettings({ ...tempSettings, latesPerAbsentDay: parseInt(e.target.value, 10) || 3 })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 font-urdu">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
              >
                {isUrdu ? 'منسوخ' : 'Cancel'}
              </button>
              <button 
                onClick={() => {
                  onSaveSettings(tempSettings);
                  setShowSettingsModal(false);
                }}
                className="px-5 py-2 bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>{isUrdu ? 'قوانین محفوظ کریں' : 'Save Rules'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-extrabold text-slate-900 font-urdu">
                {isUrdu ? 'مینول حاضری اندراج' : 'Manual Attendance Entry'}
              </h3>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-urdu">
              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'استاد گرامی منتخب کریں' : 'Select Teacher'}</label>
                <select 
                  value={manualTeacherId} 
                  onChange={e => setManualTeacherId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-urdu"
                >
                  <option value="">{isUrdu ? '-- استاد منتخب کریں --' : '-- Select Teacher --'}</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.fullName} (ID: {t.biometricId || t.id})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'آمد وقت (Check-In)' : 'Check-In Time'}</label>
                  <input 
                    type="time" 
                    value={manualCheckIn} 
                    onChange={e => setManualCheckIn(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'روانگی وقت (Check-Out)' : 'Check-Out Time'}</label>
                  <input 
                    type="time" 
                    value={manualCheckOut} 
                    onChange={e => setManualCheckOut(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'حاضری سٹیٹس' : 'Attendance Status'}</label>
                <select 
                  value={manualStatus} 
                  onChange={e => setManualStatus(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-urdu"
                >
                  <option value="on-time">{isUrdu ? 'وقت پر حاضر' : 'On-Time'}</option>
                  <option value="late">{isUrdu ? 'تاخیر (لیٹ)' : 'Late'}</option>
                  <option value="half-day">{isUrdu ? 'ہاف ڈے' : 'Half-Day'}</option>
                  <option value="absent">{isUrdu ? 'غیر حاضر' : 'Absent'}</option>
                  <option value="leave">{isUrdu ? 'منظور شدہ رخصت' : 'Approved Leave'}</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'نوٹس / وجہ' : 'Admin Reason / Notes'}</label>
                <input 
                  type="text" 
                  value={manualNotes} 
                  onChange={e => setManualNotes(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً: ڈیوائس خرابی کی وجہ سے مینول انٹری' : 'Reason for manual punch'}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-urdu"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 font-urdu">
              <button 
                onClick={() => setShowManualModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
              >
                {isUrdu ? 'منسوخ' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveManualPunch}
                className="px-5 py-2 bg-emerald-900 text-white rounded-xl font-bold"
              >
                {isUrdu ? 'اندراج محفوظ کریں' : 'Save Punch'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
