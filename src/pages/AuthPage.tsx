import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { Card, CardContent } from '../components/Card';
interface AuthPageProps {
  navigate: (page: string, data?: any) => void;
}
export function AuthPage({ navigate }: AuthPageProps) {
  const [role, setRole] = useState('passager');
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-4 pt-12 pb-4">
        <button
          onClick={() => navigate('home')}
          className="p-2 -ml-2 text-gray-600">
          
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center pb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C9A7] mb-2">
            RideFlex
          </h1>
          <p className="text-gray-500">
            Rejoignez la communauté du covoiturage
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Adresse email"
                  type="email"
                  className="pl-10 h-12" />
                
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Mot de passe"
                  type="password"
                  className="pl-10 h-12" />
                
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-[#0066FF] font-medium">
                Mot de passe oublié ?
              </a>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-12 text-lg rounded-xl mt-4"
              onClick={() => navigate('home')}>
              
              Se connecter
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="Nom complet" className="pl-10 h-12" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Adresse email"
                  type="email"
                  className="pl-10 h-12" />
                
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Mot de passe"
                  type="password"
                  className="pl-10 h-12" />
                
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Je souhaite utiliser RideFlex en tant que :
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${role === 'passager' ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-gray-200 text-gray-500'}`}
                    onClick={() => setRole('passager')}>
                    
                    <span className="font-semibold text-sm">Passager</span>
                  </div>
                  <div
                    className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${role === 'chauffeur' ? 'border-[#00C9A7] bg-teal-50 text-[#00C9A7]' : 'border-gray-200 text-gray-500'}`}
                    onClick={() => setRole('chauffeur')}>
                    
                    <span className="font-semibold text-sm">Chauffeur</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C9A7] hover:opacity-90 text-white h-12 text-lg rounded-xl mt-6"
              onClick={() => navigate('home')}>
              
              Créer un compte
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

}