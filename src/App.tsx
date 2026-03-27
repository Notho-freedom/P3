import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PublishPage } from './pages/PublishPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { DriverDashboard } from './pages/DriverDashboard';
import { TripDetailPage } from './pages/TripDetailPage';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { ChatPage } from './pages/ChatPage';
import { NotificationsPage } from './pages/NotificationsPage';
export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) setPageData(data);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'search':
        return <SearchPage navigate={navigate} />;
      case 'publish':
        return <PublishPage navigate={navigate} />;
      case 'messages':
        return <MessagesPage navigate={navigate} />;
      case 'profile':
        return <ProfilePage navigate={navigate} />;
      case 'auth':
        return <AuthPage navigate={navigate} />;
      case 'driver-dashboard':
        return <DriverDashboard navigate={navigate} />;
      case 'trip-detail':
        return <TripDetailPage navigate={navigate} />;
      case 'booking-confirmation':
        return <BookingConfirmation navigate={navigate} />;
      case 'chat':
        return <ChatPage navigate={navigate} />;
      case 'notifications':
        return <NotificationsPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };
  const showBottomNav = [
  'home',
  'search',
  'publish',
  'messages',
  'profile'].
  includes(currentPage);
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden font-sans">
      <main className="flex-1 overflow-y-auto relative">{renderPage()}</main>
      {showBottomNav &&
      <BottomNav currentPage={currentPage} navigate={navigate} />
      }
    </div>);

}