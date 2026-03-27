import React, { Fragment } from 'react';
import {
  Settings,
  CreditCard,
  Clock,
  Star,
  ChevronRight,
  LogOut,
  ShieldCheck } from
'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { Button } from '../components/Button';
import { Separator } from '../components/Separator';
interface ProfilePageProps {
  navigate: (page: string, data?: any) => void;
}
export function ProfilePage({ navigate }: ProfilePageProps) {
  const menuItems = [
  {
    icon: Clock,
    label: 'Historique des trajets',
    action: () => {}
  },
  {
    icon: CreditCard,
    label: 'Paiements et remboursements',
    action: () => {}
  },
  {
    icon: ShieldCheck,
    label: "Vérification d'identité",
    action: () => {}
  },
  {
    icon: Settings,
    label: 'Paramètres du compte',
    action: () => {}
  }];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil</h1>

        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 border-2 border-white shadow-md">
            <AvatarImage src="https://i.pravatar.cc/150?u=me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Alexandre B.</h2>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              <span className="font-medium mr-1">4.9</span>
              <span>(124 avis)</span>
            </div>
            <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-[#0066FF] text-xs font-semibold rounded-md">
              Chauffeur & Passager
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) =>
          <Fragment key={index}>
              <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={item.action}>
              
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              {index < menuItems.length - 1 && <Separator className="ml-14" />}
            </Fragment>
          )}
        </div>
      </div>

      <div className="mt-6 px-4">
        <Button
          variant="outline"
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={() => navigate('auth')}>
          
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </Button>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        <p>RideFlex v1.0.0</p>
      </div>
    </div>);

}