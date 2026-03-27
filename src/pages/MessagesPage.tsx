import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Badge } from '../components/Badge';
interface MessagesPageProps {
  navigate: (page: string, data?: any) => void;
}
export function MessagesPage({ navigate }: MessagesPageProps) {
  const conversations = [
  {
    id: 1,
    name: 'Sophie M.',
    message: 'Parfait, on se retrouve devant la gare.',
    time: '10:30',
    unread: 2,
    avatar: '1'
  },
  {
    id: 2,
    name: 'Marc D.',
    message: 'Avez-vous de la place pour une valise ?',
    time: 'Hier',
    unread: 0,
    avatar: '2'
  },
  {
    id: 3,
    name: 'Julie L.',
    message: 'Merci pour le trajet !',
    time: 'Lun',
    unread: 0,
    avatar: '3'
  }];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Rechercher une conversation..."
            className="pl-10 bg-gray-50 border-transparent focus-visible:ring-[#0066FF]" />
          
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {conversations.map((chat) =>
        <div
          key={chat.id}
          className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() =>
          navigate('chat', {
            id: chat.id,
            name: chat.name
          })
          }>
          
            <Avatar className="w-14 h-14 mr-4">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.avatar}`} />
              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3
                className={`text-base font-semibold truncate ${chat.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                
                  {chat.name}
                </h3>
                <span
                className={`text-xs ${chat.unread ? 'text-[#0066FF] font-semibold' : 'text-gray-400'}`}>
                
                  {chat.time}
                </span>
              </div>
              <p
              className={`text-sm truncate ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              
                {chat.message}
              </p>
            </div>
            {chat.unread > 0 &&
          <Badge className="ml-3 bg-[#0066FF] hover:bg-[#0066FF] rounded-full w-6 h-6 flex items-center justify-center p-0">
                {chat.unread}
              </Badge>
          }
          </div>
        )}
      </div>
    </div>);

}