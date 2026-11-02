"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Users,
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
    "Health Camp":
      "border-teal-500/30 bg-teal-50 text-teal-700 dark:border-teal-400/30 dark:bg-teal-500/10 dark:text-teal-300",
    "Clean-up Drive":
      "border-orange-500/30 bg-orange-50 text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300",
    Education:
      "border-blue-500/30 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300",
    "Food & Water":
      "border-amber-500/30 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300",
    "Blood Donation":
      "border-red-500/30 bg-red-50 text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300",
    Other:
      "border-purple-500/30 bg-purple-50 text-purple-700 dark:border-purple-400/30 dark:bg-purple-500/10 dark:text-purple-300",
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
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-600 dark:text-teal-400" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by name..."
            className="h-12 rounded-full border-slate-300 bg-white pl-11 pr-11 text-slate-900 placeholder:text-slate-400 focus-visible:ring-teal-500 dark:border-[#29483f] dark:bg-[#102820] dark:text-white dark:placeholder:text-slate-500"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing{" "}
          <span className="font-bold text-teal-600 dark:text-teal-300">
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
                ? "border-teal-500 bg-teal-500 text-white shadow-md shadow-teal-500/25"
                : "border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-700 dark:border-[#29483f] dark:bg-[#102820] dark:text-slate-400 dark:hover:border-teal-500/60 dark:hover:text-teal-300"
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
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-lg dark:border-[#23443b] dark:bg-[#102820]/90 dark:shadow-md dark:hover:border-teal-500/60 dark:hover:shadow-xl dark:hover:shadow-teal-950/30"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-[#183a31]">
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
                    <div className="flex h-full items-center justify-center text-teal-600 dark:text-teal-400">
                      <ImageIcon className="h-12 w-12 opacity-40" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Date */}
                  <div className="absolute left-3 top-3 flex h-[62px] w-[55px] flex-col items-center justify-center rounded-xl bg-white shadow-md">
                    <span className="text-2xl font-extrabold leading-none text-slate-900">
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
                  <h2 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-300">
                    {event.title}
                  </h2>

                  <p className="mt-1.5 min-h-10 text-xs leading-5 text-slate-600 line-clamp-2 dark:text-slate-400">
                    {event.description}
                  </p>

                  {/* Information */}
                  <div className="mt-3 space-y-2 border-b border-slate-100 pb-3 dark:border-[#29483f]">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span>{date.full}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span className="line-clamp-1">
                        {event.venue || "Location not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400">
                      <Users className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500">Organized by</p>
                      <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {event.venue || "Community Team"}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/upcoming/${event._id}`}
                    className="mt-4 flex h-10 w-full items-center justify-center rounded-full border border-teal-500/40 text-xs font-semibold text-teal-700 transition-all hover:bg-teal-500 hover:text-white dark:border-teal-500/50 dark:text-teal-300 dark:hover:bg-teal-500 dark:hover:text-white"
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
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center dark:border-[#31584b] dark:bg-[#102820]/50">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
            <Search className="h-7 w-7 text-teal-600 dark:text-teal-400" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No Events Found
          </h2>

          <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
            We couldn&apos;t find any events matching your search. Try another
            name or select a different category.
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
