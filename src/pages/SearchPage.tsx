import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Car,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { SlidingPanel } from '../components/SlidingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { getProfileById, searchTrips } from '../data/mockData';

interface SearchPageProps {
  navigate: (page: string, data?: any) => void;
  pageData?: {
    initialFilters?: {
      from?: string;
      to?: string;
      date?: string;
      seats?: string;
    };
  } | null;
}

export function SearchPage({ navigate, pageData }: SearchPageProps) {
  const [filters, setFilters] = useState({
    from: pageData?.initialFilters?.from ?? 'Paris',
    to: pageData?.initialFilters?.to ?? 'Lyon',
    date: pageData?.initialFilters?.date ?? '2026-03-27',
    seats: pageData?.initialFilters?.seats ?? '1',
  });
  const [view, setView] = useState<'list' | 'map'>('list');

  const results = useMemo(() => {
    return searchTrips.filter((trip) => {
      const fromMatch = trip.fromCity
        .toLowerCase()
        .includes(filters.from.trim().toLowerCase());
      const toMatch = trip.toCity
        .toLowerCase()
        .includes(filters.to.trim().toLowerCase());
      const seatsMatch = trip.seatsAvailable >= Number(filters.seats || 1);
      return fromMatch && toMatch && seatsMatch;
    });
  }, [filters]);

  const renderTripCard = (tripId: string) => {
    const trip = searchTrips.find((item) => item.id === tripId);
    if (!trip) {
      return null;
    }
    const driver = getProfileById(trip.driverId);

    return (
      <Card
        key={trip.id}
        className="cursor-pointer border-none shadow-sm transition hover:shadow-md"
        onClick={() =>
          navigate('trip-detail', {
            tripId: trip.id,
            returnTo: 'search',
          })
        }
      >
        <CardContent className="space-y-4 px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-full"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate('public-profile', {
                    profileId: driver.id,
                    returnTo: 'search',
                    returnData: {
                      initialFilters: filters,
                    },
                  });
                }}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={driver.avatar} />
                  <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
                <p className="text-xs text-gray-500">
                  {driver.rating} ★ • {driver.vehicle}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#0066FF]">
                {trip.pricePerSeat}€ / place
              </p>
              <p className="text-xs text-gray-500">
                {trip.seatsAvailable} place(s) restantes
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-gray-50 p-4">
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
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-0 bg-blue-50 text-[#0066FF] hover:bg-blue-50">
              {trip.dateLabel}
            </Badge>
            {trip.kind === 'available' ? (
              <Badge className="border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                Chauffeur disponible maintenant
              </Badge>
            ) : null}
            {trip.stopovers?.length ? (
              <Badge className="border-0 bg-slate-100 text-slate-700 hover:bg-slate-100">
                {trip.stopovers.length} arret(s) intermediaire(s)
              </Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-5 pt-12 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('home')}
              className="rounded-full bg-gray-100 p-2 text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Recherche</h1>
              <p className="text-sm text-gray-500">
                Le passager cherche ici un conducteur.
              </p>
            </div>
          </div>
          <button className="rounded-full bg-gray-100 p-2 text-gray-600">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="rounded-[1.75rem] bg-[#f4f7fb] p-4">
          <div className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0066FF]" />
              <Input
                value={filters.from}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, from: event.target.value }))
                }
                className="h-12 rounded-2xl border-none bg-white pl-10 shadow-none"
                placeholder="Depart"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00C9A7]" />
              <Input
                value={filters.to}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, to: event.target.value }))
                }
                className="h-12 rounded-2xl border-none bg-white pl-10 shadow-none"
                placeholder="Destination"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="date"
                  value={filters.date}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, date: event.target.value }))
                  }
                  className="h-12 rounded-2xl border-none bg-white pl-10 shadow-none"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="4"
                  value={filters.seats}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, seats: event.target.value }))
                  }
                  className="h-12 rounded-2xl border-none bg-white pl-10 shadow-none"
                />
              </div>
            </div>
            <Button className="h-12 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white">
              <Search className="mr-2 h-4 w-4" />
              Mettre a jour les resultats
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        className="w-full"
        value={view}
        onValueChange={(value) => setView(value as 'list' | 'map')}
      >
        <div className="px-4 py-4">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-white p-1 shadow-sm">
            <TabsTrigger value="list" className="rounded-xl">
              Liste
            </TabsTrigger>
            <TabsTrigger value="map" className="rounded-xl">
              Carte
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="space-y-4 px-4">
          <Card className="border-none bg-slate-950 text-white shadow-lg">
            <CardContent className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-base font-semibold">
                  {results.length} conducteur(s) correspondent
                </p>
                <p className="text-sm text-white/65">
                  Vue liste pour comparer prix, places et destination.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <Car className="h-5 w-5 text-[#00C9A7]" />
              </div>
            </CardContent>
          </Card>

          {results.map((trip) => renderTripCard(trip.id))}
        </TabsContent>

        <TabsContent value="map" className="m-0">
          <div className="relative h-[calc(100vh-250px)] px-4 pb-4">
            <MapPlaceholder
              className="h-full w-full"
              title="Mode carte distinct"
              subtitle="Prototype Mapbox a personnaliser pour les trajets et les zones"
            />
            <div className="absolute left-8 top-6 rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              {results.length} resultats autour de {filters.from}
            </div>
            <SlidingPanel className="mx-4" initialSnap={36} snapPoints={[28, 56, 88]}>
              <div className="space-y-4 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Resultats sur carte
                    </h2>
                    <p className="text-sm text-gray-500">
                      La liste reste accessible, la carte sert a comparer les zones.
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-50 p-3 text-[#0066FF]">
                    <Map className="h-5 w-5" />
                  </div>
                </div>
                {results.map((trip) => renderTripCard(trip.id))}
              </div>
            </SlidingPanel>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
