import React from 'react';
import {
  ArrowLeft,
  Car,
  CreditCard,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { getProfileById, getTripById } from '../data/mockData';

interface TripDetailPageProps {
  navigate: (page: string, data?: any) => void;
  pageData?: {
    tripId?: string;
    returnTo?: string;
  } | null;
}

export function TripDetailPage({ navigate, pageData }: TripDetailPageProps) {
  const trip = getTripById(pageData?.tripId);
  const driver = getProfileById(trip.driverId);
  const returnTo = pageData?.returnTo ?? 'search';

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="sticky top-0 z-10 bg-white px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(returnTo)}
            className="rounded-full bg-gray-100 p-2 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Details du trajet</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <Card className="border-none bg-gradient-to-br from-slate-950 via-slate-900 to-[#0b4aa2] text-white shadow-xl">
          <CardContent className="space-y-4 px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {trip.fromCity} {'->'} {trip.toCity}
                </p>
                <p className="mt-1 text-sm text-white/70">{trip.dateLabel}</p>
              </div>
              <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                {trip.kind === 'available' ? 'Mode dispo' : 'Trajet planifie'}
              </Badge>
            </div>
            <p className="text-sm text-white/75">
              Prix affiche clairement par place. La destination est distinguee de
              l'heure d'arrivee.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="space-y-4 px-5 py-5">
            <div className="space-y-4 border-l-2 border-gray-200 pl-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {trip.departureTime} • Depart
                </p>
                <p className="text-sm text-gray-500">{trip.fromLabel}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {trip.arrivalTime} • Destination
                </p>
                <p className="text-sm text-gray-500">{trip.toLabel}</p>
              </div>
            </div>

            {trip.stopovers?.length ? (
              <div className="rounded-[1.5rem] bg-gray-50 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-900">
                  Arrets intermediaires
                </p>
                <div className="flex flex-wrap gap-2">
                  {trip.stopovers.map((stopover) => (
                    <span
                      key={stopover}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {stopover}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500">Prix</p>
                <p className="mt-1 text-lg font-bold text-[#0066FF]">
                  {trip.pricePerSeat}€ / place
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500">Places restantes</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {trip.seatsAvailable}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="space-y-4 px-5 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    navigate('public-profile', {
                      profileId: driver.id,
                      returnTo: 'trip-detail',
                      returnData: {
                        tripId: trip.id,
                        returnTo,
                      },
                    })
                  }
                >
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={driver.avatar} />
                    <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
                <div>
                  <p className="font-semibold text-gray-900">{driver.name}</p>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-current text-amber-400" />
                    {driver.rating} • {driver.reviews} avis
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() =>
                  navigate('chat', {
                    conversationId:
                      driver.id === 'marc'
                        ? 'conv-2'
                        : driver.id === 'julie'
                          ? 'conv-3'
                          : 'conv-1',
                    returnTo: 'trip-detail',
                  })
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[#00C9A7]" />
                  Verification
                </div>
                Identite verifiee
              </div>
              <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                  <Car className="h-4 w-4 text-[#0066FF]" />
                  Vehicule
                </div>
                {trip.vehicle}
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <div className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                <MapPin className="h-4 w-4 text-[#0066FF]" />
                Point de rencontre
              </div>
              Precisions d'adresse ou localisation a enrichir ensuite via le chat.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 pb-safe">
        <Button
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
          onClick={() =>
            navigate('booking-confirmation', {
              tripId: trip.id,
              returnTo: 'trip-detail',
            })
          }
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Continuer vers la reservation
        </Button>
      </div>
    </div>
  );
}
