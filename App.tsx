
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { HubExplorer } from './pages/HubExplorer';
import { TopicExplorer } from './pages/TopicExplorer';
import { SubtopicExplorer } from './pages/SubtopicExplorer';
import { ContentDetail } from './pages/ContentDetail';
import { DriveOrganizer } from './pages/DriveOrganizer';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { VerificationPage } from './pages/VerificationPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIChatPage } from './pages/AIChatPage';
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

          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          {/* Strict Hierarchy Routes */}
          <Route path="/hub" element={
            <PrivateRoute>
              <HubExplorer />
            </PrivateRoute>
          } />
          <Route path="/hub/subject/:subjectId" element={
            <PrivateRoute>
              <TopicExplorer />
            </PrivateRoute>
          } />
          <Route path="/hub/subject/:subjectId/topic/:topicId" element={
            <PrivateRoute>
              <SubtopicExplorer />
            </PrivateRoute>
          } />
          <Route path="/hub/subject/:subjectId/topic/:topicId/subtopic/:subtopicId" element={
            <PrivateRoute>
              <ContentDetail />
            </PrivateRoute>
          } />

          <Route path="/ai-assistant" element={
            <PrivateRoute>
              <AIChatPage />
            </PrivateRoute>
          } />

          <Route path="/drive" element={
            <PrivateRoute>
              <DriveOrganizer />
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
          <Route path="/heatmap" element={<div className="p-8"><h1 className="text-3xl font-bold">Comprehensive Heatmap Coming Soon</h1></div>} />
          <Route path="/leaderboard" element={<div className="p-8"><h1 className="text-3xl font-bold">Top Contributors Coming Soon</h1></div>} />
          <Route path="/settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings & Integration</h1></div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
