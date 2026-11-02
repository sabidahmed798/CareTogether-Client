"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Heart,
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

/** Formats a date string into day, month, and full readable text */
function formatEventDate(dateStr?: string) {
  if (!dateStr) {
    return { day: "15", month: "NOV", full: "Sun, Nov 15, 2026" };
  }

  const parts = dateStr.split("-").map(Number);
  const dateObj =
    parts.length === 3
      ? new Date(parts[0], parts[1] - 1, parts[2])
      : new Date(dateStr);

  if (Number.isNaN(dateObj.getTime())) {
    return { day: "--", month: "TBA", full: dateStr };
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

/** Extracts readable organizer name and 2-letter initials from email or username */
function getOrganizerInfo(email?: string) {
  if (!email) {
    return { name: "Rahim Uddin", initials: "RU" };
  }

  const username = email.split("@")[0].replace(/[._-]/g, " ").trim();
  const words = username.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    const capitalized = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const initials = (words[0][0] + words[1][0]).toUpperCase();
    return { name: capitalized, initials };
  }

  if (words.length === 1 && words[0].length > 0) {
    const word = words[0];
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    const initials = word.slice(0, 2).toUpperCase();
    return { name: capitalized, initials };
  }

  return { name: "Rahim Uddin", initials: "RU" };
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

  // Copy event link to clipboard
  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Event Link Copied!", {
          description: "The link has been copied to your clipboard.",
        });
      }
    } catch {
      toast.info("Share URL:", {
        description: window.location.href,
      });
    }
  };

  // Submit volunteer registration
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasJoined) {
      setVolunteerCount((prev) => prev + 1);
      setHasJoined(true);
    }
    setDialogOpen(false);
    toast.success("Welcome aboard!", {
      description: `Thank you ${volunteerName || "volunteer"}! You are now registered for ${event.title}.`,
    });
  };

  // Fallback banner image if event thumbnail is not provided or fails
  const bannerImage =
    event.thumbnail && event.thumbnail.startsWith("http")
      ? event.thumbnail
      : "/images/banner.png.jpg";

  return (
    <div className="relative min-h-screen bg-[#081a16] text-white transition-colors duration-300 dark:bg-[#081a16]">
      {/* ============================================================== */}
      {/* 1. HERO BANNER HEADER                                          */}
      {/* ============================================================== */}
      <section className="relative w-full overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-10">
        {/* Background Image with Dark Vignette Scrim */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={bannerImage}
            alt={event.title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover opacity-25 filter blur-[1px] transition-transform duration-1000 scale-105"
          />
          {/* Gradient Scrims matching the design screenshot */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081a16] via-[#081a16]/85 to-[#081a16]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081a16]/90 via-[#081a16]/75 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70"
          >
            <Link
              href="/"
              className="transition-colors hover:text-teal-300 hover:underline"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/upcoming"
              className="transition-colors hover:text-teal-300 hover:underline"
            >
              Upcoming Events
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-teal-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {event.category || event.title}
            </span>
          </nav>
          {/* Category Pill Tag */}
          <div className="mb-4">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/40 bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur-md shadow-sm transition-colors hover:bg-teal-500/25"
            >
              <Tag className="size-3 text-teal-300" />
              {event.category || "Community Initiative"}
            </Badge>
          </div>
          {/* Large Title */}
          <div className="relative w-full h-[400px]">
            <Image
              src={event.thumbnail || "/placeholder.jpg"}
              alt={event.title || "Event Image"}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
          {/* Meta Information: Venue & Date */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-white/80 sm:gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-teal-400 shrink-0" />
              <span className="truncate">
                {event.venue || "Town Hall Ground, Jashore"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-teal-400 shrink-0" />
              <span>{formattedDate.full}</span>
            </div>
          </div>

          {/* 2. VOLUNTEER JOINED ACTION BAR                                */}

          <div className="mt-8 rounded-2xl border border-teal-500/30 bg-[#0d2822]/90 p-4 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 sm:p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
            {/* Top teal subtle accent glow line */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent"
            />

            {/* Left: Volunteer Count */}
            <div className="flex items-center gap-3.5 mb-4 sm:mb-0">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/15 text-teal-300 shadow-inner">
                <Users className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {volunteerCount} Volunteers Joined
                </h3>
                <p className="text-xs text-slate-400 sm:text-sm">
                  {hasJoined
                    ? "You are registered as a volunteer for this event"
                    : "Sign up to join hands for this event"}
                </p>
              </div>
            </div>

            {/* Right: Actions (Share + Join Event Button) */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                aria-label="Share event"
                className="size-10 rounded-full border border-teal-500/40 bg-teal-500/10 text-teal-300 transition-all duration-200 hover:scale-105 hover:bg-teal-500/25 hover:text-white active:scale-95"
              >
                <Share2 className="size-4" />
              </Button>

              <Button
                onClick={() => setDialogOpen(true)}
                className={`group h-10 rounded-full px-6 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                  hasJoined
                    ? "bg-teal-600 hover:bg-teal-700 shadow-teal-500/20"
                    : "bg-[#e5483e] hover:bg-[#d43d33] shadow-[#e5483e]/30 hover:shadow-[#e5483e]/50"
                }`}
              >
                {hasJoined ? (
                  <>
                    <CheckCircle2 className="mr-2 size-4 text-white" />
                    Joined
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 size-4 fill-white transition-transform duration-200 group-hover:scale-110" />
                    Join Event
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN DETAILS SECTION                                  */}

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.9fr_1fr] lg:gap-12">
          {/* LEFT COLUMN: About this event & Volunteer Guidelines */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              About this Event
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-7">
              <p className="whitespace-pre-line">{event.description}</p>
            </div>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-white/10" />

            {/* Volunteer Guidelines */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                Volunteer Guidelines
              </h3>

              <ul className="mt-4 space-y-3.5">
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#e5483e] shadow-[0_0_8px_rgba(229,72,62,0.9)]" />
                  <span className="text-sm leading-6 text-slate-300">
                    Please arrive 15 minutes before the scheduled time at the
                    designated location.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#20a89a] shadow-[0_0_8px_rgba(32,168,154,0.9)]" />
                  <span className="text-sm leading-6 text-slate-300">
                    Wear comfortable clothing suitable for helping out on your
                    feet all day.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#e5483e] shadow-[0_0_8px_rgba(229,72,62,0.9)]" />
                  <span className="text-sm leading-6 text-slate-300">
                    Bring any pre-coordinated supplies or items if requested by
                    the organizer.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Event Organizer Card */}
          <div>
            <Card className="overflow-hidden rounded-2xl border border-[#204037] border-t-2 border-t-[#e5483e] bg-[#0c2621]/95 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-950/40">
              <CardContent className="p-0">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Event Organizer
                </span>

                <div className="mt-4 flex items-center gap-3.5">
                  <Avatar className="size-12 ring-2 ring-teal-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 via-[#187569] to-emerald-700 font-bold text-white text-sm">
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
                        className="group mt-0.5 flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-teal-300"
                      >
                        <Mail className="size-3.5 text-teal-400 shrink-0" />
                        <span className="truncate group-hover:underline">
                          {event.email}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Verified Platform Member Badge */}
                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-teal-400">
                  <ShieldCheck className="size-4 shrink-0 text-teal-400" />
                  <span>Verified Platform Member</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. MORE UPCOMING EVENTS SECTION                                */}
      {/* ============================================================== */}
      {moreEvents.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              More upcoming events
            </h2>

            <Link
              href="/upcoming"
              className="group flex items-center gap-1 text-xs font-bold text-teal-400 transition-colors hover:text-teal-300"
            >
              View all
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {moreEvents.slice(0, 2).map((other) => {
              const otherDate = formatEventDate(other.date);

              return (
                <Link
                  key={other._id}
                  href={`/upcoming/${other._id}`}
                  className="group relative flex items-center gap-4 rounded-2xl border border-[#204037] bg-[#0c2621]/80 p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/60 hover:bg-[#10332c] hover:shadow-xl hover:shadow-teal-950/40"
                >
                  {/* Date badge */}
                  <div className="flex size-[58px] shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#14352e] transition-colors group-hover:border-teal-400/40">
                    <span className="text-xl font-black leading-none text-white">
                      {otherDate.day}
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase text-[#e5483e]">
                      {otherDate.month}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-teal-300">
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

      {/* ============================================================== */}
      {/* 5. JOIN AS VOLUNTEER DIALOG MODAL                              */}
      {/* ============================================================== */}
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
                className="h-10 border-[#29443e] bg-[#071b18] text-sm text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
              />
            </div>

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
                className="h-10 border-[#29443e] bg-[#071b18] text-sm text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
              />
            </div>

            <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 text-xs text-teal-300">
              <div className="flex items-center gap-2 font-semibold">
                <CalendarDays className="size-4 shrink-0 text-teal-400" />
                <span>Event Day: {formattedDate.full}</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Venue: {event.venue || "Town Hall Ground, Jashore"}
              </p>
            </div>

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
