"use client";

import * as React from "react";

// shadcn UI components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import type { IManagedEvent } from "@/components/dialog/Edit";
import { getTokenFromClent } from "@/lib/getTokenFromClent";

/**
 * Props for the DeleteDialog component.
 * All real logic lives in the page; this component only renders the modal.
 */
interface DeleteDialogProps {
  deleteEvent: IManagedEvent | null;
  setDeleteEvent: React.Dispatch<React.SetStateAction<IManagedEvent | null>>;
  onConfirmDelete: () => void;
}

/**
 * DeleteDialog
 *
 * A small, beginner-friendly component that renders the
 * "Delete confirmation" modal.
 */
export default function DeleteDialog({
  deleteEvent,
  setDeleteEvent,
  onConfirmDelete,
}: DeleteDialogProps) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!deleteEvent?._id) return;

    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    ).replace(/\/+$/, "");

    try {
      const token = await getTokenFromClent();
      const res = await fetch(`${apiUrl}/upcoming-event/${deleteEvent._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Event Deleted", {
        description: `"${deleteEvent.title}" has been removed.`,
      });

      setDeleteEvent(null);
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete Failed", {
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return (
    <Dialog
      open={!!deleteEvent}
      onOpenChange={(open) => !open && setDeleteEvent(null)}
    >
      <DialogContent className="max-w-md border border-[#204037] bg-white text-slate-900 dark:bg-[#0c2621] dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-red-600 dark:text-red-400">
            Delete Event
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Are you sure you want to delete &quot;{deleteEvent?.title}
            &quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setDeleteEvent(null)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="rounded-full bg-red-600 font-bold text-white hover:bg-red-700"
          >
            Delete Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
