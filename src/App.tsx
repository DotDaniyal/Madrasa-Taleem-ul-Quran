import React, { useState, useEffect, useCallback } from 'react';
import { Language, AdmissionApplication, Announcement, ContactMessage } from './types';
import { 
  PublicWebsiteData, 
  FullAdminData,
  fetchPublicData, 
  getDefaultPublicData, 
  submitOnlineAdmission, 
  submitContactMessage 
} from './services/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Admissions } from './pages/Admissions';
import { Gallery } from './pages/Gallery';
import { Announcements } from './pages/Announcements';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { AdminDashboard } from './pages/AdminDashboard';
import { WeeklySchedule } from './components/WeeklySchedule';
import { DailyTimetable } from './components/DailyTimetable';

export default function App() {
  const [currentLang, setLang] = useState<Language>('ur');
  const [activeTab, setActiveTab] = useState<string>('home');

  // Unified dynamic CMS data from database
  const [cmsData, setCmsData] = useState<PublicWebsiteData>(getDefaultPublicData());
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Sync with backend API on mount
  useEffect(() => {
    fetchPublicData().then(data => {
      setCmsData(data);
      setIsDataLoaded(true);
      if (data.settings?.defaultLang) {
        setLang(data.settings.defaultLang);
      }
    });
  }, []);

  // When admin panel saves changes, update public website state immediately
  const handleDataUpdatedFromAdmin = useCallback((newData: FullAdminData) => {
    setCmsData({
      settings: newData.settings,
      pagesContent: newData.pagesContent,
      programs: newData.programs,
      donationCategories: newData.donationCategories,
      dailyTimetable: newData.dailyTimetable,
      weeklySchedule: newData.weeklySchedule,
      specialHolidays: newData.specialHolidays,
      teachers: newData.teachers,
      announcements: newData.announcements,
      gallery: newData.gallery,
      competitions: newData.competitions,
      competitionResults: newData.competitionResults,
      assessments: newData.assessments,
      examinations: newData.examinations,
      annualAwards: newData.annualAwards,
      navItems: newData.navItems,
      footerConfig: newData.footerConfig,
      seoSettings: newData.seoSettings
    });
  }, []);

  const handleAddApplication = async (newApp: AdmissionApplication) => {
    await submitOnlineAdmission(newApp);
  };

  const handleAddMessage = async (newMsg: ContactMessage) => {
    await submitContactMessage(newMsg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans relative selection:bg-emerald-600 selection:text-white">
      
      {/* Maintenance Mode Notice Banner if enabled by admin */}
      {cmsData.settings.maintenanceMode && (
        <div className="bg-amber-500 text-emerald-950 px-4 py-2 text-center text-xs font-bold font-urdu">
          ⚠️ اطلاعیہ: ویب سائٹ پر اس وقت انتظامی اپ گریڈ کا کام جاری ہے۔
        </div>
      )}

      {/* Navigation Header with dynamic branding and logo */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={cmsData.settings}
        navItemsConfig={cmsData.navItems}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home
            currentLang={currentLang}
            setActiveTab={setActiveTab}
            programs={cmsData.programs}
            announcements={cmsData.announcements}
            gallery={cmsData.gallery}
            settings={cmsData.settings}
            pagesContent={cmsData.pagesContent}
            timetable={cmsData.dailyTimetable}
            schedule={cmsData.weeklySchedule}
            specialHolidays={cmsData.specialHolidays}
            competitions={cmsData.competitions}
            annualAwards={cmsData.annualAwards}
          />
        )}
        {activeTab === 'about' && (
          <About
            currentLang={currentLang}
            teachers={cmsData.teachers}
          />
        )}
        {activeTab === 'programs' && (
          <Programs
            currentLang={currentLang}
            programs={cmsData.programs}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'schedule' && (
          <div className="py-8 space-y-12">
            <DailyTimetable currentLang={currentLang} timetable={cmsData.dailyTimetable} />
            <WeeklySchedule currentLang={currentLang} schedule={cmsData.weeklySchedule} specialHolidays={cmsData.specialHolidays} />
          </div>
        )}
        {activeTab === 'admissions' && (
          <Admissions
            currentLang={currentLang}
            programs={cmsData.programs}
            onAddApplication={handleAddApplication}
          />
        )}
        {activeTab === 'gallery' && (
          <Gallery
            currentLang={currentLang}
            gallery={cmsData.gallery}
          />
        )}
        {activeTab === 'announcements' && (
          <Announcements
            currentLang={currentLang}
            announcements={cmsData.announcements}
          />
        )}
        {activeTab === 'contact' && (
          <Contact
            currentLang={currentLang}
            onAddMessage={handleAddMessage}
          />
        )}
        {activeTab === 'donate' && (
          <Donate
            currentLang={currentLang}
            categories={cmsData.donationCategories}
          />
        )}
        {activeTab === 'admin' && (
          <AdminDashboard
            currentLang={currentLang}
            onDataUpdated={handleDataUpdatedFromAdmin}
          />
        )}
      </main>

      {/* Footer with dynamic settings and copyright */}
      <Footer
        currentLang={currentLang}
        setActiveTab={setActiveTab}
        settings={cmsData.settings}
        footerConfig={cmsData.footerConfig}
      />

    </div>
  );
}
