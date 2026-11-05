import type { Metadata } from "next";
import UpcomingEvents from "@/components/home/upcoming-events";

export const metadata: Metadata = {
  title: "Upcoming Events | CareTogether",
  description: "Explore upcoming community events in Jashore.",
};

export interface IUpcomingEvent {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  thumbnail?: string;
  venue?: string;
  date?: string;
  email?: string;
}

async function fetchUpcomingEvents(): Promise<IUpcomingEvent[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const cleanApiUrl = apiUrl.replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${cleanApiUrl}/upcoming-event`,
      // {
      //   headers: {
      //     authorization: "user logged in",
      //   },
      // },

      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch upcoming events:", res.status);
      return [];
    }

    const result = await res.json();

    const events = Array.isArray(result)
      ? result
      : result?.data || result?.events || [];

    return Array.isArray(events) ? events : [];
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

export default async function UpcomingPage() {
  const events = await fetchUpcomingEvents();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
            CareTogether Community
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Discover upcoming community events and join us to make a positive
            difference in society.
          </p>
        </div>

        <UpcomingEvents events={events} />
      </section>
    </main>
  );
}
