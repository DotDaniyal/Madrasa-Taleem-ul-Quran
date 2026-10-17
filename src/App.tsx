import React, { useState, useEffect } from 'react';
import { Language, AdmissionApplication, Announcement, ContactMessage } from './types';
import { INITIAL_PROGRAMS, INITIAL_ANNOUNCEMENTS, INITIAL_GALLERY, INITIAL_TEACHERS, INITIAL_APPLICATIONS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Admissions } from './pages/Admissions';
import { Gallery } from './pages/Gallery';
import { Announcements } from './pages/Announcements';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { WeeklySchedule } from './components/WeeklySchedule';

export default function App() {
  const [currentLang, setLang] = useState<Language>('ur');
  const [activeTab, setActiveTab] = useState<string>('home');

  // State with localStorage persistence
  const [programs] = useState(INITIAL_PROGRAMS);
  const [teachers] = useState(INITIAL_TEACHERS);
  const [gallery] = useState(INITIAL_GALLERY);

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('tmq_announcements');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    try {
      const saved = localStorage.getItem('tmq_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tmq_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tmq_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('tmq_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('tmq_messages', JSON.stringify(messages));
  }, [messages]);

  const handleAddApplication = (newApp: AdmissionApplication) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleAddMessage = (newMsg: ContactMessage) => {
    setMessages(prev => [newMsg, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans relative selection:bg-emerald-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home
            currentLang={currentLang}
            setActiveTab={setActiveTab}
            programs={programs}
            announcements={announcements}
            gallery={gallery}
          />
        )}
        {activeTab === 'about' && (
          <About
            currentLang={currentLang}
            teachers={teachers}
          />
        )}
        {activeTab === 'programs' && (
          <Programs
            currentLang={currentLang}
            programs={programs}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'schedule' && (
          <div className="py-8">
            <WeeklySchedule currentLang={currentLang} />
          </div>
        )}
        {activeTab === 'admissions' && (
          <Admissions
            currentLang={currentLang}
            programs={programs}
            onAddApplication={handleAddApplication}
          />
        )}
        {activeTab === 'gallery' && (
          <Gallery
            currentLang={currentLang}
            gallery={gallery}
          />
        )}
        {activeTab === 'announcements' && (
          <Announcements
            currentLang={currentLang}
            announcements={announcements}
          />
        )}
        {activeTab === 'contact' && (
          <Contact
            currentLang={currentLang}
            onAddMessage={handleAddMessage}
          />
        )}
        {activeTab === 'admin' && (
          <AdminDashboard
            currentLang={currentLang}
            applications={applications}
            setApplications={setApplications}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
