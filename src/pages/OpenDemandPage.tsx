import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Euro,
  MapPin,
  MessageCircle,
  SendHorizonal,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Input } from '../components/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { openDemandRequests, getProfileById } from '../data/mockData';

interface OpenDemandPageProps {
  navigate: (page: string, data?: any) => void;
}

export function OpenDemandPage({ navigate }: OpenDemandPageProps) {
  const [form, setForm] = useState({
    from: 'Paris 13e',
    to: 'Orleans centre',
    date: '2026-03-27',
    budget: '18',
    details: 'Je peux marcher 5 minutes pour le point de rencontre.',
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pb-5 pt-12 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="rounded-full bg-gray-100 p-2 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Demande ouverte</h1>
            <p className="text-sm text-gray-500">
              Le passager publie son besoin, le conducteur propose un trajet.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 py-4">
        <Card className="border-none bg-gradient-to-br from-slate-950 via-slate-900 to-[#0b4aa2] text-white shadow-xl">
          <CardContent className="space-y-3 px-5 py-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white/75">
              <Sparkles className="h-4 w-4 text-[#00C9A7]" />
              Prototype retenu depuis P2
            </div>
            <h2 className="text-xl font-bold">Publier un besoin passager</h2>
            <p className="text-sm text-white/75">
              Idéal quand aucun trajet existant ne colle exactement à votre horaire
              ou à votre zone.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nouvelle demande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0066FF]" />
              <Input
                value={form.from}
                onChange={(event) =>
                  setForm((current) => ({ ...current, from: event.target.value }))
                }
                className="h-12 rounded-2xl pl-10"
                placeholder="D'où partez-vous ?"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00C9A7]" />
              <Input
                value={form.to}
                onChange={(event) =>
                  setForm((current) => ({ ...current, to: event.target.value }))
                }
                className="h-12 rounded-2xl pl-10"
                placeholder="Ou allez-vous ?"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="date"
                  value={form.date}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, date: event.target.value }))
                  }
                  className="h-12 rounded-2xl pl-10"
                />
              </div>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={form.budget}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, budget: event.target.value }))
                  }
                  className="h-12 rounded-2xl pl-10"
                  placeholder="Budget"
                />
              </div>
            </div>
            <textarea
              value={form.details}
              onChange={(event) =>
                setForm((current) => ({ ...current, details: event.target.value }))
              }
              className="min-h-[110px] w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              placeholder="Precisez votre souplesse horaire, vos bagages ou votre point ideal."
            />
            <Button
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00C9A7] text-white"
              onClick={() => navigate('messages')}
            >
              <SendHorizonal className="mr-2 h-4 w-4" />
              Publier la demande
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Demandes recentes visibles aux conducteurs
          </h2>
          <div className="space-y-3">
            {openDemandRequests.map((request) => {
              const passenger = getProfileById(request.passengerId);
              return (
                <Card key={request.id} className="border-none shadow-sm">
                  <CardContent className="space-y-4 px-5 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={passenger.avatar} />
                          <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <button
                            className="text-left text-sm font-semibold text-gray-900"
                            onClick={() =>
                            navigate('public-profile', {
                              profileId: passenger.id,
                              returnTo: 'open-demand',
                              returnData: null,
                            })
                          }
                          >
                            {passenger.name}
                          </button>
                          <p className="text-xs text-gray-500">{request.postedAgo}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0066FF]">
                        Budget {request.budget}€
                      </span>
                    </div>

                    <div className="rounded-[1.5rem] bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {request.fromLabel} {'->'} {request.toLabel}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{request.dateLabel}</p>
                      <p className="mt-3 text-sm text-gray-600">{request.details}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-11 rounded-2xl"
                        onClick={() =>
                          navigate('chat', {
                            conversationId: 'conv-3',
                            returnTo: 'open-demand',
                          })
                        }
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contacter
                      </Button>
                      <Button
                        className="h-11 rounded-2xl bg-slate-950 text-white hover:bg-slate-900"
                        onClick={() => navigate('publish')}
                      >
                        Proposer un trajet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
