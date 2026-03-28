import React from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Car,
  Languages,
  MessageCircle,
  Star,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { getProfileById, publicReviews } from '../data/mockData';

interface PublicProfilePageProps {
  navigate: (page: string, data?: any) => void;
  profileId?: string;
  returnTo?: string;
  returnData?: any;
}

export function PublicProfilePage({
  navigate,
  profileId,
  returnTo = 'home',
  returnData,
}: PublicProfilePageProps) {
  const profile = getProfileById(profileId);
  const reviews = publicReviews[profile.id] ?? [
    'Profil visible depuis les trajets, messages et reservations.',
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-6 pt-12 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <button
            onClick={() => navigate(returnTo, returnData)}
            className="rounded-full bg-gray-100 p-2 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Profil public</h1>
            <p className="text-sm text-gray-500">
              Consultation du profil d'un autre utilisateur.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              {profile.verified && <BadgeCheck className="h-5 w-5 text-[#00C9A7]" />}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-current text-amber-400" />
              <span className="font-semibold">{profile.rating}</span>
              <span>({profile.reviews} avis)</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{profile.role}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <Card>
          <CardContent className="space-y-4 px-5 py-5">
            <p className="text-sm leading-6 text-gray-600">{profile.bio}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.vehicle && (
                <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                    <Car className="h-4 w-4 text-[#0066FF]" />
                    Vehicule
                  </div>
                  {profile.vehicle}
                </div>
              )}
              {profile.languages && (
                <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                    <Languages className="h-4 w-4 text-[#00C9A7]" />
                    Langues
                  </div>
                  {profile.languages.join(' • ')}
                </div>
              )}
            </div>
            {profile.preferences && (
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-900">
                  Preferences de trajet
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.map((preference) => (
                    <span
                      key={preference}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#0066FF]"
                    >
                      {preference}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 px-5 py-5">
            <h3 className="text-base font-bold text-gray-900">Avis visibles</h3>
            {reviews.map((review) => (
              <div key={review} className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-600">
                {review}
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
          onClick={() =>
            navigate('chat', {
              conversationId:
                profile.id === 'marc'
                  ? 'conv-2'
                  : profile.id === 'paul'
                    ? 'conv-3'
                    : 'conv-1',
              returnTo: 'public-profile',
              profileId: profile.id,
            })
          }
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Envoyer un message
        </Button>
      </div>
    </div>
  );
}
