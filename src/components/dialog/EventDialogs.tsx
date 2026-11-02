"use client";

import * as React from "react";

// shadcn UI components used by the dialogs
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
 * Exported so the page can reuse the same type.
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
 * Props for the EventDialogs component.
 * All real logic lives in the page; we only render the modals here.
 */
interface EventDialogsProps {
  editEvent: IManagedEvent | null;
  setEditEvent: React.Dispatch<React.SetStateAction<IManagedEvent | null>>;
  deleteEvent: IManagedEvent | null;
  setDeleteEvent: React.Dispatch<React.SetStateAction<IManagedEvent | null>>;
  editForm: EditForm;
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>;
  onSaveEdit: (e: React.FormEvent) => void;
  onConfirmDelete: () => void;
}

/**
 * EventDialogs
 *
 * Holds the two dialogs (Edit Event + Delete confirmation) used on
 * the "Manage My Events" page, keeping event/page.tsx shorter.
 */
export default function EventDialogs({
  editEvent,
  setEditEvent,
  deleteEvent,
  setDeleteEvent,
  editForm,
  setEditForm,
  onSaveEdit,
  onConfirmDelete,
}: EventDialogsProps) {
  return (
    <>
      {/* ========================================================== */}
      {/* EDIT EVENT DIALOG MODAL                                    */}
      {/* ========================================================== */}
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

          <form onSubmit={onSaveEdit} className="space-y-4 pt-2">
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
                <Label
                  htmlFor="edit-category"
                  className="text-xs font-semibold"
                >
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

      {/* ========================================================== */}
      {/* DELETE CONFIRMATION MODAL                                  */}
      {/* ========================================================== */}
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
              onClick={onConfirmDelete}
              className="rounded-full bg-red-600 font-bold text-white hover:bg-red-700"
            >
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
