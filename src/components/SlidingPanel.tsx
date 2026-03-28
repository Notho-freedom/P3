import React from 'react';
import { cn } from './utils';

interface SlidingPanelProps {
  children: React.ReactNode;
  className?: string;
  snapPoints?: number[];
  initialSnap?: number;
}

export function SlidingPanel({
  children,
  className,
  snapPoints = [30, 56, 88],
  initialSnap = 56,
}: SlidingPanelProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const pointerStartRef = React.useRef<number | null>(null);
  const snapStartRef = React.useRef(initialSnap);
  const [currentSnap, setCurrentSnap] = React.useState(initialSnap);

  const sortedSnapPoints = React.useMemo(
    () => [...snapPoints].sort((a, b) => a - b),
    [snapPoints]
  );

  const clampSnap = React.useCallback(
    (value: number) => {
      const min = sortedSnapPoints[0] ?? 30;
      const max = sortedSnapPoints[sortedSnapPoints.length - 1] ?? 88;
      return Math.min(max, Math.max(min, value));
    },
    [sortedSnapPoints]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    pointerStartRef.current = event.clientY;
    snapStartRef.current = currentSnap;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerStartRef.current === null || !panelRef.current) {
      return;
    }

    const deltaY = event.clientY - pointerStartRef.current;
    const panelHeight = panelRef.current.getBoundingClientRect().height || 1;
    const nextValue = snapStartRef.current - (deltaY / panelHeight) * 100;
    setCurrentSnap(clampSnap(nextValue));
  };

  const handlePointerUp = () => {
    pointerStartRef.current = null;
    const closestSnap = sortedSnapPoints.reduce((closest, snapPoint) => {
      return Math.abs(snapPoint - currentSnap) < Math.abs(closest - currentSnap)
        ? snapPoint
        : closest;
    }, sortedSnapPoints[0] ?? currentSnap);

    setCurrentSnap(closestSnap);
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        'pointer-events-auto absolute inset-x-0 bottom-0 z-20 h-[82vh] rounded-t-[2rem] border border-white/10 bg-white shadow-[0_-30px_80px_rgba(15,23,42,0.28)] transition-transform duration-300 ease-out',
        className
      )}
      style={{ transform: `translateY(${100 - currentSnap}%)` }}
    >
      <button
        type="button"
        className="flex w-full cursor-grab items-center justify-center rounded-t-[2rem] py-4 active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'none' }}
      >
        <span className="h-1.5 w-14 rounded-full bg-gray-300" />
      </button>
      <div className="h-[calc(100%-56px)] overflow-y-auto px-4 pb-8">{children}</div>
    </div>
  );
}
