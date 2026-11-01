"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Users,
  Plus,
  Heart,
  Search,
  ImageIcon,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

interface UpcomingEventsProps {
  events: IEvent[];
}

const categories = [
  "All",
  "Health Camp",
  "Clean-up Drive",
  "Education",
  "Food & Water",
  "Blood Donation",
  "Other",
];

const formatDate = (date?: string) => {
  if (!date) {
    return { day: "--", month: "---", full: "Date TBA" };
  }

  const [year, month, day] = date.split("-").map(Number);

  const eventDate =
    year && month && day ? new Date(year, month - 1, day) : new Date(date);

  if (Number.isNaN(eventDate.getTime())) {
    return { day: "--", month: "---", full: "Date TBA" };
  }

  return {
    day: String(eventDate.getDate()).padStart(2, "0"),
    month: eventDate.toLocaleDateString("en-US", {
      month: "short",
    }),
    full: eventDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };
};

const getCategoryColor = (category?: string) => {
  const colors: Record<string, string> = {
    "Health Camp": "border-teal-400/30 bg-teal-500/10 text-teal-300",
    "Clean-up Drive": "border-orange-400/30 bg-orange-500/10 text-orange-300",
    Education: "border-blue-400/30 bg-blue-500/10 text-blue-300",
    "Food & Water": "border-amber-400/30 bg-amber-500/10 text-amber-300",
    "Blood Donation": "border-red-400/30 bg-red-500/10 text-red-300",
    Other: "border-purple-400/30 bg-purple-500/10 text-purple-300",
  };

  return colors[category || "Other"] || colors.Other;
};

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        (event.category || "Other") === activeCategory;

      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, search]);

  return (
    <div>
      {/* Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-400" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by name..."
            className="h-12 rounded-full border-[#29483f] bg-[#102820] pl-11 pr-11 text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-bold text-teal-300">
            {filteredEvents.length}
          </span>{" "}
          of {events.length} events
        </p>
      </div>

      {/* Categories */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "border-teal-400 bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                : "border-[#29483f] bg-[#102820] text-slate-400 hover:border-teal-500/60 hover:text-teal-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => {
            const date = formatDate(event.date);

            return (
              <Card
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#23443b] bg-[#102820]/90 py-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/60 hover:shadow-xl hover:shadow-teal-950/30"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#183a31]">
                  {event.thumbnail ? (
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-teal-400">
                      <ImageIcon className="h-12 w-12 opacity-40" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081a16]/70 via-transparent to-black/10" />

                  {/* Date */}
                  <div className="absolute left-3 top-3 flex h-[62px] w-[55px] flex-col items-center justify-center rounded-xl bg-white shadow-lg">
                    <span className="text-2xl font-extrabold leading-none text-[#102820]">
                      {date.day}
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase text-red-500">
                      {date.month}
                    </span>
                  </div>

                  {/* Category */}
                  <Badge
                    variant="outline"
                    className={`absolute right-3 top-3 border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md ${getCategoryColor(event.category)}`}
                  >
                    {event.category || "Other"}
                  </Badge>

                  <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest text-white">
                    UPCOMING EVENT
                  </span>
                </div>

                {/* Content */}
                <CardContent className="flex flex-col p-4">
                  <h2 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-teal-300">
                    {event.title}
                  </h2>

                  <p className="mt-1.5 line-clamp-2 min-h-10 text-xs leading-5 text-slate-400">
                    {event.description}
                  </p>

                  {/* Information */}
                  <div className="mt-3 space-y-2 border-b border-[#29483f] pb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-teal-400" />
                      <span>{date.full}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-400" />
                      <span className="line-clamp-1">
                        {event.venue || "Location not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
                      <Users className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500">Organized by</p>
                      <p className="truncate text-xs font-semibold text-slate-200">
                        {event.venue || "Community Team"}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-4 flex h-10 w-full items-center justify-center rounded-full border border-teal-500/50 text-xs font-semibold text-teal-300 transition-all hover:bg-teal-500 hover:text-white"
                  >
                    View Event
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#31584b] bg-[#102820]/50 px-5 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
            <Search className="h-7 w-7 text-teal-400" />
          </div>

          <h2 className="text-xl font-bold text-white">No Events Found</h2>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            We couldn t find any events matching your search. Try another name
            or select a different category.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-5 rounded-full bg-teal-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-teal-400"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
