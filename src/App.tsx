import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PlannerPage } from './pages/PlannerPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';
import { EmergencyPage } from './pages/EmergencyPage';
import { EmergencyProvider } from './contexts/EmergencyContext';
import { ChatbotProvider } from './contexts/ChatbotContext';

function App() {
  return (
    <EmergencyProvider>
      <ChatbotProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="emergency" element={<EmergencyPage />} />
          </Route>
        </Routes>
      </ChatbotProvider>
    </EmergencyProvider>
  );
}

export default App;