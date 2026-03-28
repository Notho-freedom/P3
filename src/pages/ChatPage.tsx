import React, { useMemo, useState } from 'react';
import { ArrowLeft, Phone, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { conversationThreads, getConversationById } from '../data/mockData';

interface ChatPageProps {
  navigate: (page: string, data?: any) => void;
  pageData?: {
    conversationId?: string;
    returnTo?: string;
    profileId?: string;
  } | null;
}

export function ChatPage({ navigate, pageData }: ChatPageProps) {
  const conversation = getConversationById(pageData?.conversationId);
  const initialMessages = useMemo(
    () => conversationThreads[conversation.id] ?? [],
    [conversation.id]
  );
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'me',
        text: message,
        time: 'Maintenant',
      },
    ]);
    setMessage('');
  };

  const returnTo = pageData?.returnTo ?? 'messages';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 z-10 bg-white px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(returnTo)}
              className="rounded-full bg-gray-100 p-2 text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full"
              onClick={() =>
                navigate('public-profile', {
                  profileId: conversation.participantId,
                  returnTo: 'chat',
                  returnData: {
                    conversationId: conversation.id,
                    returnTo,
                  },
                })
              }
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
            <div>
              <p className="font-semibold text-gray-900">{conversation.name}</p>
              <p className="text-xs text-[#00C9A7]">{conversation.routeLabel}</p>
            </div>
          </div>
          <button className="rounded-full bg-blue-50 p-3 text-[#0066FF]">
            <Phone className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <div className="text-center text-xs text-gray-400">Aujourd'hui</div>
        {messages.map((item) => (
          <div
            key={item.id}
            className={`flex ${item.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[78%] rounded-[1.5rem] px-4 py-3 text-sm shadow-sm ${
                item.sender === 'me'
                  ? 'rounded-tr-sm bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white'
                  : 'rounded-tl-sm bg-white text-gray-800'
              }`}
            >
              <p>{item.text}</p>
              <p
                className={`mt-1 text-right text-[11px] ${
                  item.sender === 'me' ? 'text-white/75' : 'text-gray-400'
                }`}
              >
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 pb-safe">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSend();
              }
            }}
            className="h-12 flex-1 rounded-full border-transparent bg-gray-100 px-4 shadow-none"
            placeholder="Precisez le point de rendez-vous, l'adresse ou la localisation..."
          />
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-[#0066FF] text-white"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
