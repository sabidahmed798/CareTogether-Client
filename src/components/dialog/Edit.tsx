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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * The shape of an event managed on the "Manage My Events" page.
 * Exported so the page (and Delete.tsx) can reuse the same type.
 */
export interface IManagedEvent {
  _id: string;
  title: string;
  category: string;
  status: "Approved" | "Pending review";
  date: string;
  venue: string;
  volunteersJoined: number;
  thumbnail?: string;
  description?: string;
}

/**
 * The shape of the form used while editing an event.
 * Exported so the page can reuse the same type.
 */
export interface EditForm {
  title: string;
  category: string;
  date: string;
  venue: string;
  description: string;
}

/**
 * Props for the EditDialog component.
 * All real logic lives in the page; this component only renders the modal.
 */
interface EditDialogProps {
  editEvent: IManagedEvent | null;
  setEditEvent: React.Dispatch<React.SetStateAction<IManagedEvent | null>>;
  editForm: EditForm;
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>;
  onSaveEdit: (e: React.FormEvent) => void;
}

/**
 * EditDialog
 *
 * A small, beginner-friendly component that renders the "Edit Event" modal.
 * Keeping it here keeps event/page.tsx shorter and easier to read.
 */
export default function EditDialog({
  editEvent,
  setEditEvent,
  editForm,
  setEditForm,
  onSaveEdit,
}: EditDialogProps) {
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editEvent?._id) return;

    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    ).replace(/\/+$/, "");

    try {
      const res = await fetch(
        `${apiUrl}/upcoming-event/${editEvent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      // Persist succeeded: update local state + close modal + show toast
      onSaveEdit(e);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Dialog
      open={!!editEvent}
      onOpenChange={(open) => !open && setEditEvent(null)}
    >
      <DialogContent className="max-w-md border border-[#204037] bg-white text-slate-900 sm:max-w-lg dark:bg-[#0c2621] dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Edit Event Details
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Update the information for this community initiative.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-title" className="text-xs font-semibold">
              Event Title
            </Label>
            <Input
              id="edit-title"
              required
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className="h-10 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-category" className="text-xs font-semibold">
                Category
              </Label>
              <Input
                id="edit-category"
                required
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="h-10 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-date" className="text-xs font-semibold">
                Date
              </Label>
              <Input
                id="edit-date"
                required
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
                className="h-10 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-venue" className="text-xs font-semibold">
              Location / Venue
            </Label>
            <Input
              id="edit-venue"
              required
              value={editForm.venue}
              onChange={(e) =>
                setEditForm({ ...editForm, venue: e.target.value })
              }
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-desc" className="text-xs font-semibold">
              Description
            </Label>
            <Textarea
              id="edit-desc"
              rows={3}
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="text-sm"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditEvent(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-[#1da599] font-bold text-white hover:bg-[#188c81]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
