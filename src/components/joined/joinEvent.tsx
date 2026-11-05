"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getTokenFromClent } from "@/lib/getTokenFromClent";

interface JoinEventsPageProps {
  event: {
    _id: string;
    title: string;
    date?: string;
    venue?: string;
    thumbnail?: string;
    description?: string;
    email?: string;
    category?: string;
  };
}

const JoinEventsPage = ({ event }: JoinEventsPageProps) => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  console.log("event", event);

  const handelJoined = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(user);

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    const data = {
      userName: user?.name,
      userEmail: user?.email,

      ...event,

      bookingDate: new Date(),
    };

    console.log(data);

    try {
      const token = await getTokenFromClent();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}joinevent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const eventres = await res.json();

      console.log(eventres);

      if (res.ok) {
        toast.success("Successfully joined the event!");
        setHasJoined(true);
        setDialogOpen(false);
      } else {
        toast.error(eventres.message || "Failed to join event!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handelJoined}>
        <Button
          type="submit"
          onClick={() => setDialogOpen(true)}
          disabled={hasJoined}
          className={`h-10 rounded-full px-6 text-sm font-bold text-white ${
            hasJoined
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-[#e5483e] hover:bg-[#d43d33]"
          }`}
        >
          {hasJoined ? (
            <>
              <CheckCircle2 className="mr-2 size-4" />
              Joined
            </>
          ) : (
            <>
              <Heart className="mr-2 size-4 fill-white" />
              Join Event
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default JoinEventsPage;
