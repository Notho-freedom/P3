import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Separator } from '../components/Separator';
interface BookingConfirmationProps {
  navigate: (page: string, data?: any) => void;
}
export function BookingConfirmation({ navigate }: BookingConfirmationProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isConfirmed, setIsConfirmed] = useState(false);
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#00C9A7]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Réservation confirmée !
        </h1>
        <p className="text-gray-500 mb-8">
          Votre place pour le trajet Paris → Lyon a bien été réservée.
        </p>

        <Button
          className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-14 text-lg rounded-xl"
          onClick={() => navigate('home')}>
          
          Retour à l'accueil
        </Button>
      </div>);

  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center mb-2">
          <button
            onClick={() => navigate('trip-detail')}
            className="p-2 -ml-2 text-gray-600">
            
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Paiement</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Résumé</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Trajet (1 place)</span>
              <span className="font-medium">21,00 €</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">Frais de service</span>
              <span className="font-medium">4,00 €</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#0066FF]">25,00 €</span>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">
            Moyen de paiement
          </h2>
          <div className="space-y-3">
            <Card
              className={`cursor-pointer border-2 transition-all ${paymentMethod === 'card' ? 'border-[#0066FF] bg-blue-50/30' : 'border-gray-200'}`}
              onClick={() => setPaymentMethod('card')}>
              
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${paymentMethod === 'card' ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-900">
                    Carte bancaire
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#0066FF]' : 'border-gray-300'}`}>
                  
                  {paymentMethod === 'card' &&
                  <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-full"></div>
                  }
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer border-2 transition-all ${paymentMethod === 'cash' ? 'border-[#00C9A7] bg-teal-50/30' : 'border-gray-200'}`}
              onClick={() => setPaymentMethod('cash')}>
              
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${paymentMethod === 'cash' ? 'bg-[#00C9A7] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      Espèces
                    </span>
                    <span className="text-xs text-gray-500">
                      Paiement direct au chauffeur
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-[#00C9A7]' : 'border-gray-300'}`}>
                  
                  {paymentMethod === 'cash' &&
                  <div className="w-2.5 h-2.5 bg-[#00C9A7] rounded-full"></div>
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 pb-safe bg-white border-t border-gray-200">
        <Button
          className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-14 text-lg rounded-xl shadow-lg"
          onClick={() => setIsConfirmed(true)}>
          
          Payer 25,00 €
        </Button>
      </div>
    </div>);

}