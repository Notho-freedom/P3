import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { AuthPage } from './pages/AuthPage';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { ChatPage } from './pages/ChatPage';
import { DriverDashboard } from './pages/DriverDashboard';
import { HomePage } from './pages/HomePage';
import { MessagesPage } from './pages/MessagesPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { OpenDemandPage } from './pages/OpenDemandPage';
import { ProfilePage } from './pages/ProfilePage';
import { PublicProfilePage } from './pages/PublicProfilePage';
import { PublishPage } from './pages/PublishPage';
import { SearchPage } from './pages/SearchPage';
import { TripDetailPage } from './pages/TripDetailPage';

type PageName =
  | 'home'
  | 'search'
  | 'publish'
  | 'messages'
  | 'profile'
  | 'auth'
  | 'driver-dashboard'
  | 'trip-detail'
  | 'booking-confirmation'
  | 'chat'
  | 'notifications'
  | 'open-demand'
  | 'my-trips'
  | 'public-profile';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [pageData, setPageData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page as PageName);
    setPageData(data ?? null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'search':
        return <SearchPage navigate={navigate} pageData={pageData} />;
      case 'publish':
        return <PublishPage navigate={navigate} />;
      case 'messages':
        return <MessagesPage navigate={navigate} />;
      case 'profile':
        return <ProfilePage navigate={navigate} />;
      case 'auth':
        return <AuthPage navigate={navigate} />;
      case 'driver-dashboard':
        return <DriverDashboard navigate={navigate} pageData={pageData} />;
      case 'trip-detail':
        return <TripDetailPage navigate={navigate} pageData={pageData} />;
      case 'booking-confirmation':
        return <BookingConfirmation navigate={navigate} pageData={pageData} />;
      case 'chat':
        return <ChatPage navigate={navigate} pageData={pageData} />;
      case 'notifications':
        return <NotificationsPage navigate={navigate} />;
      case 'open-demand':
        return <OpenDemandPage navigate={navigate} />;
      case 'my-trips':
        return <MyTripsPage navigate={navigate} />;
      case 'public-profile':
        return (
          <PublicProfilePage
            navigate={navigate}
            profileId={pageData?.profileId}
            returnTo={pageData?.returnTo}
            returnData={pageData?.returnData}
          />
        );
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  const showBottomNav = ['home', 'search', 'publish', 'messages', 'profile'].includes(
    currentPage
  );

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#eef3f8] font-sans">
      <main className="relative flex-1 overflow-y-auto">{renderPage()}</main>
      {showBottomNav ? (
        <BottomNav currentPage={currentPage} navigate={navigate} />
      ) : null}
    </div>
  );
}
