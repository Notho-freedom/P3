import React from 'react';
import { MapPin, Calendar, Search, Car, Bell, UserCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
interface HomePageProps {
  navigate: (page: string, data?: any) => void;
}
export function HomePage({ navigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0066FF] to-[#00C9A7] pt-12 pb-28 px-4 rounded-b-[2rem] relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            RideFlex
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('notifications')}
              className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('auth')}
              className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
              
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-white/90 text-lg font-medium">
          Le covoiturage réinventé.
        </p>
        <p className="text-white/80 text-sm mt-1">
          Trouvez votre trajet idéal aujourd'hui.
        </p>
      </div>

      {/* Search Card */}
      <div className="-mt-20 px-4 relative z-10">
        <Card className="shadow-xl border-0">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center border-b border-gray-100 pb-3">
              <MapPin className="text-[#0066FF] w-5 h-5 mr-3" />
              <Input
                placeholder="Lieu de départ"
                className="border-0 focus-visible:ring-0 px-0 h-auto text-base shadow-none" />
              
            </div>
            <div className="flex items-center border-b border-gray-100 pb-3">
              <MapPin className="text-[#00C9A7] w-5 h-5 mr-3" />
              <Input
                placeholder="Lieu d'arrivée"
                className="border-0 focus-visible:ring-0 px-0 h-auto text-base shadow-none" />
              
            </div>
            <div className="flex items-center pb-2">
              <Calendar className="text-gray-400 w-5 h-5 mr-3" />
              <Input
                type="date"
                className="border-0 focus-visible:ring-0 px-0 h-auto text-base text-gray-600 shadow-none" />
              
            </div>
            <Button
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-12 text-lg rounded-xl mt-2"
              onClick={() => navigate('search')}>
              
              Rechercher
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:border-[#0066FF] transition-colors"
            onClick={() => navigate('publish')}>
            
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0066FF]">
                <Car className="w-6 h-6" />
              </div>
              <span className="font-semibold text-sm text-gray-800">
                Publier un trajet
              </span>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-[#00C9A7] transition-colors"
            onClick={() => navigate('driver-dashboard')}>
            
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#00C9A7]">
                <Search className="w-6 h-6" />
              </div>
              <span className="font-semibold text-sm text-gray-800">
                Mode Dispo
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Trajets récents
        </h2>
        <Card
          className="mb-4 cursor-pointer"
          onClick={() =>
          navigate('trip-detail', {
            id: 1
          })
          }>
          
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">Jean Dupont</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="text-yellow-500 mr-1">★</span> 4.8
                  </div>
                </div>
              </div>
              <span className="font-bold text-[#0066FF] text-lg">15€</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <span className="font-medium">Paris</span>
              <span className="text-gray-300">→</span>
              <span className="font-medium">Lyon</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Aujourd'hui, 14:30</p>
          </CardContent>
        </Card>
      </div>
    </div>);

}