import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import {
  getPassengerBookingById,
  getProfileById,
  getTripById,
} from '../data/mockData';

interface BookingConfirmationProps {
  navigate: (page: string, data?: any) => void;
  pageData?: {
    bookingId?: string;
    tripId?: string;
    returnTo?: string;
  } | null;
}

export function BookingConfirmation({
  navigate,
  pageData,
}: BookingConfirmationProps) {
  const existingBooking = pageData?.bookingId
    ? getPassengerBookingById(pageData.bookingId)
    : null;
  const trip = getTripById(existingBooking?.tripId ?? pageData?.tripId);
  const driver = getProfileById(existingBooking?.driverId ?? trip.driverId);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>(
    existingBooking?.paymentMethod ?? 'card'
  );
  const [isConfirmed, setIsConfirmed] = useState(false);

  const serviceFee = useMemo(() => {
    const subtotal = existingBooking?.totalPrice ?? trip.pricePerSeat;
    return Math.max(3, Math.round(subtotal * 0.16));
  }, [existingBooking?.totalPrice, trip.pricePerSeat]);

  const subtotal = existingBooking?.totalPrice ?? trip.pricePerSeat;
  const total = existingBooking?.paymentStatus === 'paid' ? subtotal : subtotal + serviceFee;
  const returnTo = pageData?.returnTo ?? (existingBooking ? 'my-trips' : 'trip-detail');

  if (isConfirmed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-12 w-12 text-[#00C9A7]" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Reservation confirmee
        </h1>
        <p className="mb-8 max-w-sm text-gray-500">
          Votre place pour le trajet {trip.fromCity} {'->'} {trip.toCity} est
          maintenant verrouillee. Les points de rencontre pourront etre precises
          dans le chat.
        </p>

        <Button
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
          onClick={() => navigate(existingBooking ? 'my-trips' : 'messages')}
        >
          {existingBooking ? 'Retour a mes trajets' : 'Ouvrir la conversation'}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-5 pt-12 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => navigate(returnTo, pageData)}
            className="rounded-full bg-gray-100 p-2 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {existingBooking ? 'Detail de reservation' : 'Paiement'}
            </h1>
            <p className="text-sm text-gray-500">
              {existingBooking
                ? 'Vue passager pour suivre un trajet reserve.'
                : 'Resume et choix du mode de paiement.'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <Card className="border-none shadow-sm">
          <CardContent className="space-y-4 px-5 py-5">
            <div className="flex items-start justify-between">
              <div>
                  <p className="text-lg font-bold text-gray-900">
                    {trip.fromCity} {'->'} {trip.toCity}
                  </p>
                <p className="text-sm text-gray-500">{trip.dateLabel}</p>
              </div>
              {existingBooking ? (
                <Badge
                  className={
                    existingBooking.paymentStatus === 'paid'
                      ? 'border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                      : 'border-0 bg-amber-100 text-amber-700 hover:bg-amber-100'
                  }
                >
                  {existingBooking.paymentStatus === 'paid'
                    ? 'Paye'
                    : 'Paiement en attente'}
                </Badge>
              ) : null}
            </div>

            <div className="rounded-[1.5rem] bg-gray-50 p-4">
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
                <p className="text-xs text-gray-500">{driver.vehicle}</p>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() =>
                  navigate('chat', {
                    conversationId: driver.id === 'marc' ? 'conv-2' : 'conv-1',
                    returnTo: 'booking-confirmation',
                  })
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="space-y-3 px-5 py-5">
            <h2 className="text-lg font-bold text-gray-900">Resume</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Trajet ({existingBooking?.seats ?? 1} place)</span>
              <span className="font-medium text-gray-900">{subtotal}€</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Frais de service</span>
              <span className="font-medium text-gray-900">
                {existingBooking?.paymentStatus === 'paid' ? 'Inclus' : `${serviceFee}€`}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#0066FF]">{total}€</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="space-y-3 px-5 py-5">
            <h2 className="text-lg font-bold text-gray-900">Mode de paiement</h2>
            {[
              {
                value: 'card',
                title: 'Carte bancaire',
                description: 'Paiement en ligne et confirmation immediate.',
                icon: CreditCard,
              },
              {
                value: 'cash',
                title: 'Especes',
                description: 'Paiement direct au conducteur au depart.',
                icon: Banknote,
              },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPaymentMethod(option.value as 'card' | 'cash')}
                className={`flex w-full items-center justify-between rounded-[1.25rem] border-2 px-4 py-4 text-left transition ${
                  paymentMethod === option.value
                    ? 'border-[#0066FF] bg-blue-50/60'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm">
                    <option.icon className="h-5 w-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{option.title}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
                <span
                  className={`h-5 w-5 rounded-full border-2 ${
                    paymentMethod === option.value
                      ? 'border-[#0066FF] bg-[#0066FF]'
                      : 'border-gray-300'
                  }`}
                />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 pb-safe">
        <Button
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
          onClick={() => setIsConfirmed(true)}
        >
          {existingBooking?.paymentStatus === 'paid'
            ? 'Confirmer les details'
            : paymentMethod === 'cash'
              ? 'Confirmer la reservation'
              : `Payer ${total}€`}
        </Button>
      </div>
    </div>
  );
}
