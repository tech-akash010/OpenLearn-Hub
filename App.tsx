
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { HubExplorer } from './pages/HubExplorer';
import { TopicDetail } from './pages/TopicDetail';
import { DriveOrganizer } from './pages/DriveOrganizer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hub" element={<HubExplorer />} />
          <Route path="/hub/topic/:id" element={<TopicDetail />} />
          <Route path="/drive" element={<DriveOrganizer />} />
          <Route path="/heatmap" element={<div className="p-8"><h1 className="text-3xl font-bold">Comprehensive Heatmap Coming Soon</h1></div>} />
          <Route path="/leaderboard" element={<div className="p-8"><h1 className="text-3xl font-bold">Top Contributors Coming Soon</h1></div>} />
          <Route path="/settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings & Integration</h1></div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
