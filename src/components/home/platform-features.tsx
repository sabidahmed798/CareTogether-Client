"use client";

import {
  MapPin,
  Users,
  CalendarDays,
  Heart,
  ChartNoAxesColumnIncreasing,
  Globe,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Feature information
const features = [
  {
    icon: MapPin,
    title: "Local Initiatives",
    description:
      "Discover community projects across Jashore, from health camps to clean-up drives.",
    color: "text-cyan-500 dark:text-cyan-400",
  },
  {
    icon: Users,
    title: "Volunteer Matching",
    description:
      "Find opportunities that match your skills, free time and neighbourhood.",
    color: "text-violet-500 dark:text-violet-400",
  },
  {
    icon: CalendarDays,
    title: "Event Management",
    description:
      "Create, join and manage community events with simple sign-ups.",
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    icon: Heart,
    title: "Support Those in Need",
    description:
      "Connect with families and individuals who need help in your community.",
    color: "text-pink-500 dark:text-pink-400",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Transparent Impact",
    description:
      "See how every contribution creates measurable results for the community.",
    color: "text-emerald-500 dark:text-emerald-400",
  },
  {
    icon: Globe,
    title: "Community Network",
    description:
      "Meet neighbours, groups and organizations working for a better Jashore.",
    color: "text-amber-500 dark:text-orange-400",
  },
];

export function PlatformFeatures() {
  return (
    <section
      aria-labelledby="platform-features-heading"
      className="relative overflow-hidden bg-slate-50 px-4 py-20 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-[#05221D]"
    >
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-teal-500/10 blur-[120px] dark:bg-purple-600/20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/20"
      />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#149c8e] dark:text-white/90">
            Why Care Together
          </p>

          <h2
            id="platform-features-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Platform Features
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
            Everything you need to give, serve and grow together, all in one
            place for Jashore.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group relative isolate h-full overflow-hidden rounded-2xl border border-teal-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_0_30px_rgba(42,167,155,0.25)] sm:p-8 dark:border-white/20 dark:bg-[#082a24] dark:shadow-black/20 dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"
              >
                {/* RGB lighting on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Card background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-px -z-10 rounded-2xl bg-white transition-colors duration-300 dark:bg-[#082a24]"
                />

                {/* Icon */}
                <CardHeader className="p-0">
                  <div
                    className={`flex size-14 items-center justify-center rounded-xl border border-slate-200/70 bg-teal-50/80 transition-all duration-300 group-hover:scale-110 group-hover:bg-white dark:border-white/10 dark:bg-white/10 dark:group-hover:bg-white/20 ${feature.color}`}
                  >
                    <Icon className="size-7" />
                  </div>

                  <CardTitle className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                {/* Description */}
                <CardContent className="mt-3 p-0">
                  <p className="text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-slate-900 dark:text-white/70 dark:group-hover:text-white">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
