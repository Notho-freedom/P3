import React from 'react';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import {
  getProfileById,
  getTripById,
  passengerBookings,
} from '../data/mockData';

interface MyTripsPageProps {
  navigate: (page: string, data?: any) => void;
}

export function MyTripsPage({ navigate }: MyTripsPageProps) {
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
            <h1 className="text-xl font-bold text-gray-900">Mes trajets</h1>
            <p className="text-sm text-gray-500">
              Vue passager: vos trajets reserves, leur statut et le paiement.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        {passengerBookings.map((booking) => {
          const trip = getTripById(booking.tripId);
          const driver = getProfileById(booking.driverId);
          return (
            <Card key={booking.id} className="border-none shadow-sm">
              <CardContent className="space-y-4 px-5 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Reference {booking.reference}
                    </p>
                    <p className="text-xs text-gray-500">{booking.bookedAt}</p>
                  </div>
                  <Badge
                    className={
                      booking.paymentStatus === 'paid'
                        ? 'border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                        : 'border-0 bg-amber-100 text-amber-700 hover:bg-amber-100'
                    }
                  >
                    {booking.paymentStatus === 'paid' ? 'Paye' : 'Paiement en attente'}
                  </Badge>
                </div>

                <div className="rounded-[1.5rem] bg-gray-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {trip.fromCity} {'->'} {trip.toCity}
                      </p>
                      <p className="text-sm text-gray-500">{trip.dateLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#0066FF]">
                        {booking.totalPrice}€
                      </p>
                      <p className="text-xs text-gray-500">{booking.seats} place(s)</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-l-2 border-gray-200 pl-4">
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
                </div>

                <div className="flex items-center justify-between rounded-[1.25rem] border border-gray-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
                    <p className="text-xs text-gray-500">
                      Conducteur • {driver.vehicle}
                    </p>
                  </div>
                  <button
                    className="text-sm font-semibold text-[#0066FF]"
                    onClick={() =>
                      navigate('public-profile', {
                        profileId: driver.id,
                        returnTo: 'my-trips',
                        returnData: null,
                      })
                    }
                  >
                    Voir profil
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-11 rounded-2xl"
                    onClick={() =>
                      navigate('chat', {
                        conversationId:
                          booking.driverId === 'marc' ? 'conv-2' : 'conv-1',
                        returnTo: 'my-trips',
                      })
                    }
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                  <Button
                    className="h-11 rounded-2xl bg-slate-950 text-white hover:bg-slate-900"
                    onClick={() =>
                      navigate('booking-confirmation', {
                        bookingId: booking.id,
                        returnTo: 'my-trips',
                      })
                    }
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Details & paiement
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Card className="border-dashed bg-white/90">
          <CardContent className="space-y-2 px-5 py-5 text-sm text-gray-600">
            <div className="flex items-center gap-2 text-gray-900">
              <MapPin className="h-4 w-4 text-[#0066FF]" />
              <span className="font-semibold">Organisation clarifiee</span>
            </div>
            <p>
              Cette page est la vue passager. Les demandes recues sur vos propres
              trajets chauffeur sont centralisees dans <strong>Mes reservations</strong>.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-gray-500">
              <Calendar className="h-4 w-4" />
              Liste {'->'} detail {'->'} action, comme valide dans P3.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
