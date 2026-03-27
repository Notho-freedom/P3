import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Settings, Car } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Switch } from '../components/Switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
interface DriverDashboardProps {
  navigate: (page: string, data?: any) => void;
}
export function DriverDashboard({ navigate }: DriverDashboardProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center mb-2">
          <button
            onClick={() => navigate('home')}
            className="p-2 -ml-2 text-gray-600">
            
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">
            Espace Chauffeur
          </h1>
        </div>
      </div>

      <Tabs defaultValue="mode-dispo" className="w-full mt-4">
        <div className="px-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="mode-dispo">Mode Dispo</TabsTrigger>
            <TabsTrigger value="mes-trajets">Mes Trajets</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mode-dispo" className="p-4 space-y-6">
          <Card
            className={`border-2 transition-colors ${isAvailable ? 'border-[#00C9A7] bg-teal-50/30' : 'border-gray-200'}`}>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Mode Disponible
                  </h2>
                  <p className="text-sm text-gray-500">
                    Recevez des demandes en temps réel
                  </p>
                </div>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-[#00C9A7]" />
                
              </div>

              {isAvailable &&
              <div className="mt-4 pt-4 border-t border-gray-200/60 flex items-center text-[#00C9A7]">
                  <div className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse mr-2"></div>
                  <span className="text-sm font-medium">
                    Vous êtes visible par les passagers
                  </span>
                </div>
              }
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Settings className="w-4 h-4 mr-2 text-gray-500" />
                Paramètres de disponibilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Zone de départ actuelle
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-[#0066FF] w-5 h-5" />
                  <Input defaultValue="Paris Centre" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Rayon d'acceptation (km)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    defaultValue="10"
                    className="flex-1 accent-[#0066FF]" />
                  
                  <span className="font-bold text-[#0066FF] w-8 text-right">
                    10
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Disponibilité jusqu'à
                </label>
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400 w-5 h-5" />
                  <Input type="time" defaultValue="18:00" className="flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mes-trajets" className="p-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
                  Confirmé
                </Badge>
                <span className="font-bold text-[#0066FF] text-lg">45€</span>
              </div>
              <div className="relative pl-4 border-l-2 border-gray-200 space-y-4 ml-2 mb-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white border-2 border-[#0066FF] rounded-full"></div>
                  <p className="text-sm font-semibold">14:30 - Paris</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#00C9A7] rounded-full"></div>
                  <p className="text-sm font-semibold">18:00 - Lyon</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">3 passagers</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                  navigate('trip-detail', {
                    id: 1
                  })
                  }>
                  
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);

}