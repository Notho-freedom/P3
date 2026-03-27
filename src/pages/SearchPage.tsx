import React, { useState } from 'react';
import { ArrowLeft, Car, Filter, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Badge } from '../components/Badge';
interface SearchPageProps {
  navigate: (page: string, data?: any) => void;
}
export function SearchPage({ navigate }: SearchPageProps) {
  const [view, setView] = useState('list');
  const trips = [
  {
    id: 1,
    driver: 'Sophie M.',
    rating: 4.9,
    from: 'Paris',
    to: 'Lyon',
    time: '14:30',
    price: 25,
    seats: 2,
    type: 'planned'
  },
  {
    id: 2,
    driver: 'Marc D.',
    rating: 4.7,
    from: 'Paris (Sud)',
    to: 'Lyon (Centre)',
    time: '16:00',
    price: 20,
    seats: 3,
    type: 'planned'
  },
  {
    id: 3,
    driver: 'Julie L.',
    rating: 5.0,
    from: 'Paris',
    to: 'Lyon',
    time: 'Immédiat',
    price: 35,
    seats: 1,
    type: 'available'
  }];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('home')}
            className="p-2 -ml-2 text-gray-600">
            
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Résultats</h1>
          <button className="p-2 -mr-2 text-gray-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Paris</span>
            <span className="text-gray-400">→</span>
            <span className="font-semibold">Lyon</span>
          </div>
          <span className="text-gray-500">Auj.</span>
        </div>
      </div>

      <Tabs
        defaultValue="list"
        className="flex-1 flex flex-col w-full"
        onValueChange={setView}>
        
        <div className="px-4 py-3 bg-white border-b border-gray-100">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="map">Carte</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="flex-1 p-4 space-y-4 m-0">
          {trips.map((trip) =>
          <Card
            key={trip.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() =>
            navigate('trip-detail', {
              id: trip.id
            })
            }>
            
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${trip.id}`} />
                    
                      <AvatarFallback>{trip.driver.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{trip.driver}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="text-yellow-500 mr-1">★</span>{' '}
                        {trip.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-[#0066FF]">
                      {trip.price}€
                    </span>
                    <p className="text-xs text-gray-500">{trip.seats} places</p>
                  </div>
                </div>

                <div className="relative pl-4 border-l-2 border-gray-200 space-y-4 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white border-2 border-[#0066FF] rounded-full"></div>
                    <p className="text-sm font-semibold">{trip.time}</p>
                    <p className="text-xs text-gray-500">{trip.from}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#00C9A7] rounded-full"></div>
                    <p className="text-sm font-semibold">Arrivée estimée</p>
                    <p className="text-xs text-gray-500">{trip.to}</p>
                  </div>
                </div>

                {trip.type === 'available' &&
              <div className="mt-4 pt-3 border-t border-gray-100">
                    <Badge
                  variant="secondary"
                  className="bg-teal-50 text-[#00C9A7] hover:bg-teal-50">
                  
                      Chauffeur disponible maintenant
                    </Badge>
                  </div>
              }
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="map" className="flex-1 m-0 relative">
          {/* Placeholder Map */}
          <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#0066FF] mx-auto mb-2 opacity-50" />
              <p className="text-gray-500 font-medium">Carte interactive</p>
              <p className="text-sm text-gray-400">
                Affichage des trajets et chauffeurs
              </p>
            </div>

            {/* Mock Map Pins */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#0066FF]">
              <Car className="w-4 h-4 text-[#0066FF]" />
            </div>
            <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#00C9A7]">
              <Car className="w-4 h-4 text-[#00C9A7]" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>);

}
