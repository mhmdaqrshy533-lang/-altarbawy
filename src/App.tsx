/** * @license * SPDX-License-Identifier: Apache-2.0 */
import React from 'react';
import Dashboard from './components/Dashboard';
import FinalResults from './pages/FinalResults';
import DailyPlan from './pages/DailyPlan';
import Attendance from './pages/Attendance';
import ExamEditor from './editor/ExamEditor';
import AnalyticalDashboard from './pages/AnalyticalDashboard';
import TimetableScheduler from './pages/TimetableScheduler';
import BubbleSheetProcessor from './pages/BubbleSheetProcessor';
import Badges from './pages/Badges';
import Certificates from './pages/Certificates';
import MobileEducationalApp from './pages/MobileEducationalApp';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Construction } from 'lucide-react';
import MistarEduOS from './pages/MistarEduOS';
import NotificationCenter from './components/NotificationCenter';
import { useOS } from './context/OSContext';
import { MainLayout } from './components/layout/MainLayout';
import SmartGrading from './pages/SmartGrading';
import GradeRecords from './pages/GradeRecords';
import SmartMemos from './pages/SmartMemos';
import BookStudio from './pages/BookStudio';
import OfficialMemos from './pages/OfficialMemos';
import TermPlan from './pages/TermPlan';
import Archive from './pages/Archive';
import ExportCenter from './pages/ExportCenter';
import Settings from './pages/Settings';
import BubbleSheets from './pages/BubbleSheets';
import QuestionBank from './pages/QuestionBank';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import TeacherServicesPage from './pages/TeacherServicesPage';
import StudentServicesPage from './pages/StudentServicesPage';
import ParentServicesPage from './pages/ParentServicesPage';
import AutomationCenterPage from './pages/AutomationCenterPage';
import { TemplateCenter } from './pages/TemplateCenter';
import { StandardsCenterPage } from './pages/StandardsCenterPage';
import { Section } from './types';

export default function App() {
  const { activeApplet, launchApplet } = useOS();
  const activePage = activeApplet || 'dashboard';
  const setActivePage = launchApplet;

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onSelect={setActivePage} onOpenBadges={() => setActivePage('badges')} />;
      case 'teacher_services':
        return <TeacherServicesPage onBack={() => setActivePage('dashboard')} onSelect={setActivePage} />;
      case 'student_services':
        return <StudentServicesPage onBack={() => setActivePage('dashboard')} onSelect={setActivePage} />;
      case 'parent_services':
        return <ParentServicesPage onBack={() => setActivePage('dashboard')} onSelect={setActivePage} />;
      case 'automation_center':
        return <AutomationCenterPage onBack={() => setActivePage('dashboard')} onSelect={setActivePage} />;
      case 'students_page':
        return <StudentsPage onBack={() => setActivePage('dashboard')} />;
      case 'teachers_page':
        return <TeachersPage onBack={() => setActivePage('dashboard')} />;
      case 'analytical_dashboard':
      case 'dashboard_overview':
        return <AnalyticalDashboard onBack={() => setActivePage('dashboard')} />;
      case 'document_editor':
        return <OfficialMemos onBack={() => setActivePage('dashboard')} />;
      case 'exams_section':
        return <ExamEditor />;
      case 'attendance_section':
        return <Attendance onBack={() => setActivePage('dashboard')} />;
      case 'grades_section':
        return <GradeRecords onBack={() => setActivePage('dashboard')} />;
      case 'student_affairs':
        return <Badges onBack={() => setActivePage('dashboard')} />;
      case 'plans_section':
        return <DailyPlan onBack={() => setActivePage('dashboard')} />;
      case 'question_bank':
        return <QuestionBank onBack={() => setActivePage('dashboard')} />;
      case 'bubble_sheets':
        return <BubbleSheets onBack={() => setActivePage('dashboard')} />;
      case 'certificates_section':
        return <Certificates onBack={() => setActivePage('dashboard')} />;
      case 'mobile_app':
        return <StudentsPage onBack={() => setActivePage('dashboard')} />;
      case 'archive_section':
        return <Archive onBack={() => setActivePage('dashboard')} />;
      case 'standards_center':
        return <StandardsCenterPage onBack={() => setActivePage('dashboard')} />;
      case 'templates_gallery':
        return <TemplateCenter onBack={() => setActivePage('dashboard')} />;
      case 'library_section':
        return <SmartMemos onBack={() => setActivePage('dashboard')} />;
      case 'teacher_tools':
        return <TimetableScheduler onBack={() => setActivePage('dashboard')} />;
      case 'ai_section':
        return <MistarEduOS onBack={() => setActivePage('dashboard')} />;
      case 'print_export':
        return <ExportCenter onBack={() => setActivePage('dashboard')} />;
      case 'settings':
        return <Settings onBack={() => setActivePage('dashboard')} />;
            
      case 'reports_section':
        return <AnalyticalDashboard onBack={() => setActivePage('dashboard')} />;
      case 'timetables_section':
        return <TimetableScheduler onBack={() => setActivePage('dashboard')} />;
      case 'worksheets_section':
        return <OfficialMemos onBack={() => setActivePage('dashboard')} />;
      case 'forms_section':
        return <Badges onBack={() => setActivePage('dashboard')} />;
      case 'books_section':
        return <BookStudio onBack={() => setActivePage('dashboard')} />;
      case 'labs_section':
        return <SmartMemos onBack={() => setActivePage('dashboard')} />;
      case 'resources_center':
        return <Archive onBack={() => setActivePage('dashboard')} />;
            
      // Kept for direct access or future nested routes
      case 'automation':
      case 'smart_correction':
        return <BubbleSheetProcessor onBack={() => setActivePage('dashboard')} />;
      case 'monthly':
        return <AnalyticalDashboard onBack={() => setActivePage('dashboard')} />;
      case 'daily':
        return <DailyPlan onBack={() => setActivePage('dashboard')} />;
      case 'term_plan':
        return <TermPlan onBack={() => setActivePage('dashboard')} />;
      case 'results':
        return <FinalResults onBack={() => setActivePage('dashboard')} />;
      case 'progress_cards':
        return <GradeRecords onBack={() => setActivePage('dashboard')} />;
      case 'badges':
        return <Badges onBack={() => setActivePage('dashboard')} />;
      case 'official_memos':
        return <OfficialMemos onBack={() => setActivePage('dashboard')} />;
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center select-none font-sans">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full">
              <div className="w-20 h-20 bg-sky-100 text-[#004B6E] rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Construction size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">قريباً جداً</h2>
              <p className="text-slate-500 font-bold mb-8">
                القسم ({activePage}) قيد التطوير ليتكامل مع نموذج الذكاء الاصطناعي السيادي.
              </p>
              <button 
                onClick={() => setActivePage('dashboard')}
                className="w-full flex items-center justify-center gap-2 bg-[#004B6E] text-white py-4 rounded-2xl font-black shadow-lg shadow-sky-900/20 hover:bg-sky-800 transition-all"
              >
                <ArrowRight size={20} />
                العودة للرئيسية
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      {renderPage()}
    </MainLayout>
  );
}
