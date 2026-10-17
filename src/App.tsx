import React, { useState, useEffect } from 'react';
import { CalligraphyFont, Language, AdmissionApplication, Announcement, ContactMessage } from './types';
import { INITIAL_PROGRAMS, INITIAL_ANNOUNCEMENTS, INITIAL_GALLERY, INITIAL_TEACHERS, INITIAL_APPLICATIONS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CalligraphyFontPicker } from './components/CalligraphyFontPicker';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Admissions } from './pages/Admissions';
import { Gallery } from './pages/Gallery';
import { Announcements } from './pages/Announcements';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentLang, setLang] = useState<Language>('ur');
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Calligraphy Font with localStorage persistence
  const [currentFont, setFont] = useState<CalligraphyFont>(() => {
    const saved = localStorage.getItem('tmq_calligraphy_font');
    return (saved as CalligraphyFont) || 'nastaliq';
  });

  // State with localStorage persistence
  const [programs] = useState(INITIAL_PROGRAMS);
  const [teachers] = useState(INITIAL_TEACHERS);
  const [gallery] = useState(INITIAL_GALLERY);

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('tmq_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem('tmq_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('tmq_messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tmq_calligraphy_font', currentFont);
  }, [currentFont]);

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans relative">
      
      {/* Navigation Header */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentFont={currentFont}
        setFont={setFont}
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
            currentFont={currentFont}
            setFont={setFont}
          />
        )}
        {activeTab === 'about' && (
          <About
            currentLang={currentLang}
            teachers={teachers}
            currentFont={currentFont}
          />
        )}
        {activeTab === 'programs' && (
          <Programs
            currentLang={currentLang}
            programs={programs}
            setActiveTab={setActiveTab}
            currentFont={currentFont}
          />
        )}
        {activeTab === 'admissions' && (
          <Admissions
            currentLang={currentLang}
            programs={programs}
            onAddApplication={handleAddApplication}
            currentFont={currentFont}
          />
        )}
        {activeTab === 'gallery' && (
          <Gallery
            currentLang={currentLang}
            gallery={gallery}
            currentFont={currentFont}
          />
        )}
        {activeTab === 'announcements' && (
          <Announcements
            currentLang={currentLang}
            announcements={announcements}
            currentFont={currentFont}
          />
        )}
        {activeTab === 'contact' && (
          <Contact
            currentLang={currentLang}
            onAddMessage={handleAddMessage}
            currentFont={currentFont}
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
            currentFont={currentFont}
          />
        )}
      </main>

      {/* Calligraphy Font Picker Floating Widget */}
      <CalligraphyFontPicker
        currentFont={currentFont}
        setFont={setFont}
        currentLang={currentLang}
      />

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        setActiveTab={setActiveTab}
        currentFont={currentFont}
      />

    </div>
  );
}
