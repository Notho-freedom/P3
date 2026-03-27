import React from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle, Car } from 'lucide-react';
interface NotificationsPageProps {
  navigate: (page: string, data?: any) => void;
}
export function NotificationsPage({ navigate }: NotificationsPageProps) {
  const notifications = [
  {
    id: 1,
    type: 'booking',
    title: 'Réservation confirmée',
    desc: 'Votre trajet Paris → Lyon est confirmé.',
    time: 'Il y a 10 min',
    icon: CheckCircle2,
    color: 'text-[#00C9A7]',
    bg: 'bg-teal-50'
  },
  {
    id: 2,
    type: 'message',
    title: 'Nouveau message',
    desc: 'Sophie M. vous a envoyé un message.',
    time: 'Il y a 1h',
    icon: MessageCircle,
    color: 'text-[#0066FF]',
    bg: 'bg-blue-50'
  },
  {
    id: 3,
    type: 'match',
    title: 'Nouveau trajet disponible',
    desc: 'Un trajet correspond à votre alerte Lyon → Marseille.',
    time: 'Hier',
    icon: Car,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  }];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          <button
            onClick={() => navigate('home')}
            className="p-2 -ml-2 text-gray-600">
            
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">
            Notifications
          </h1>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              className="flex items-start p-4 hover:bg-gray-50 cursor-pointer">
              
              <div
                className={`p-3 rounded-full ${notif.bg} ${notif.color} mr-4 shrink-0`}>
                
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-gray-900">
                    {notif.title}
                  </h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {notif.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notif.desc}</p>
              </div>
            </div>);

        })}
      </div>
    </div>);

}