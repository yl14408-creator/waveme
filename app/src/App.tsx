import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { WavemeV3Landing } from '@/sections/WavemeV3Landing';
import { UploadPage } from '@/sections/UploadPage';
import { TemplatePage } from '@/sections/TemplatePage';
import { EditorPage } from '@/sections/EditorPage';
import { DashboardPage } from '@/sections/DashboardPage';
import { AnalyticsDashboard } from '@/sections/AnalyticsDashboard';
import { AuthPage } from '@/sections/AuthPage';
import { PricingPage } from '@/sections/PricingPage';
import { FAQPage } from '@/sections/FAQPage';
import { ComponentsPage } from '@/sections/ComponentsPage';
import { VisualEditor } from '@/components/VisualEditor';
import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from '@/i18n/index.tsx';
import { downloadHTML } from '@/services/templates-v2';
import type { ResumeData } from '@/types';
import { onAuthStateChange, getCurrentUser, type AuthUser } from '@/services/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('ink-landscape');
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check for existing session on mount (handles OAuth redirect)
    getCurrentUser().then((u) => setUser(u));
    // Listen for future auth state changes
    const unsubscribe = onAuthStateChange((authUser: AuthUser | null) => {
      setUser(authUser);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleResumeData = (data: ResumeData) => {
    setResumeData(data);
  };

  const handleUpdateResumeData = (data: ResumeData) => {
    setResumeData(data);
  };

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <WavemeV3Landing onNavigate={handleNavigate} />;
      case 'upload':
        return (
          <UploadPage 
            onNavigate={handleNavigate} 
            onResumeData={handleResumeData} 
          />
        );
      case 'templates':
        return (
          <TemplatePage
            onNavigate={handleNavigate}
            resumeData={resumeData}
            onSelectTemplate={handleSelectTemplate}
            selectedTemplate={selectedTemplate}
          />
        );
      case 'editor':
        return resumeData ? (
          <EditorPage
            onNavigate={handleNavigate}
            resumeData={resumeData}
            template={selectedTemplate}
            onUpdateResumeData={handleUpdateResumeData}
          />
        ) : (
          <WavemeV3Landing onNavigate={handleNavigate} />
        );
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} onLogin={setUser} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'components':
        return <ComponentsPage onNavigate={handleNavigate} />;
      case 'visual-editor':
        return resumeData ? (
          <VisualEditor
            resumeData={resumeData}
            initialTemplate={selectedTemplate}
            onExport={(html) => downloadHTML(html, `${resumeData.name}_portfolio.html`)}
          />
        ) : (
          <WavemeV3Landing onNavigate={handleNavigate} />
        );
      case 'how-it-works':
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return <WavemeV3Landing onNavigate={handleNavigate} />;
      default:
        return <WavemeV3Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <I18nProvider>
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        <main className="pt-20">
          {renderPage()}
        </main>
        <Toaster />
      </div>
    </I18nProvider>
  );
}

export default App;
