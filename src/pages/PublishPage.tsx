import React from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Euro } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Separator } from '../components/Separator';
interface PublishPageProps {
  navigate: (page: string, data?: any) => void;
}
export function PublishPage({ navigate }: PublishPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center mb-2">
          <button
            onClick={() => navigate('home')}
            className="p-2 -ml-2 text-gray-600">
            
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">
            Publier un trajet
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Itinéraire
              </h2>
              <div className="flex items-center space-x-3">
                <MapPin className="text-[#0066FF] w-5 h-5" />
                <div className="flex-1">
                  <Input
                    placeholder="Lieu de départ exact"
                    className="border-gray-200" />
                  
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-[#00C9A7] w-5 h-5" />
                <div className="flex-1">
                  <Input
                    placeholder="Lieu d'arrivée exact"
                    className="border-gray-200" />
                  
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Date et Heure
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    className="border-gray-200 text-gray-600" />
                  
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-gray-400 w-5 h-5" />
                  <Input
                    type="time"
                    className="border-gray-200 text-gray-600" />
                  
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Détails
              </h2>
              <div className="flex items-center space-x-3">
                <Users className="text-gray-400 w-5 h-5" />
                <div className="flex-1 flex items-center justify-between border border-gray-200 rounded-md px-3 py-2">
                  <span className="text-sm text-gray-600">
                    Places disponibles
                  </span>
                  <div className="flex items-center space-x-3">
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                      -
                    </button>
                    <span className="font-semibold">3</span>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Euro className="text-gray-400 w-5 h-5" />
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    placeholder="Prix par passager"
                    className="border-gray-200 pl-3 pr-8" />
                  
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-14 text-lg rounded-xl shadow-lg"
          onClick={() => {
            alert('Trajet publié avec succès !');
            navigate('home');
          }}>
          
          Publier mon trajet
        </Button>
      </div>
    </div>);

}