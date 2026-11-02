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

// Reuse the IManagedEvent type defined in Edit.tsx
import type { IManagedEvent } from "@/components/dialog/Edit";

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
            onClick={onConfirmDelete}
            className="rounded-full bg-red-600 font-bold text-white hover:bg-red-700"
          >
            Delete Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

