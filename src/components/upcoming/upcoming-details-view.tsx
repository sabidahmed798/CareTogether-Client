"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  CalendarDays,
  Mail,
  MapPin,
  Share2,
  ShieldCheck,
  Tag,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import JoinEventsPage from "../joined/joinEvent";

export interface IUpcomingEvent {
  _id: string;
  title: string;
  date?: string;
  venue?: string;
  thumbnail?: string;
  description?: string;
  email?: string;
  category?: string;
}

interface UpcomingDetailsViewProps {
  event: IUpcomingEvent;
  moreEvents?: IUpcomingEvent[];
}

function formatEventDate(dateStr?: string) {
  if (!dateStr) {
    return {
      day: "--",
      month: "TBA",
      full: "Date not announced",
    };
  }

  const parts = dateStr.split("-").map(Number);

  const dateObj =
    parts.length === 3 && parts.every(Number.isFinite)
      ? new Date(parts[0], parts[1] - 1, parts[2])
      : new Date(dateStr);

  if (Number.isNaN(dateObj.getTime())) {
    return {
      day: "--",
      month: "TBA",
      full: dateStr,
    };
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];
  const dayNum = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  return {
    day: dayNum,
    month: monthName.toUpperCase(),
    full: `${dayName}, ${monthName} ${dateObj.getDate()}, ${year}`,
  };
}

function getOrganizerInfo(email?: string) {
  if (!email) {
    return { name: "Community Organizer", initials: "CO" };
  }

  const username = email.split("@")[0].replace(/[._-]/g, " ").trim();

  const words = username.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    const name = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      name,
      initials: (words[0][0] + words[1][0]).toUpperCase(),
    };
  }

  if (words.length === 1) {
    return {
      name: words[0].charAt(0).toUpperCase() + words[0].slice(1),
      initials: words[0].slice(0, 2).toUpperCase(),
    };
  }

  return { name: "Community Organizer", initials: "CO" };
}

