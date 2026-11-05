"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  date?: string;
  venue?: string;
  thumbnail?: string;
  category?: string;
}

export default function RecentUpcoming() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}recent-upcoming`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: Event[] = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#05221D] px-4 py-20 md:py-28">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full border border-teal-400/20 bg-teal-400/10 px-5 py-2 text-sm font-semibold tracking-wider text-teal-300">
            Upcoming Initiatives
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Recent Upcoming <span className="text-teal-400">Events</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-400">
            Latest 6 community drives scheduled in your city. Get involved today
            and make a difference together.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-teal-400" />
        </div>

        {/* Event Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B3029] transition-all duration-500 hover:-translate-y-2 hover:border-teal-400/40 hover:shadow-2xl hover:shadow-teal-950/50"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.thumbnail || "/images/event-campus.jpg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3029] via-transparent to-transparent" />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  {event.category || "Community Initiative"}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-teal-300">
                  {event.title}
                </h3>

                {/* Event Information */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CalendarDays className="h-4 w-4 shrink-0 text-teal-400" />

                    <span>{event.date || "Date not available"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <MapPin className="h-4 w-4 shrink-0 text-teal-400" />

                    <span className="line-clamp-1">
                      {event.venue || "Location not available"}
                    </span>
                  </div>
                </div>

                {/* View Event Button */}
                <div className="mt-auto w-full pt-7">
                  <Link
                    href={`/upcoming/${event._id}`}
                    className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#05221D] shadow-lg transition-all duration-300 hover:bg-teal-100 hover:shadow-xl"
                  >
                    View Event
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400">
              No upcoming events available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
