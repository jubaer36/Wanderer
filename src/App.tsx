import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PlannerPage } from './pages/PlannerPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;