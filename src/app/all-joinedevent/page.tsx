import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Heart,
  Sparkles,
  CalendarCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const AllJoinedeventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log("user", user);

  const token = await getTokenFromServer();
  const res = await fetch(
    `http://localhost:8000/all-joinedevent/${user?.email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  );

  const alljoined = await res.json();
  console.log("alljoined", alljoined);

  return (
    <main className="min-h-screen bg-[#071A15] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-[#245044] bg-gradient-to-br from-[#12382D] via-[#0D2921] to-[#091B16] p-6 sm:p-9 lg:p-11">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#4DD8B9]" />
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#4DD8B9]">
                Your Community Journey
              </span>
            </div>

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  Joined <span className="text-[#4DD8B9]">Events.</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
                  Here are all the social development and community service
                  drives you have signed up for, sorted by event date.
                </p>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#4DD8B9]/20 bg-[#071A15]/50 px-5 py-4 backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4DD8B9]/10">
                  <CalendarCheck className="h-6 w-6 text-[#4DD8B9]" />
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">
                    {alljoined.length}
                  </p>
                  <p className="text-xs text-gray-400">Joined Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Your Events</h2>
            <p className="mt-1 text-sm text-gray-400">
              All your registered community activities
            </p>
          </div>

          <Badge className="border border-[#245044] bg-[#102B22] px-4 py-2 text-[#4DD8B9] hover:bg-[#102B22]">
            <Heart className="mr-2 h-3.5 w-3.5" />
            My Activities
          </Badge>
        </div>

        {/* Event Cards */}
        {alljoined.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[...alljoined]
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((event) => (
                <Card
                  key={event._id}
                  className="group overflow-hidden rounded-2xl border border-[#204639] bg-[#10271F] py-0 text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 hover:border-[#35C9A8]/60 hover:shadow-[0_20px_45px_rgba(45,212,191,0.12)]"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-[#15372B]">
                    {event.thumbnail ? (
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Heart className="h-16 w-16 text-[#4DD8B9]/30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A15]/90 via-[#071A15]/10 to-transparent" />

                    {/* Category */}
                    <div className="absolute left-4 top-4">
                      <Badge className="border border-white/20 bg-[#071A15]/70 px-3 py-1.5 text-xs text-white backdrop-blur-lg hover:bg-[#071A15]/70">
                        {event.category || "Community Event"}
                      </Badge>
                    </div>

                    {/* Joined Badge */}
                    <div className="absolute right-4 top-4">
                      <Badge className="border border-emerald-300/20 bg-emerald-400/15 px-3 py-1.5 text-emerald-300 backdrop-blur-lg hover:bg-emerald-400/15">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Joined
                      </Badge>
                    </div>

                    {/* Image Bottom Title */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-[#4DD8B9]">
                        COMMUNITY INITIATIVE
                      </p>
                      <h3 className="line-clamp-1 text-xl font-bold text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-5">
                    <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-gray-400">
                      {event.description ||
                        "Be part of something meaningful. Join hands to make a positive impact in the community."}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-3 rounded-xl border border-[#245044]/70 bg-[#0A2119] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#35C9A8]/10">
                          <CalendarDays className="h-4 w-4 text-[#4DD8B9]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            Event Date
                          </p>
                          <p className="text-sm font-medium text-gray-200">
                            {event.date
                              ? new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )
                              : "Date not available"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#35C9A8]/10">
                          <MapPin className="h-4 w-4 text-[#4DD8B9]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            Location
                          </p>
                          <p className="truncate text-sm font-medium text-gray-200">
                            {event.venue || "Location not available"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#35C9A8]/10">
                          <Users className="h-4 w-4 text-[#4DD8B9]" />
                        </div>

                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            Participation
                          </p>
                          <p className="text-sm font-medium text-gray-200">
                            Successfully Registered
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* View Event Link */}
                    <div className="mt-5">
                      <Link
                        href={`/upcoming/${event._id}`}
                        className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#159E8D] to-[#20B99F] font-semibold text-white shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:from-[#20B99F] hover:to-[#32D6B8]"
                      >
                        View Event
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#245044] bg-gradient-to-br from-[#102B22] to-[#0A1D17] px-5 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#35C9A8]/20 bg-[#35C9A8]/10">
              <CalendarCheck className="h-9 w-9 text-[#4DD8B9]" />
            </div>

            <h2 className="text-2xl font-bold">No Joined Events Yet!</h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-400">
              You haven&apos;t joined any community events yet. Discover
              exciting activities and start making a difference.
            </p>

            <Link
              href="/upcoming-event"
              className="mt-7 flex h-11 items-center justify-center rounded-xl bg-[#159E8D] px-7 text-white transition-colors hover:bg-[#20B99F]"
            >
              Explore Events
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllJoinedeventPage;
