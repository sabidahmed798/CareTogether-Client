import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  UpcomingDetailsView,
  type IUpcomingEvent,
} from "@/components/upcoming/upcoming-details-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type UpcomingDetailPageProps = {
  params: Promise<{ id: string }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchEventById(id: string): Promise<IUpcomingEvent | null> {
  const cleanApiUrl = API_URL.replace(/\/+$/, "");

  try {
    // const jwtToken = await auth.api.getToken({
    //   headers: await headers(),
    // });

    // const token = jwtToken?.token;
    // console.log(token);

    // const token = await getTokenFromServer();

    const res = await fetch(
      `${cleanApiUrl}/upcoming-event/${encodeURIComponent(id)}`,
      {
        headers: {
          // authorization: `Bearer ${token}`,
        },
      },
      // {
      //   cache: "no-store",
      // },
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
