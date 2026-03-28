import React, { useMemo, useState } from 'react';
import {
  Bell,
  Car,
  Clock3,
  Compass,
  MapPin,
  MessageCircle,
  PlusCircle,
  Search,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { conversations, currentUser, openDemandRequests, searchTrips } from '../data/mockData';

interface HomePageProps {
  navigate: (page: string, data?: any) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  const [searchForm, setSearchForm] = useState({
    from: 'Paris',
    to: 'Lyon',
    date: '2026-03-27',
    seats: '1',
  });

  const recentTrips = useMemo(() => searchTrips.slice(0, 2), []);
  const recentActivity = useMemo(
    () => [
      'Nouvelle demande ouverte visible dans votre zone.',
      'Deux conversations attendent votre reponse.',
      'Un trajet regulier peut etre republie pour mardi 17:00.',
    ],
    []
  );

  const quickActions = [
    {
      id: 'search',
      label: 'Recherche',
      icon: Search,
      color: 'from-[#0066FF] to-[#40A5FF]',
      action: () =>
        navigate('search', {
          initialFilters: searchForm,
        }),
    },
    {
      id: 'publish',
      label: 'Publier',
      icon: PlusCircle,
      color: 'from-[#00C9A7] to-[#0cc6d9]',
      action: () => navigate('publish'),
    },
    {
      id: 'driver-mode',
      label: 'Mode dispo',
      icon: Compass,
      color: 'from-slate-950 to-slate-700',
      action: () => navigate('driver-dashboard', { tab: 'mode-dispo' }),
    },
    {
      id: 'my-trips',
      label: 'Mes trajets',
      icon: Clock3,
      color: 'from-[#f97316] to-[#fb7185]',
      action: () => navigate('my-trips'),
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      color: 'from-[#7c3aed] to-[#2563eb]',
      action: () => navigate('messages'),
    },
    {
      id: 'open-demand',
      label: 'Demande ouverte',
      icon: Sparkles,
      color: 'from-[#111827] to-[#2dd4bf]',
      action: () => navigate('open-demand'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#eef3f8] pb-24">
      <div className="relative overflow-hidden rounded-b-[2.75rem] bg-[linear-gradient(140deg,#08132a_0%,#0f2f61_48%,#00C9A7_120%)] px-4 pb-28 pt-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_right,rgba(0,201,167,0.18),transparent_25%)]" />
        <div className="relative">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/60">
                RideFlex
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Le covoiturage plus clair, plus mobile, plus vivant.
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('notifications')}
                className="rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('profile')}
                className="rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <UserCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
            <Avatar className="h-12 w-12 border border-white/15">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-white/65">Bonjour</p>
              <p className="font-semibold">{currentUser.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-white/65">Trajets actifs</p>
              <p className="mt-1 text-xl font-bold">04</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-white/65">Conversations</p>
              <p className="mt-1 text-xl font-bold">{conversations.length}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-white/65">Demandes</p>
              <p className="mt-1 text-xl font-bold">{openDemandRequests.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-20 px-4">
        <Card className="border-none shadow-[0_30px_60px_rgba(15,23,42,0.12)]">
          <CardContent className="space-y-4 px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Chercher un conducteur
                </h2>
                <p className="text-sm text-gray-500">
                  Base P3, filtre complet inspire de P2.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0066FF]">
                Passager
              </span>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0066FF]" />
                <Input
                  value={searchForm.from}
                  onChange={(event) =>
                    setSearchForm((current) => ({ ...current, from: event.target.value }))
                  }
                  className="h-12 rounded-2xl pl-10"
                  placeholder="Depart"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00C9A7]" />
                <Input
                  value={searchForm.to}
                  onChange={(event) =>
                    setSearchForm((current) => ({ ...current, to: event.target.value }))
                  }
                  className="h-12 rounded-2xl pl-10"
                  placeholder="Destination"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={searchForm.date}
                  onChange={(event) =>
                    setSearchForm((current) => ({ ...current, date: event.target.value }))
                  }
                  className="h-12 rounded-2xl"
                />
                <Input
                  type="number"
                  min="1"
                  max="4"
                  value={searchForm.seats}
                  onChange={(event) =>
                    setSearchForm((current) => ({ ...current, seats: event.target.value }))
                  }
                  className="h-12 rounded-2xl"
                  placeholder="Places"
                />
              </div>
              <Button
                className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
                onClick={() =>
                  navigate('search', {
                    initialFilters: searchForm,
                  })
                }
              >
                Rechercher un trajet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 px-4 pt-8">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Actions rapides</h2>
            <p className="text-sm text-gray-500">Tout le produit depuis l’accueil</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="overflow-hidden rounded-[1.75rem] bg-white text-left shadow-sm transition hover:-translate-y-0.5"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${action.color}`} />
                  <div className="space-y-3 px-4 py-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Trajets recents</h2>
            <button
              className="text-sm font-semibold text-[#0066FF]"
              onClick={() => navigate('search')}
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <Card
                key={trip.id}
                className="cursor-pointer border-none shadow-sm"
                onClick={() =>
                  navigate('trip-detail', {
                    tripId: trip.id,
                    returnTo: 'home',
                  })
                }
              >
                <CardContent className="space-y-4 px-5 py-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {trip.fromCity} {'->'} {trip.toCity}
                      </p>
                      <p className="text-sm text-gray-500">
                        {trip.dateLabel} • {trip.departureTime}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-[#0066FF]">
                      {trip.pricePerSeat}€ / place
                    </span>
                  </div>
                  <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    {trip.fromLabel} • Destination {trip.toLabel}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Activite recente</h2>
            <button
              className="text-sm font-semibold text-[#0066FF]"
              onClick={() => navigate('notifications')}
            >
              Notifications
            </button>
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="space-y-4 px-5 py-5">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity}
                  className={index < recentActivity.length - 1 ? 'border-b border-gray-100 pb-4' : ''}
                >
                  <p className="text-sm font-medium text-gray-800">{activity}</p>
                  <p className="mt-1 text-xs text-gray-500">Mis a jour en temps reel</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
