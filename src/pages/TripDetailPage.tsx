import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Star,
  Info } from
'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Separator } from '../components/Separator';
interface TripDetailPageProps {
  navigate: (page: string, data?: any) => void;
}
export function TripDetailPage({ navigate }: TripDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm z-10 sticky top-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('search')}
            className="p-2 -ml-2 text-gray-600">
            
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Détails du trajet</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Date & Route */}
        <div className="bg-white p-6 mb-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Aujourd'hui</h2>

          <div className="relative pl-6 border-l-2 border-gray-200 space-y-8 ml-2">
            <div className="relative">
              <div className="absolute -left-[29px] top-1 w-4 h-4 bg-white border-4 border-[#0066FF] rounded-full"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-gray-900">14:30</p>
                  <p className="text-base font-medium text-gray-800">Paris</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Gare de Lyon, Hall 1
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 w-4 h-4 bg-[#00C9A7] rounded-full"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-gray-900">18:00</p>
                  <p className="text-base font-medium text-gray-800">Lyon</p>
                  <p className="text-sm text-gray-500 mt-1">Gare Part-Dieu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="bg-white p-4 mb-2 flex justify-between items-center">
          <span className="text-gray-600 font-medium">
            Prix total pour 1 passager
          </span>
          <span className="text-2xl font-bold text-[#0066FF]">25,00 €</span>
        </div>

        {/* Driver Info */}
        <div className="bg-white p-4 mb-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sophie M.</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                  <span className="font-medium mr-1">4.9</span>
                  <span>(42 avis)</span>
                </div>
              </div>
            </div>
            <button
              className="p-3 bg-blue-50 text-[#0066FF] rounded-full"
              onClick={() =>
              navigate('chat', {
                id: 1,
                name: 'Sophie M.'
              })
              }>
              
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <ShieldCheck className="w-5 h-5 text-[#00C9A7] mr-3" />
              <span className="text-sm">Identité vérifiée</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Info className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-sm">Peugeot 208 • Blanche</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-50">
        <Button
          className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-14 text-lg rounded-xl shadow-lg"
          onClick={() => navigate('booking-confirmation')}>
          
          Continuer
        </Button>
      </div>
    </div>);

}