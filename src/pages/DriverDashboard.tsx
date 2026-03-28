import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BellRing,
  Car,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  Radio,
  Settings2,
  User,
  X,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { SlidingPanel } from '../components/SlidingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import {
  driverReservations,
  getPassengerBookingById,
  getProfileById,
  getTripById,
  incomingDriverRequests,
} from '../data/mockData';

interface DriverDashboardProps {
  navigate: (page: string, data?: any) => void;
  pageData?: {
    tab?: 'mode-dispo' | 'mes-reservations';
  } | null;
}

export function DriverDashboard({ navigate, pageData }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState<'mode-dispo' | 'mes-reservations'>(
    pageData?.tab ?? 'mode-dispo'
  );
  const [isAvailable, setIsAvailable] = useState(false);
  const [radius, setRadius] = useState(15);
  const [seats, setSeats] = useState(3);
  const [timeFrom, setTimeFrom] = useState('08:00');
  const [timeTo, setTimeTo] = useState('18:30');
  const [limitTime, setLimitTime] = useState('20:00');
  const [currentZone, setCurrentZone] = useState('Paris centre');
  const [reservationStates, setReservationStates] = useState<Record<string, 'pending' | 'confirmed' | 'declined'>>({
    'reservation-1': 'pending',
    'reservation-2': 'confirmed',
  });

  const activeRequest = incomingDriverRequests[0];
  const passenger = getProfileById(activeRequest?.passengerId);

  const driverReservationCards = useMemo(() => {
    return driverReservations.map((reservation) => {
      const trip = getTripById(reservation.tripId);
      const passengerProfile = getProfileById(reservation.passengerId);
      const status = reservationStates[reservation.id] ?? reservation.status;
      return {
        reservation,
        trip,
        passengerProfile,
        status,
      };
    });
  }, [reservationStates]);

  const updateReservationState = (
    reservationId: string,
    nextState: 'pending' | 'confirmed' | 'declined'
  ) => {
    setReservationStates((current) => ({
      ...current,
      [reservationId]: nextState,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-5 pt-12 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="rounded-full bg-gray-100 p-2 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Espace chauffeur</h1>
            <p className="text-sm text-gray-500">
              Mode dispo + reservations recues sur vos trajets.
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'mode-dispo' | 'mes-reservations')}>
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-[#f4f7fb] p-1">
            <TabsTrigger value="mode-dispo" className="rounded-xl">
              Mode dispo
            </TabsTrigger>
            <TabsTrigger value="mes-reservations" className="rounded-xl">
              Mes reservations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mode-dispo" className="m-0">
            <div className="relative mt-4 h-[calc(100vh-248px)]">
              <MapPlaceholder
                className="h-full"
                title="Mode chauffeur sur carte"
                subtitle="Future base Mapbox avec zones, demandes et points de prise"
              />

              <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-slate-950/75 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Radio
                    className={`h-4 w-4 ${isAvailable ? 'animate-pulse text-[#00C9A7]' : 'text-white/50'}`}
                  />
                  {isAvailable ? 'Mode actif' : 'Mode en pause'}
                </div>
              </div>

              <div className="absolute left-1/2 top-[34%] z-10 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setIsAvailable((current) => !current)}
                  className={`flex h-40 w-40 flex-col items-center justify-center rounded-full text-center shadow-[0_25px_80px_rgba(15,23,42,0.35)] transition ${
                    isAvailable
                      ? 'bg-gradient-to-br from-[#00C9A7] to-[#0b4aa2] text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  <Radio className={`mb-3 h-10 w-10 ${isAvailable ? 'animate-pulse' : ''}`} />
                  <span className="text-lg font-bold">
                    {isAvailable ? 'Vous etes visible' : 'Je suis disponible'}
                  </span>
                  <span className={`mt-2 px-4 text-xs ${isAvailable ? 'text-white/75' : 'text-gray-500'}`}>
                    {isAvailable
                      ? `Jusqu'a ${limitTime}`
                      : 'Activez pour recevoir des demandes en direct'}
                  </span>
                </button>
              </div>

              {isAvailable ? (
                <div className="absolute right-6 top-28 rounded-[1.5rem] border border-white/10 bg-white/15 p-4 text-white backdrop-blur-md">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <BellRing className="h-4 w-4 text-[#00C9A7]" />
                    Nouvelle demande dans la zone
                  </div>
                  <p className="mt-2 text-xs text-white/70">
                    Rayon {radius} km • {seats} place(s) • limite {limitTime}
                  </p>
                </div>
              ) : null}

              <SlidingPanel initialSnap={42} snapPoints={[30, 52, 88]}>
                <div className="space-y-4">
                  <Card className="border-none bg-slate-950 text-white shadow-lg">
                    <CardContent className="flex items-start justify-between gap-4 px-5 py-5">
                      <div>
                        <p className="text-lg font-bold">Parametres du mode dispo</p>
                        <p className="mt-1 text-sm text-white/65">
                          Logique P2 avec ajout de l'heure limite inspiree de P3.
                        </p>
                      </div>
                      <div className="rounded-full bg-white/10 p-3">
                        <Settings2 className="h-5 w-5 text-[#00C9A7]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm">
                    <CardContent className="space-y-4 px-5 py-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">
                            Zone de depart
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0066FF]" />
                            <Input
                              value={currentZone}
                              onChange={(event) => setCurrentZone(event.target.value)}
                              className="h-12 rounded-2xl pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">
                            Disponibilite jusqu'a
                          </label>
                          <Input
                            type="time"
                            value={limitTime}
                            onChange={(event) => setLimitTime(event.target.value)}
                            className="h-12 rounded-2xl"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-semibold text-gray-900">
                            Rayon d'action
                          </label>
                          <span className="text-sm font-semibold text-[#0066FF]">{radius} km</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="40"
                          value={radius}
                          onChange={(event) => setRadius(Number(event.target.value))}
                          className="w-full accent-[#0066FF]"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">
                            Plage horaire
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="time"
                              value={timeFrom}
                              onChange={(event) => setTimeFrom(event.target.value)}
                              className="h-12 rounded-2xl"
                            />
                            <Input
                              type="time"
                              value={timeTo}
                              onChange={(event) => setTimeTo(event.target.value)}
                              className="h-12 rounded-2xl"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">
                            Places disponibles
                          </label>
                          <div className="flex h-12 items-center justify-between rounded-2xl bg-gray-50 px-3">
                            <button
                              type="button"
                              onClick={() => setSeats((current) => Math.max(1, current - 1))}
                              className="rounded-full bg-white px-3 py-1 font-bold text-gray-700 shadow-sm"
                            >
                              -
                            </button>
                            <span className="font-semibold text-gray-900">{seats}</span>
                            <button
                              type="button"
                              onClick={() => setSeats((current) => Math.min(4, current + 1))}
                              className="rounded-full bg-white px-3 py-1 font-bold text-gray-700 shadow-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {isAvailable && activeRequest ? (
                    <Card className="border-none shadow-sm">
                      <CardContent className="space-y-4 px-5 py-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-base font-bold text-gray-900">
                              Demande entrante
                            </p>
                            <p className="text-sm text-gray-500">{activeRequest.etaLabel}</p>
                          </div>
                          <Badge className="border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            {activeRequest.price}€
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              navigate('public-profile', {
                                profileId: passenger.id,
                                returnTo: 'driver-dashboard',
                                returnData: {
                                  tab: 'mode-dispo',
                                },
                              })
                            }
                          >
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                              <img src={passenger.avatar} alt={passenger.name} className="h-full w-full object-cover" />
                            </div>
                          </button>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{passenger.name}</p>
                            <p className="text-sm text-gray-500">
                              {activeRequest.seats} place(s) • {passenger.rating} ★
                            </p>
                          </div>
                        </div>

                        <div className="rounded-[1.5rem] bg-gray-50 p-4">
                          <div className="space-y-3 border-l-2 border-gray-200 pl-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Prise en charge</p>
                              <p className="text-sm text-gray-500">{activeRequest.pickupLabel}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Destination</p>
                              <p className="text-sm text-gray-500">{activeRequest.destinationLabel}</p>
                            </div>
                          </div>
                          <p className="mt-3 text-xs text-gray-500">
                            {activeRequest.distanceLabel} de votre zone actuelle
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="h-11 rounded-2xl"
                            onClick={() => setIsAvailable(false)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Refuser
                          </Button>
                          <Button
                            className="h-11 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
                            onClick={() =>
                              navigate('chat', {
                                conversationId: 'conv-3',
                                returnTo: 'driver-dashboard',
                              })
                            }
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Accepter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-dashed bg-white">
                      <CardContent className="px-5 py-5 text-sm text-gray-600">
                        Activez le mode pour recevoir des demandes interactives comme dans P2.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </SlidingPanel>
            </div>
          </TabsContent>

          <TabsContent value="mes-reservations" className="mt-4 space-y-4">
            {driverReservationCards.map(({ reservation, trip, passengerProfile, status }) => (
              <Card key={reservation.id} className="border-none shadow-sm">
                <CardContent className="space-y-4 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-gray-900">
                        Reservation recue
                      </p>
                      <p className="text-sm text-gray-500">{reservation.requestTime}</p>
                    </div>
                    <Badge
                      className={
                        status === 'confirmed'
                          ? 'border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                          : status === 'declined'
                            ? 'border-0 bg-rose-100 text-rose-700 hover:bg-rose-100'
                            : 'border-0 bg-amber-100 text-amber-700 hover:bg-amber-100'
                      }
                    >
                      {status === 'confirmed'
                        ? 'Confirmee'
                        : status === 'declined'
                          ? 'Refusee'
                          : 'En attente'}
                    </Badge>
                  </div>

                  <div className="rounded-[1.5rem] bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.fromCity} {'->'} {trip.toCity}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {trip.departureTime} • {trip.fromLabel}
                    </p>
                    <p className="text-sm text-gray-500">
                      Destination {trip.toLabel}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-500">{reservation.seats} place(s)</span>
                      <span className="font-semibold text-[#0066FF]">
                        {reservation.totalPrice}€
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-[1.25rem] border border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                        <img
                          src={passengerProfile.avatar}
                          alt={passengerProfile.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {passengerProfile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {passengerProfile.rating} ★ • {passengerProfile.role}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-sm font-semibold text-[#0066FF]"
                      onClick={() =>
                        navigate('public-profile', {
                          profileId: passengerProfile.id,
                          returnTo: 'driver-dashboard',
                          returnData: {
                            tab: 'mes-reservations',
                          },
                        })
                      }
                    >
                      Voir profil
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className="h-11 rounded-2xl"
                      onClick={() =>
                        navigate('chat', {
                          conversationId: passengerProfile.id === 'paul' ? 'conv-3' : 'conv-1',
                          returnTo: 'driver-dashboard',
                        })
                      }
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 rounded-2xl border-rose-200 text-rose-600 hover:bg-rose-50"
                      onClick={() => updateReservationState(reservation.id, 'declined')}
                    >
                      Refuser
                    </Button>
                    <Button
                      className="h-11 rounded-2xl bg-slate-950 text-white hover:bg-slate-900"
                      onClick={() => updateReservationState(reservation.id, 'confirmed')}
                    >
                      Confirmer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed bg-white">
              <CardContent className="space-y-2 px-5 py-5 text-sm text-gray-600">
                <div className="flex items-center gap-2 text-gray-900">
                  <User className="h-4 w-4 text-[#0066FF]" />
                  <span className="font-semibold">Clarification fonctionnelle</span>
                </div>
                <p>
                  <strong>Mes reservations</strong> est la vue chauffeur: vous y
                  retrouvez les demandes recue sur vos trajets publies.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
