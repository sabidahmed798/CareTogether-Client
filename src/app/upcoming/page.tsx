import Link from "next/link";

import { Plus, Heart, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import UpcomingEvents from "@/components/home/upcoming-events";

interface IEvent {
  _id: string;
  title: string;
  description: string;
  category?: string;
  thumbnail?: string;
  venue?: string;
  date?: string;
  email?: string;
}

const UpcomingEventPage = async () => {
  let events: IEvent[] = [];

  try {
    const res = await fetch(
      `${process.env.Next_PUBLIC_API_URL}/upcoming-event`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming events");
    }

    const result = await res.json();

    events = Array.isArray(result)
      ? result
      : result.data || result.events || [];
  } catch (error) {
    console.error("Upcoming Events Error:", error);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081a16] px-4 py-12 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-[500px] h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge className="mb-4 border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-teal-300">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Make A Difference
            </Badge>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                Events
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Explore upcoming community initiatives, discover meaningful
              activities, and connect with people who are working together to
              create positive change.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-teal-300">
              <Heart className="h-4 w-4" />
              <span>{events.length} Upcoming Events Available</span>
            </div>
          </div>

          <Link
            href="/create-event"
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-6 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-1 hover:shadow-teal-500/40"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create an Event
          </Link>
        </div>

        {/* Search, Category and Event Cards */}
        <UpcomingEvents events={events} />

        {/* Footer */}
        <div className="mt-12 border-t border-[#23443b] pt-6 text-center">
          <p className="text-xs text-slate-500">
            Together We Can Make A Difference
            <span className="mx-2 text-teal-500">✦</span>
            CareTogether Community
          </p>
        </div>
      </div>
    </main>
  );
};

export default UpcomingEventPage;
