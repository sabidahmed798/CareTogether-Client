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
    color: "text-cyan-400",
  },
  {
    icon: Users,
    title: "Volunteer Matching",
    description:
      "Find opportunities that match your skills, free time and neighbourhood.",
    color: "text-violet-400",
  },
  {
    icon: CalendarDays,
    title: "Event Management",
    description:
      "Create, join and manage community events with simple sign-ups.",
    color: "text-blue-400",
  },
  {
    icon: Heart,
    title: "Support Those in Need",
    description:
      "Connect with families and individuals who need help in your community.",
    color: "text-pink-400",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Transparent Impact",
    description:
      "See how every contribution creates measurable results for the community.",
    color: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "Community Network",
    description:
      "Meet neighbours, groups and organizations working for a better Jashore.",
    color: "text-orange-400",
  },
];

export function PlatformFeatures() {
  return (
    <section
      aria-labelledby="platform-features-heading"
      className="relative overflow-hidden bg-[#05221D] px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-purple-600/20 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
            Why Care Together
          </p>

          <h2
            id="platform-features-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Platform Features
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
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
                className="group relative isolate h-full overflow-hidden rounded-2xl border border-white/40 bg-[#D5F1EE] p-6 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] sm:p-8"
              >
                {/* RGB lighting */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Card background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-px -z-10 rounded-2xl bg-[#D5F1EE]"
                />

                {/* Icon */}
                <CardHeader className="p-0">
                  <div
                    className={`flex size-14 items-center justify-center rounded-xl border border-black/5 bg-white/70 transition-all duration-300 group-hover:scale-110 group-hover:bg-white ${feature.color}`}
                  >
                    <Icon className="size-7" />
                  </div>

                  <CardTitle className="mt-6 text-xl font-semibold text-[#123B39]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                {/* Description */}
                <CardContent className="mt-3 p-0">
                  <p className="text-sm leading-7 text-[#496967] transition-colors duration-300 group-hover:text-[#123B39]">
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
