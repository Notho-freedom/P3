import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  Euro,
  MapPin,
  Plus,
  Repeat2,
  Users,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Input } from '../components/Input';

interface PublishPageProps {
  navigate: (page: string, data?: any) => void;
}

const recurringDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function PublishPage({ navigate }: PublishPageProps) {
  const [step, setStep] = useState(1);
  const [from, setFrom] = useState('Paris • Gare de Lyon');
  const [to, setTo] = useState('Lyon • Part-Dieu');
  const [stops, setStops] = useState(['Melun']);
  const [date, setDate] = useState('2026-03-27');
  const [time, setTime] = useState('17:00');
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mar']);
  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState('18');
  const totalSteps = 4;

  const summaryLabel = useMemo(() => {
    if (!isRecurring) {
      return `${date} • ${time}`;
    }

    return `${selectedDays.join(', ')} • ${time} chaque semaine`;
  }, [date, isRecurring, selectedDays, time]);

  const nextStep = () => setStep((current) => Math.min(totalSteps, current + 1));
  const previousStep = () => setStep((current) => Math.max(1, current - 1));

  const addStop = () => {
    setStops((current) => [...current, `Arret ${current.length + 1}`]);
  };

  const updateStop = (index: number, value: string) => {
    setStops((current) => current.map((stop, stopIndex) => (stopIndex === index ? value : stop)));
  };

  const toggleRecurringDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day]
    );
  };

  const publishTrip = () => {
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-5 pt-12 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <button
            onClick={() => (step === 1 ? navigate('home') : previousStep())}
            className="rounded-full bg-gray-100 p-2 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Publier un trajet</h1>
                <p className="text-sm text-gray-500">
                  Workflow P2, interface P3.
                </p>
              </div>
              <Badge className="border-0 bg-blue-50 text-[#0066FF] hover:bg-blue-50">
                Etape {step}/{totalSteps}
              </Badge>
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] transition-all"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-4 py-4">
        {step === 1 ? (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Quel est votre itineraire ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0066FF]" />
                <Input
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  className="h-12 rounded-2xl pl-10"
                  placeholder="Lieu de depart"
                />
              </div>
              {stops.map((stop, index) => (
                <div key={`${stop}-${index}`} className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f97316]" />
                  <Input
                    value={stop}
                    onChange={(event) => updateStop(index, event.target.value)}
                    className="h-12 rounded-2xl pl-10"
                    placeholder="Arret intermediaire"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addStop}
                className="flex items-center gap-2 text-sm font-semibold text-[#0066FF]"
              >
                <Plus className="h-4 w-4" />
                Ajouter un arret
              </button>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00C9A7]" />
                <Input
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  className="h-12 rounded-2xl pl-10"
                  placeholder="Lieu d'arrivee"
                />
              </div>
            </CardContent>
          </Card>
        ) : null}

        {step === 2 ? (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Quand partez-vous ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="h-12 rounded-2xl pl-10"
                  />
                </div>
                <div className="relative">
                  <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="h-12 rounded-2xl pl-10"
                  />
                </div>
              </div>

              <Card className="border border-gray-100 bg-gray-50">
                <CardContent className="flex items-center justify-between px-4 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Repeat2 className="h-4 w-4 text-[#00C9A7]" />
                      <p className="font-semibold text-gray-900">Trajet regulier</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Base sur des jours de semaine + une heure.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRecurring((current) => !current)}
                    className={`flex h-8 w-14 items-center rounded-full p-1 transition ${
                      isRecurring ? 'bg-[#00C9A7]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`h-6 w-6 rounded-full bg-white shadow-sm transition ${
                        isRecurring ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </CardContent>
              </Card>

              {isRecurring ? (
                <div className="rounded-[1.5rem] bg-gray-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-gray-900">
                    Quels jours ?
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {recurringDays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleRecurringDay(day)}
                        className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                          selectedDays.includes(day)
                            ? 'bg-slate-950 text-white'
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        {step === 3 ? (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Places et prix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-[1.5rem] bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Users className="h-4 w-4 text-[#0066FF]" />
                  Places disponibles
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSeats((current) => Math.max(1, current - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-700 shadow-sm"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{seats}</p>
                    <p className="text-xs text-gray-500">places pour passagers</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSeats((current) => Math.min(4, current + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-700 shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/70">
                  <Euro className="h-4 w-4 text-[#00C9A7]" />
                  Prix par passager
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="h-16 rounded-2xl border-white/10 bg-white/10 text-center text-4xl font-bold text-white placeholder:text-white/50"
                  />
                  <span className="text-2xl font-semibold text-white/70">€</span>
                </div>
                <p className="mt-3 text-sm text-white/65">
                  Prix recommande selon la distance: 15€ - 22€.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <Card className="border-none bg-gradient-to-br from-slate-950 via-slate-900 to-[#0b4aa2] text-white shadow-xl">
              <CardContent className="space-y-4 px-5 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <CheckCircle2 className="h-6 w-6 text-[#00C9A7]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Resume avant publication</h2>
                    <p className="text-sm text-white/70">
                      Validation finale avant mise en ligne.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="space-y-5 px-5 py-5">
                <div className="space-y-4 border-l-2 border-gray-200 pl-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Depart</p>
                    <p className="text-sm text-gray-500">{from}</p>
                  </div>
                  {stops.map((stop) => (
                    <div key={stop}>
                      <p className="text-sm font-semibold text-gray-900">Arret</p>
                      <p className="text-sm text-gray-500">{stop}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Destination</p>
                    <p className="text-sm text-gray-500">{to}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">Planning</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {summaryLabel}
                    </p>
                  </div>
                  <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">Prix par place</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{price}€</p>
                  </div>
                </div>
                <div className="rounded-[1.25rem] bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-500">Places disponibles</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{seats}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 pb-safe">
        <div className="flex gap-3">
          {step > 1 ? (
            <Button variant="outline" className="h-12 flex-1 rounded-2xl" onClick={previousStep}>
              Retour
            </Button>
          ) : null}
          <Button
            className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
            onClick={step === totalSteps ? publishTrip : nextStep}
          >
            {step === totalSteps ? 'Publier le trajet' : 'Continuer'}
          </Button>
        </div>
      </div>
    </div>
  );
}
