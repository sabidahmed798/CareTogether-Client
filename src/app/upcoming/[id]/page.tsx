// import type { Metadata } from "next";
// import {
//   UpcomingDetailsView,
//   type IUpcomingEvent,
// } from "@/components/upcoming/upcoming-details-view";

// type UpcomingDetailPageProps = {
//   params: Promise<{ id: string }>;
// };

// // Fallback demo events to match screenshot if API returns empty list
// const FALLBACK_MORE_EVENTS: IUpcomingEvent[] = [
//   {
//     _id: "demo-1",
//     title: "Neighbourhood Clean-up Drive",
//     category: "Clean-up Drive",
//     venue: "Riverside Area, Jashore",
//     date: "2026-11-22",
//   },
//   {
//     _id: "demo-2",
//     title: "Community Blood Donation Day",
//     category: "Blood Donation",
//     venue: "Community Centre, Jashore",
//     date: "2026-12-06",
//   },
// ];

// async function fetchEventById(id: string): Promise<IUpcomingEvent | null> {
//   const apiUrl =
//     process.env.Next_PUBLIC_API_URL ||
//     process.env.NEXT_PUBLIC_API_URL ||
//     "http://localhost:8000";
//   const cleanApiUrl = apiUrl.replace(/\/+$/, "");

//   try {
//     const res = await fetch(`${cleanApiUrl}/upcoming-event/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.warn(`Event ${id} fetch returned status: ${res.status}`);
//       return null;
//     }

//     const data = await res.json();
//     return data?.data || data?.event || data;
//   } catch (error) {
//     console.error(`Error fetching event ${id}:`, error);
//     return null;
//   }
// }

// async function fetchMoreEvents(currentId: string): Promise<IUpcomingEvent[]> {
//   const apiUrl =
//     process.env.Next_PUBLIC_API_URL ||
//     process.env.NEXT_PUBLIC_API_URL ||
//     "http://localhost:8000";
//   const cleanApiUrl = apiUrl.replace(/\/+$/, "");

//   try {
//     const res = await fetch(`${cleanApiUrl}/upcoming-event`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return FALLBACK_MORE_EVENTS;
//     }

//     const data = await res.json();
//     const rawList: IUpcomingEvent[] = Array.isArray(data)
//       ? data
//       : data.data || data.events || [];

//     const filtered = rawList.filter((e) => e._id !== currentId);

//     return filtered.length > 0 ? filtered : FALLBACK_MORE_EVENTS;
//   } catch {
//     return FALLBACK_MORE_EVENTS;
//   }
// }

// export async function generateMetadata({
//   params,
// }: UpcomingDetailPageProps): Promise<Metadata> {
//   const { id } = await params;
//   const event = await fetchEventById(id);

//   if (!event) {
//     return {
//       title: "Event Details | CareTogether",
//       description:
//         "Community care and social welfare event details in Jashore.",
//     };
//   }

//   return {
//     title: `${event.title} | CareTogether`,
//     description:
//       event.description?.slice(0, 160) ||
//       `Join ${event.title} in Jashore organized by CareTogether community.`,
//   };
// }

// export default async function UpcomingDetailsPage({
//   params,
// }: UpcomingDetailPageProps) {
//   const { id } = await params;

//   const [eventData, moreEvents] = await Promise.all([
//     fetchEventById(id),
//     fetchMoreEvents(id),
//   ]);

//   // If event is not found from API, use a well-formatted fallback with current ID
//   const event: IUpcomingEvent = eventData || {
//     _id: id,
//     title: "Free Health Check-up Camp",
//     category: "Health Camp",
//     date: "2026-11-15",
//     venue: "Town Hall Ground, Jashore",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHPOoDKjON3kTZDwRBAXqLZFxns2ZlgHBkMiaszwiIJg&s=10",
//     description:
//       "Join us for a free community health check-up camp open to every family in Jashore. Volunteer doctors and nurses will check blood pressure and blood sugar, answer your questions and point you to the right care. There is no registration fee, so just walk in.\n\nWe are also looking for volunteers to help with registration, guide visitors and keep queues moving smoothly on the day.",
//     email: "rahim@example.com",
//   };

//   return <UpcomingDetailsView event={event} moreEvents={moreEvents} />;
// }

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  UpcomingDetailsView,
  type IUpcomingEvent,
} from "@/components/upcoming/upcoming-details-view";

type UpcomingDetailPageProps = {
  params: Promise<{ id: string }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchEventById(id: string): Promise<IUpcomingEvent | null> {
  const cleanApiUrl = API_URL.replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${cleanApiUrl}/upcoming-event/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      console.error("Event fetch failed:", res.status);
      return null;
    }

    const result = await res.json();

    const event = result?.data || result?.event || result;

    if (!event || !event._id || !event.title) {
      return null;
    }

    return event as IUpcomingEvent;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

async function fetchMoreEvents(currentId: string): Promise<IUpcomingEvent[]> {
  const cleanApiUrl = API_URL.replace(/\/+$/, "");

  try {
    const res = await fetch(`${cleanApiUrl}/upcoming-event`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();

    const events = Array.isArray(result)
      ? result
      : result?.data || result?.events || [];

    if (!Array.isArray(events)) {
      return [];
    }

    return events.filter((event: IUpcomingEvent) => event._id !== currentId);
  } catch (error) {
    console.error("Error fetching more events:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: UpcomingDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const event = await fetchEventById(id);

  if (!event) {
    return {
      title: "Event Not Found | CareTogether",
      description: "The requested community event could not be found.",
    };
  }

  return {
    title: `${event.title} | CareTogether`,
    description:
      event.description?.slice(0, 160) ||
      `Join ${event.title} with CareTogether.`,
  };
}

export default async function UpcomingDetailsPage({
  params,
}: UpcomingDetailPageProps) {
  const { id } = await params;

  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  const moreEvents = await fetchMoreEvents(id);

  return <UpcomingDetailsView event={event} moreEvents={moreEvents} />;
}
