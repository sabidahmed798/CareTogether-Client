"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

// shadcn UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Extracted Edit/Delete dialogs (keeps this page shorter)
import EditDialog, {
  type IManagedEvent,
  type EditForm,
} from "@/components/dialog/Edit";
import DeleteDialog from "@/components/dialog/Delete";

// (IManagedEvent is now imported from @/components/dialog/EventDialogs)

/**
 * Initial sample events matching the exact UI screenshot
 */
const INITIAL_EVENTS: IManagedEvent[] = [
  {
    _id: "6ae78ae4b8ad6f1c252e8913",
    title: "Free Health Check-up Camp",
    category: "Health Camp",
    status: "Approved",
    date: "15 November 2026",
    venue: "Town Hall Ground, Jashore",
    volunteersJoined: 18,
    thumbnail: "/images/jessore.png",
    description:
      "Join us for a free community health check-up camp open to every family in Jashore.",
  },
  {
    _id: "demo-clean-up-drive",
    title: "Neighbourhood Clean-up Drive",
    category: "Clean-up Drive",
    status: "Approved",
    date: "22 November 2026",
    venue: "Riverside Area, Jashore",
    volunteersJoined: 9,
    thumbnail: "/images/jessore.png",
    description:
      "Help clean up our local riverside park and keep Jashore beautiful.",
  },
  {
    _id: "demo-evening-classes",
    title: "Free Evening Classes for Children",
    category: "Education",
    status: "Approved",
    date: "13 December 2026",
    venue: "Primary School Hall, Jashore",
    volunteersJoined: 5,
    thumbnail: "/images/jessore.png",
    description:
      "Evening tuition classes for underprivileged primary school students.",
  },
  {
    _id: "demo-winter-clothes",
    title: "Winter Clothes Distribution",
    category: "Food & Relief",
    status: "Pending review",
    date: "20 December 2026",
    venue: "Central Market Area, Jashore",
    volunteersJoined: 0,
    thumbnail: "/images/jessore.png",
    description:
      "Collecting and distributing warm blankets and winter jackets to families in need.",
  },
];

