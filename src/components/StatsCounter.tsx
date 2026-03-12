
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  className?: string;
}

function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count}</span>;
}

export function StatsCounter({ label, value, suffix = "", className }: StatProps) {
  return (
    <div className={cn("text-center space-y-1 p-4", className)}>
      <div className="text-4xl font-headline font-bold text-accent">
        <Counter target={value} />
        {suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}
