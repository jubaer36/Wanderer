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
import { MessagesPage } from './pages/MessagesPage';
import { SavedPlacesPage } from './pages/SavedPlacesPage';
import { MyToursPage } from './pages/MyToursPage';
import { TravelBuddiesPage } from './pages/TravelBuddiesPage';
import { TripCalendarPage } from './pages/TripCalendarPage';
import { SettingsPage } from './pages/SettingsPage';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { TravelMapsPage } from './pages/TravelMapsPage';
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
            <Route path="messages" element={<MessagesPage />} />
            <Route path="saved-places" element={<SavedPlacesPage />} />
            <Route path="my-tours" element={<MyToursPage />} />
            <Route path="travel-buddies" element={<TravelBuddiesPage />} />
            <Route path="calendar" element={<TripCalendarPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="travel-maps" element={<TravelMapsPage />} />
            <Route path="gallery" element={<PhotoGalleryPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </ChatbotProvider>
    </EmergencyProvider>
  );
}

export default App;