export function UpcomingDetailsView({
  event,
  moreEvents = [],
}: UpcomingDetailsViewProps) {
  const [hasJoined, setHasJoined] = React.useState(false);
  const [volunteerCount, setVolunteerCount] = React.useState(18);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [volunteerName, setVolunteerName] = React.useState("");
  const [volunteerContact, setVolunteerContact] = React.useState("");

  const formattedDate = React.useMemo(
    () => formatEventDate(event.date),
    [event.date],
  );

  const organizer = React.useMemo(
    () => getOrganizerInfo(event.email),
    [event.email],
  );

  const bannerImage = event.thumbnail?.startsWith("http")
    ? event.thumbnail
    : "/images/banner.png.jpg";

  // Share event
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Event Link Copied!", {
        description: "The link has been copied to your clipboard.",
      });
    } catch {
      toast.error("Unable to copy event link.");
    }
  };

  // Volunteer registration
  const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasJoined) {
      setDialogOpen(false);
      return;
    }

    setVolunteerCount((prev) => prev + 1);
    setHasJoined(true);
    setDialogOpen(false);

    toast.success("Welcome aboard!", {
      description: `Thank you ${volunteerName}! You are now registered for ${event.title}.`,
    });

    setVolunteerName("");
    setVolunteerContact("");
  };

  return (
    <div className="relative min-h-screen bg-[#081a16] text-white">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-10">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={bannerImage}
            alt={event.title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="scale-105 object-cover opacity-25 blur-[1px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#081a16] via-[#081a16]/85 to-[#081a16]/40" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#081a16]/90 via-[#081a16]/75 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70"
          >
            <Link href="/" className="hover:text-teal-300">
              Home
            </Link>

            <span>/</span>

            <Link href="/upcoming" className="hover:text-teal-300">
              Upcoming Events
            </Link>

            <span>/</span>

            <span className="max-w-[200px] truncate font-semibold text-teal-300">
              {event.category || event.title}
            </span>
          </nav>

          {/* Category */}
          <div className="mb-5">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 rounded-full border-teal-400/40 bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-300"
            >
              <Tag className="size-3" />
              {event.category || "Community Initiative"}
            </Badge>
          </div>

          {/* Event Image */}
          <div className="relative h-[250px] w-full overflow-hidden rounded-xl sm:h-[400px]">
            <Image
              src={bannerImage}
              alt={event.thumbnail || "Event Image"}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 1200px"
              className="rounded-xl object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>

          {/* Venue and Date */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-white/80 sm:gap-6 sm:text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-teal-400" />
              <span>{event.venue || "Location not specified"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0 text-teal-400" />
              <span>{formattedDate.full}</span>
            </div>
          </div>

          {/* VOLUNTEER ACTION BAR */}
          <div className="relative mt-8 rounded-2xl border border-teal-500/30 bg-[#0d2822]/90 p-4 shadow-xl shadow-black/40 backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-5">
            {/* Volunteer Count */}
            <div className="mb-4 flex items-center gap-3.5 sm:mb-0">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/15 text-teal-300">
                <Users className="size-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {volunteerCount} Volunteers Joined
                </h3>

                <p className="text-xs text-slate-400 sm:text-sm">
                  {hasJoined
                    ? "You are registered as a volunteer"
                    : "Sign up to join hands for this event"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                aria-label="Share event"
                className="size-10 rounded-full border-teal-500/40 bg-teal-500/10 text-teal-300 hover:bg-teal-500/25 hover:text-white"
              >
                <Share2 className="size-4" />
              </Button>
              {/* 
              //==================== */}

              <JoinEventsPage event={event} />
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.9fr_1fr] lg:gap-12">
          {/* LEFT COLUMN */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              About this Event
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-7">
              <p className="whitespace-pre-line">
                {event.description || "No event description available."}
              </p>
            </div>

            <div className="my-8 h-px w-full bg-white/10" />

            {/* Volunteer Guidelines */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                Volunteer Guidelines
              </h3>

              <ul className="mt-4 space-y-3.5">
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#e5483e]" />
                  <span className="text-sm leading-6 text-slate-300">
                    Please arrive 15 minutes before the scheduled time at the
                    designated location.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#20a89a]" />
                  <span className="text-sm leading-6 text-slate-300">
                    Wear comfortable clothing suitable for helping out.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#e5483e]" />
                  <span className="text-sm leading-6 text-slate-300">
                    Bring any pre-coordinated supplies or items requested by the
                    organizer.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: ORGANIZER */}
          <div>
            <Card className="overflow-hidden rounded-2xl border border-[#204037] border-t-2 border-t-[#e5483e] bg-[#0c2621]/95 p-6 shadow-xl">
              <CardContent className="p-0">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Event Organizer
                </span>

                <div className="mt-4 flex items-center gap-3.5">
                  <Avatar className="size-12 ring-2 ring-teal-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 via-[#187569] to-emerald-700 text-sm font-bold text-white">
                      {organizer.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-base font-bold text-white">
                      {organizer.name}
                    </h4>

                    {event.email && (
                      <a
                        href={`mailto:${event.email}`}
                        className="group mt-0.5 flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-300"
                      >
                        <Mail className="size-3.5 shrink-0 text-teal-400" />

                        <span className="truncate group-hover:underline">
                          {event.email}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-teal-400">
                  <ShieldCheck className="size-4 shrink-0" />
                  <span>Verified Platform Member</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MORE UPCOMING EVENTS */}
      {moreEvents.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              More upcoming events
            </h2>

            <Link
              href="/upcoming"
              className="group flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300"
            >
              View all
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {moreEvents.slice(0, 2).map((other) => {
              const otherDate = formatEventDate(other.date);

              return (
                <Link
                  key={other._id}
                  href={`/upcoming/${encodeURIComponent(other._id)}`}
                  className="group relative flex items-center gap-4 rounded-2xl border border-[#204037] bg-[#0c2621]/80 p-4 shadow-md transition-all hover:-translate-y-1 hover:border-teal-500/60 hover:bg-[#10332c]"
                >
                  {/* Date */}
                  <div className="flex size-[58px] shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#14352e]">
                    <span className="text-xl font-black leading-none text-white">
                      {otherDate.day}
                    </span>

                    <span className="mt-1 text-[10px] font-bold uppercase text-[#e5483e]">
                      {otherDate.month}
                    </span>
                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white group-hover:text-teal-300">
                      {other.title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {other.category || "Initiative"} ·{" "}
                      {other.venue || "Jashore"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* JOIN VOLUNTEER DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md border border-[#204037] bg-[#0c2621] text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
              <Sparkles className="size-5 text-[#e5483e]" />
              Join as Volunteer
            </DialogTitle>

            <DialogDescription className="text-xs text-slate-400">
              Sign up to volunteer for &quot;{event.title}&quot; on{" "}
              {formattedDate.full}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleJoinSubmit} className="space-y-4 pt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="vol-name"
                className="text-xs font-semibold text-slate-200"
              >
                Your Full Name
              </Label>

              <Input
                id="vol-name"
                required
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                placeholder="e.g. Rahim Uddin"
                className="h-10 border-[#29443e] bg-[#071b18] text-sm text-white placeholder:text-slate-500"
              />
            </div>

            {/* Contact */}
            <div className="space-y-1.5">
              <Label
                htmlFor="vol-contact"
                className="text-xs font-semibold text-slate-200"
              >
                Email or Phone Number
              </Label>

              <Input
                id="vol-contact"
                required
                value={volunteerContact}
                onChange={(e) => setVolunteerContact(e.target.value)}
                placeholder="you@example.com or +8801700..."
                className="h-10 border-[#29443e] bg-[#071b18] text-sm text-white placeholder:text-slate-500"
              />
            </div>

            {/* Event Information */}
            <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 text-xs text-teal-300">
              <div className="flex items-center gap-2 font-semibold">
                <CalendarDays className="size-4 shrink-0 text-teal-400" />
                <span>Event Day: {formattedDate.full}</span>
              </div>

              <p className="mt-1 text-[11px] text-slate-400">
                Venue: {event.venue || "Location not specified"}
              </p>
            </div>

            {/* Footer */}
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="rounded-full bg-[#e5483e] font-bold text-white hover:bg-[#d43d33]"
              >
                Confirm Registration
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
