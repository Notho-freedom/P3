import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { conversations } from '../data/mockData';

interface MessagesPageProps {
  navigate: (page: string, data?: any) => void;
}

export function MessagesPage({ navigate }: MessagesPageProps) {
  const [query, setQuery] = useState('');

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      return (
        conversation.name.toLowerCase().includes(normalizedQuery) ||
        conversation.routeLabel.toLowerCase().includes(normalizedQuery) ||
        conversation.lastMessage.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 pb-5 pt-12">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Messages</h1>
        <p className="mb-4 text-sm text-gray-500">
          On garde le flow valide de P3: liste de discussions puis chat.
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une discussion, un trajet, une personne..."
            className="h-12 rounded-2xl border-transparent bg-gray-50 pl-10 shadow-none"
          />
        </div>
      </div>

      <div className="space-y-2 px-4">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="cursor-pointer rounded-[1.5rem] bg-gray-50 px-4 py-4 transition hover:bg-gray-100"
            onClick={() =>
              navigate('chat', {
                conversationId: conversation.id,
                returnTo: 'messages',
              })
            }
          >
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate('public-profile', {
                    profileId: conversation.participantId,
                    returnTo: 'messages',
                  });
                }}
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {conversation.name}
                    </h3>
                    <p className="truncate text-xs text-gray-500">
                      {conversation.routeLabel}
                    </p>
                  </div>
                  <span
                    className={`text-xs ${
                      conversation.unread ? 'font-semibold text-[#0066FF]' : 'text-gray-400'
                    }`}
                  >
                    {conversation.timeLabel}
                  </span>
                </div>
                <p
                  className={`truncate text-sm ${
                    conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 ? (
                <Badge className="flex h-6 w-6 items-center justify-center rounded-full border-0 bg-[#0066FF] p-0 text-white hover:bg-[#0066FF]">
                  {conversation.unread}
                </Badge>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
