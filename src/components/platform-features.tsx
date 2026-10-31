"use client";

import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRightIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  LineChartIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FeatureAccent = "coral" | "teal";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: FeatureAccent;
};

const FEATURES: Feature[] = [
  {
    icon: MapPinIcon,
    title: "Local Initiatives",
    description:
      "Discover community projects running across Jashore, from health camps to clean-up drives.",
    accent: "coral",
  },
  {
    icon: UsersIcon,
    title: "Volunteer Matching",
    description:
      "Find opportunities that fit your skills, your free time and your neighbourhood.",
    accent: "teal",
  },
  {
    icon: CalendarIcon,
    title: "Event Management",
    description:
      "Create, join and track events with simple sign-ups and timely reminders.",
    accent: "coral",
  },
  {
    icon: HeartIcon,
    title: "Support Those in Need",
    description:
      "Connect with families and individuals who need help, and support them directly.",
    accent: "teal",
  },
  {
    icon: LineChartIcon,
    title: "Transparent Impact",
    description:
      "See how every contribution turns into real, measurable results for the community.",
    accent: "coral",
  },
  {
    icon: GlobeIcon,
    title: "Community Network",
    description:
      "Meet neighbours, groups and organizations working for a better Jashore.",
    accent: "teal",
  },
];

const ACCENT_CLASS: Record<FeatureAccent, string> = {
  coral: "bg-[#ff6b5b]/12 text-[#ff6b5b] group-hover/card:shadow-[#ff6b5b]/30",
  teal: "bg-[#3ec2b4]/12 text-[#3ec2b4] group-hover/card:shadow-[#3ec2b4]/30",
};

/**
 * Fades/slides its child in once it scrolls into view (staggered by `delay`).
 * Reduced motion is handled in CSS, where `.reveal` is forced visible.
 */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Stagger delay in milliseconds, applied after the element is revealed. */
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  // Reduced motion is handled in CSS (`.reveal` is forced visible there), so no
  // special-casing is needed here.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <Card className="group/card h-full gap-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 ring-0 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/25 sm:p-7">
      <CardHeader className="gap-0 px-0">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-12 w-fit items-center justify-center rounded-xl shadow-lg transition-all duration-300 ease-out group-hover/card:scale-110",
            ACCENT_CLASS[feature.accent]
          )}
        >
          <Icon className="size-6" />
        </span>
        <CardTitle className="mt-5 text-lg font-semibold tracking-tight text-white sm:text-xl">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2.5 px-0">
        <CardDescription className="text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover/card:text-white/75">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function PlatformFeatures() {
  return (
    <section
      aria-labelledby="platform-features-heading"
      className="relative isolate overflow-hidden bg-[#08201d]"
    >
      {/* Ambient teal + coral glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-[#3ec2b4]/10 blur-[130px]" />
        <div className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-[#ff6b5b]/8 blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Section header */}
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-white/70 sm:text-sm">
            <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-[#ff6b5b]" />
            WHY CARE TOGETHER
          </p>
          <h2
            id="platform-features-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl"
          >
            Platform Features
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            Everything you need to give, serve and grow together, all in one
            place for Jashore.
          </p>
        </Reveal>

        {/* Feature grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 80}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        {/* Closing call to action */}
        <Reveal className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center sm:px-12 sm:py-14">
            {/* Teal accent line along the top edge */}
            <div
              aria-hidden="true"
              className="animate-hero-sweep absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#3ec2b4] to-transparent"
            />
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to make a difference?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              Whether you have an hour to spare or a skill to share, there is a
              place for you in the Jashore community.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="brand"
                size="lg"
                render={<Link href="/contact" />}
                className="group h-11 gap-2 rounded-full px-6 text-[0.95rem] shadow-lg shadow-[#ff6b5b]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff6b5b]/45 active:translate-y-0"
              >
                Get Involved
                <ArrowRightIcon
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                render={<Link href="/events" />}
                className="group h-11 gap-2 rounded-full border-white/45 bg-white/10 px-6 text-[0.95rem] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-black/25 focus-visible:border-white/70 focus-visible:ring-white/40 active:translate-y-0 dark:border-white/25"
              >
                Browse Events
                <ArrowRightIcon
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
