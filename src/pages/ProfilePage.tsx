import React from 'react';
import {
  BadgeCheck,
  Car,
  CreditCard,
  Languages,
  LogOut,
  Settings,
  ShieldCheck,
  Star,
  UserRoundSearch,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { currentUser, searchTrips } from '../data/mockData';

interface ProfilePageProps {
  navigate: (page: string, data?: any) => void;
}

export function ProfilePage({ navigate }: ProfilePageProps) {
  const stats = [
    { label: 'Avis', value: `${currentUser.rating} ★` },
    { label: 'Trajets publies', value: '18' },
    { label: 'Messages actifs', value: '03' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-6 pt-12 shadow-sm">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">Profil</h1>

        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
              <BadgeCheck className="h-5 w-5 text-[#00C9A7]" />
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-current text-amber-400" />
              <span className="font-semibold">{currentUser.rating}</span>
              <span>({currentUser.reviews} avis)</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{currentUser.role}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.25rem] bg-[#f4f7fb] px-4 py-3">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <Card className="border-none shadow-sm">
          <CardContent className="space-y-4 px-5 py-5">
            <p className="text-sm leading-6 text-gray-600">{currentUser.bio}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                  <Car className="h-4 w-4 text-[#0066FF]" />
                  Vehicule
                </div>
                {currentUser.vehicle}
              </div>
              <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                  <Languages className="h-4 w-4 text-[#00C9A7]" />
                  Langues
                </div>
                {currentUser.languages?.join(' • ')}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentUser.preferences?.map((preference) => (
                <span
                  key={preference}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#0066FF]"
                >
                  {preference}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => navigate('my-trips')}
            className="rounded-[1.5rem] bg-white px-4 py-4 text-left shadow-sm"
          >
            <p className="text-sm font-semibold text-gray-900">Mes trajets</p>
            <p className="mt-1 text-sm text-gray-500">Vue passager et paiements</p>
          </button>
          <button
            onClick={() => navigate('driver-dashboard', { tab: 'mes-reservations' })}
            className="rounded-[1.5rem] bg-white px-4 py-4 text-left shadow-sm"
          >
            <p className="text-sm font-semibold text-gray-900">Mes reservations</p>
            <p className="mt-1 text-sm text-gray-500">Vue chauffeur et demandes recues</p>
          </button>
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="space-y-3 px-5 py-5">
            <h3 className="text-base font-bold text-gray-900">Raccourcis compte</h3>
            {[
              {
                icon: CreditCard,
                title: 'Paiements et remboursements',
                description: 'Verifier vos moyens de paiement et historiques.',
              },
              {
                icon: ShieldCheck,
                title: "Verification d'identite",
                description: 'Renforcer la confiance entre conducteurs et passagers.',
              },
              {
                icon: Settings,
                title: 'Parametres du compte',
                description: 'Notifications, preferences et confidentialite.',
              },
              {
                icon: UserRoundSearch,
                title: 'Profil public',
                description: "Previsualiser ce que les autres utilisateurs voient.",
                action: () =>
                  navigate('public-profile', {
                    profileId: 'sophie',
                    returnTo: 'profile',
                  }),
              },
            ].map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={item.action}
                className="flex w-full items-start gap-3 rounded-[1.25rem] bg-gray-50 px-4 py-4 text-left"
              >
                <div className="rounded-xl bg-white p-2 text-gray-700 shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="space-y-3 px-5 py-5">
            <h3 className="text-base font-bold text-gray-900">Historique recent</h3>
            {searchTrips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="rounded-[1.25rem] bg-gray-50 px-4 py-4">
                <p className="text-sm font-semibold text-gray-900">
                  {trip.fromCity} {'->'} {trip.toCity}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {trip.dateLabel} • {trip.departureTime}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          onClick={() => navigate('auth')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Se deconnecter
        </Button>
      </div>
    </div>
  );
}
