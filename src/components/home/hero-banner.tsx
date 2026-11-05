"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  accent: "coral" | "teal";
};

const STATS: Stat[] = [
  { value: 1450, suffix: "+", label: "Active Volunteers", accent: "coral" },
  { value: 180, suffix: "+", label: "Events Completed", accent: "teal" },
  { value: 24000, suffix: "+", label: "Lives Impacted", accent: "coral" },
  { value: 100, suffix: "%", label: "Community Driven", accent: "teal" },
];

const ACCENT_CLASS: Record<Stat["accent"], string> = {
  coral: "text-[#ff6b5b]",
  teal: "text-[#3ec2b4]",
};

/**
 * Animates from 0 to `target` once the element scrolls into view.
 * Jumps straight to the final value when reduced motion is preferred.
 */
function useCountUp(target: number, duration = 1800) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = target.toLocaleString("en-US");
      return;
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(target * eased).toLocaleString("en-US");
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return ref;
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const numberRef = useCountUp(stat.value);

  return (
    <div
      className={cn(
        "group relative px-4 py-7 text-center transition-colors duration-300 hover:bg-white/[0.05] sm:px-6 sm:py-8",
        // Mobile (2 cols): right border on even cells, row divider on first row.
        index % 2 === 0 && "border-r border-white/10",
        index < 2 && "border-b border-white/10 lg:border-b-0",
        // Desktop (4 cols): divider after every cell except the last.
        "lg:border-r lg:border-white/10",
        index === STATS.length - 1 && "lg:border-r-0",
      )}
    >
      <span
        className={cn(
          "block text-3xl font-bold tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:text-4xl",
          ACCENT_CLASS[stat.accent],
        )}
      >
        <span ref={numberRef} className="tabular-nums">
          0
        </span>
        {stat.suffix}
      </span>
      <span className="mt-1.5 block text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white/90 sm:text-sm">
        {stat.label}
      </span>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section
      aria-label="CareTogether introduction"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end"
    >
      {/* Background image + scrims (clipped so the slow zoom never bleeds) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-hero-zoom-in absolute inset-0">
          <Image
            src="/images/banner.png"
            alt="Historic Jashore campus building framed by palm trees and flower gardens"
            fill
            priority
            sizes="100vw"
            className="animate-hero-kenburns object-cover"
          />
        </div>
        {/* Left-to-right teal scrim keeps the copy readable (matches design) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062b27]/95 via-[#062b27]/70 to-[#062b27]/10" />
        {/* Top + bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04211d]/70 via-transparent to-[#04211d]" />
      </div>

      {/* Copy */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <p className="animate-hero-fade-up flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-white/90 sm:text-sm [animation-delay:60ms]">
          <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
            <span className="animate-hero-dot-ping absolute inline-flex size-full rounded-full bg-[#ff6b5b]" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#ff6b5b]" />
          </span>
          CARE TOGETHER · JASHORE
        </p>

        <h1 className="animate-hero-fade-up mt-5 max-w-2xl text-4xl leading-[1.06] font-bold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl [animation-delay:160ms]">
          Together, We Can Make Jashore Better.
        </h1>

        <p className="animate-hero-fade-up mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base [animation-delay:260ms]">
          Join hands to make a difference in our community. Discover local
          initiatives, support those in need, and create a better future for
          everyone in Jashore.
        </p>

        <div className="animate-hero-fade-up mt-8 flex flex-wrap items-center gap-3 sm:gap-4 [animation-delay:360ms]">
          <Button
            variant="brand"
            size="lg"
            render={<Link href="/create-event" />}
            className="group h-11 gap-2 rounded-full px-6 text-[0.95rem] shadow-lg shadow-[#ff6b5b]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff6b5b]/45 active:translate-y-0"
          >
            Create an Event
            {/* <ArrowRightIcon
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            /> */}
          </Button>

          <Button
            variant="outline"
            size="lg"
            render={<Link href="/upcoming" />}
            className="group h-11 gap-2 rounded-full border-white/45 bg-white/10 px-6 text-[0.95rem] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-black/25 focus-visible:border-white/70 focus-visible:ring-white/40 active:translate-y-0 dark:border-white/25"
          >
            Explore Upcoming Events
            <ArrowRightIcon
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>

      {/* Stats card — overlapping the hero floor */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
        <div className="animate-hero-fade-up relative overflow-hidden rounded-2xl border border-white/10 bg-[#06221f]/85 shadow-2xl shadow-black/40 backdrop-blur-xl sm:rounded-3xl [animation-delay:460ms]">
          {/* Teal accent line along the top edge */}
          <div
            aria-hidden="true"
            className="animate-hero-sweep absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#3ec2b4] to-transparent"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <StatCell key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
