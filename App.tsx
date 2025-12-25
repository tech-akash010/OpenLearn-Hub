
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { HubExplorer } from './pages/HubExplorer';
import { TopicExplorer } from './pages/TopicExplorer';
import { SubtopicExplorer } from './pages/SubtopicExplorer';
import { ContentDetail } from './pages/ContentDetail';
import { DrivePage } from './pages/DrivePage';
import { CourseNoteAccessPage } from './pages/CourseNoteAccessPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { VerificationPage } from './pages/VerificationPage';
import { TrendingNotesPage } from './pages/TrendingNotesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIChatPage } from './pages/AIChatPage';
import { QuizCreationPage } from './pages/QuizCreationPage';
import { NoteUploadPage } from './pages/NoteUploadPage';
import { BrowseByPathPage } from './pages/BrowseByPathPage';
import { SharedNotePage } from './pages/SharedNotePage';
import { ContributionPage } from './pages/ContributionPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { authService } from './services/authService';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());

  useEffect(() => {
    const handleAuth = () => setUser(authService.getUser());
    window.addEventListener('auth-change', handleAuth);
    return () => window.removeEventListener('auth-change', handleAuth);
  }, []);

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Dashboard - accessible to both guests and logged-in users */}
          <Route path="/" element={<Dashboard />} />

          {/* Browsing Routes - Accessible to all guests */}
          <Route path="/hub" element={<HubExplorer />} />
          <Route path="/hub/subject/:subjectId" element={<TopicExplorer />} />
          <Route path="/hub/subject/:subjectId/topic/:topicId" element={<SubtopicExplorer />} />
          <Route path="/hub/subject/:subjectId/topic/:topicId/subtopic/:subtopicId" element={<ContentDetail />} />

          <Route path="/ai-assistant" element={<AIChatPage />} />

          <Route path="/my-drive" element={<DrivePage />} />

          {/* Action Routes - Require authentication */}
          <Route path="/hub/subject/:subjectId/topic/:topicId/subtopic/:subtopicId/upload" element={
            <PrivateRoute>
              <NoteUploadPage />
            </PrivateRoute>
          } />
          <Route path="/course/access/:courseNoteId" element={
            <PrivateRoute>
              <CourseNoteAccessPage />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/verification" element={
            <PrivateRoute>
              <VerificationPage />
            </PrivateRoute>
          } />

          {/* Upload Notes - Restricted */}
          <Route path="/notes/upload" element={
            <PrivateRoute>
              <NoteUploadPage />
            </PrivateRoute>
          } />

          {/* Create Quiz - Restricted */}
          <Route path="/quiz/create" element={
            <PrivateRoute>
              <QuizCreationPage />
            </PrivateRoute>
          } />


          {/* Browse - Accessible to guests */}
          <Route path="/browse" element={<BrowseByPathPage />} />
          <Route path="/trending" element={<TrendingNotesPage />} />
          <Route path="/note/:noteId" element={<SharedNotePage />} />

          {/* Subscriptions - Requires authentication */}
          <Route path="/subscriptions" element={
            <PrivateRoute>
              <SubscriptionsPage />
            </PrivateRoute>
          } />

          <Route path="/contribute" element={
            <PrivateRoute>
              <ContributionPage />
            </PrivateRoute>
          } />
          <Route path="/leaderboard" element={<div className="p-8"><h1 className="text-3xl font-bold">Top Contributors Coming Soon</h1></div>} />
          <Route path="/settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings & Integration</h1></div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