export default function ManageEventsPage() {
  // State for all events
  const [events, setEvents] = React.useState<IManagedEvent[]>(INITIAL_EVENTS);

  // Modals state
  const [editEvent, setEditEvent] = React.useState<IManagedEvent | null>(null);
  const [deleteEvent, setDeleteEvent] = React.useState<IManagedEvent | null>(
    null,
  );

  // Form state for editing
  const [editForm, setEditForm] = React.useState<EditForm>({
    title: "",
    category: "",
    date: "",
    venue: "",
    description: "",
  });

  // Fetch events from API on mount, merging with demo events if necessary
  React.useEffect(() => {
    async function loadApiEvents() {
      try {
        const apiUrl =
          process.env.Next_PUBLIC_API_URL || "http://localhost:8000";
        const cleanUrl = apiUrl.replace(/\/+$/, "");
        const res = await fetch(`${cleanUrl}/upcoming-event`);

        if (res.ok) {
          const data = await res.json();
          const apiList: Array<{
            _id: string;
            title: string;
            date?: string;
            venue?: string;
            thumbnail?: string;
            description?: string;
            category?: string;
          }> = Array.isArray(data) ? data : data.data || [];

          if (apiList.length > 0) {
            // Map API response to our IManagedEvent structure
            const mapped: IManagedEvent[] = apiList.map((item, index) => ({
              _id: item._id,
              title: item.title || "Community Event",
              category: item.category || "Health Camp",
              status: index % 4 === 3 ? "Pending review" : "Approved",
              date: item.date || "15 November 2026",
              venue: item.venue || "Jashore, Bangladesh",
              volunteersJoined: Math.floor(Math.random() * 20) + 1,
              thumbnail: item.thumbnail || "/images/jessore.png",
              description: item.description || "",
            }));

            // Use API list
            setEvents(mapped);
          }
        }
      } catch (err) {
        console.warn("Could not load from API, using demo events:", err);
      }
    }

    loadApiEvents();
  }, []);

  // Compute live statistics for the subtitle
  const approvedCount = React.useMemo(
    () => events.filter((e) => e.status === "Approved").length,
    [events],
  );

  const pendingCount = React.useMemo(
    () => events.filter((e) => e.status === "Pending review").length,
    [events],
  );

  // Open the Edit modal and fill the form
  const handleOpenEdit = (event: IManagedEvent) => {
    setEditEvent(event);
    setEditForm({
      title: event.title,
      category: event.category,
      date: event.date,
      venue: event.venue,
      description: event.description || "",
    });
  };

  // Save the updated event
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent) return;

    setEvents((prev) =>
      prev.map((item) =>
        item._id === editEvent._id
          ? {
              ...item,
              title: editForm.title,
              category: editForm.category,
              date: editForm.date,
              venue: editForm.venue,
              description: editForm.description,
            }
          : item,
      ),
    );

    setEditEvent(null);
    toast.success("Event Updated Successfully!", {
      description: `"${editForm.title}" has been updated.`,
    });
  };

  // Delete the event
  const handleConfirmDelete = () => {
    if (!deleteEvent) return;

    setEvents((prev) => prev.filter((item) => item._id !== deleteEvent._id));
    toast.success("Event Deleted", {
      description: `"${deleteEvent.title}" has been removed from your dashboard.`,
    });
    setDeleteEvent(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-[#081a16] dark:text-white">
      <div className="mx-auto max-w-7xl">
        {/* ========================================================== */}
        {/* HEADER SECTION                                             */}
        {/* ========================================================== */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            {/* Eyebrow Label */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[#e5483e]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5483e]">
                YOUR DASHBOARD
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Manage My Events
            </h1>

            {/* Counter Summary Subtitle */}
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {events.length} events · {approvedCount} approved · {pendingCount}{" "}
              pending review
            </p>
          </div>

          {/* Create New Event Button */}
          <Button
            render={<Link href="/create-event" />}
            className="group h-11 rounded-full bg-[#e5483e] px-6 text-sm font-bold text-white shadow-lg shadow-[#e5483e]/25 transition-all duration-300 hover:scale-105 hover:bg-[#d43d33] hover:shadow-[#e5483e]/40 active:scale-95"
          >
            <Plus className="mr-1.5 size-4 transition-transform duration-200 group-hover:rotate-90" />
            Create New Event
          </Button>
        </div>

        {/* ========================================================== */}
        {/* EVENTS GRID                                                */}
        {/* ========================================================== */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-[#204037] dark:bg-[#0c2621]/90 dark:hover:border-teal-500/50 dark:hover:shadow-teal-950/40"
              >
                {/* Event Thumbnail & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={event.thumbnail || "/images/jessore.png"}
                    alt={event.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Badge (Top-Left) */}
                  <Badge
                    variant="outline"
                    className="absolute top-3 left-3 rounded-full border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md"
                  >
                    {event.category}
                  </Badge>

                  {/* Status Badge (Top-Right) */}
                  {event.status === "Approved" ? (
                    <Badge className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-white px-3 py-1 text-xs font-bold text-slate-900 shadow-md">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#e5483e]/20 bg-white px-3 py-1 text-xs font-bold text-slate-900 shadow-md">
                      <span className="size-2 rounded-full bg-[#e5483e]" />
                      Pending review
                    </Badge>
                  )}
                </div>

                {/* Event Content */}
                <CardContent className="flex flex-1 flex-col p-5">
                  <h2 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-600 sm:text-lg dark:text-white dark:group-hover:text-teal-300">
                    {event.title}
                  </h2>

                  {/* Meta Information */}
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CalendarDays className="size-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <MapPin className="size-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span className="truncate">{event.venue}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <Users className="size-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span>{event.volunteersJoined} volunteers joined</span>
                    </div>
                  </div>

                  {/* Action Buttons Bar */}
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 dark:border-white/10">
                    {/* View Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/upcoming/${event._id}`} />}
                      className="h-8 rounded-full border-teal-500/40 text-xs font-semibold text-teal-700 transition-all hover:bg-teal-500/10 dark:text-teal-300 dark:hover:bg-teal-500/20"
                    >
                      <Eye className="size-3.5" />
                      View
                    </Button>

                    {/* Edit Button */}
                    <Button
                      size="sm"
                      onClick={() => handleOpenEdit(event)}
                      className="h-8 rounded-full bg-[#1da599] text-xs font-semibold text-white shadow-sm shadow-teal-500/20 transition-all hover:bg-[#188c81]"
                    >
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteEvent(event)}
                      className="h-8 rounded-full border-red-500/40 text-xs font-semibold text-red-600 transition-all hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-[#204037] dark:bg-[#0c2621]/50">
            <h3 className="text-lg font-bold">No Events Found</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              You haven&apos;t created any events yet.
            </p>
            <Button
              render={<Link href="/create-event" />}
              className="mt-5 rounded-full bg-[#e5483e] font-bold text-white hover:bg-[#d43d33]"
            >
              <Plus className="mr-1.5 size-4" /> Create Your First Event
            </Button>
          </div>
        )}

        {/* ========================================================== */}
        {/* EDIT & DELETE DIALOGS (extracted to components/dialog)     */}
        {/* ========================================================== */}
        <EditDialog
          editEvent={editEvent}
          setEditEvent={setEditEvent}
          editForm={editForm}
          setEditForm={setEditForm}
          onSaveEdit={handleSaveEdit}
        />
        <DeleteDialog
          deleteEvent={deleteEvent}
          setDeleteEvent={setDeleteEvent}
          onConfirmDelete={handleConfirmDelete}
        />
      </div>
    </main>
  );
}
