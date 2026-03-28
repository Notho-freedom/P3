import React from 'react';
import { MapPin, Navigation, Route } from 'lucide-react';
import { cn } from './utils';

interface MapPlaceholderProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function MapPlaceholder({
  className,
  title = 'Carte pensee pour Mapbox',
  subtitle = 'Mode carte, points de rencontre et zones de trajet',
}: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] bg-slate-950 text-white',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,201,167,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(0,102,255,0.4),_transparent_38%),linear-gradient(160deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.92))]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-75"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="route-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C9A7" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
        </defs>
        <path
          d="M68 618 C104 556, 154 512, 194 452 C236 390, 264 332, 308 272"
          fill="none"
          stroke="url(#route-line)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="18 12"
        />
      </svg>

      <div className="absolute left-10 top-28 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
        <MapPin className="h-4 w-4 text-[#00C9A7]" />
        <span className="text-sm font-medium text-white/90">Depart actif</span>
      </div>

      <div className="absolute right-10 top-52 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
        <Navigation className="h-4 w-4 text-[#0066FF]" />
        <span className="text-sm font-medium text-white/90">Zone chauffeur</span>
      </div>

      <div className="absolute bottom-28 left-10 right-10 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Route className="h-6 w-6 text-[#00C9A7]" />
          </div>
          <div>
            <p className="text-base font-semibold">{title}</p>
            <p className="text-sm text-white/70">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs text-white/70">
          <div className="rounded-2xl bg-black/15 px-3 py-2">Liste et carte separentes</div>
          <div className="rounded-2xl bg-black/15 px-3 py-2">Points precis a venir</div>
        </div>
      </div>
    </div>
  );
}
