"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  MapPin,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const categories = [
  "Health Camp",
  "Clean-up Drive",
  "Education",
  "Food & Relief",
  "Blood Donation",
  "Other",
];

const steps = [
  {
    title: "Share the details",
    description: "Tell us what, when and where.",
  },
  {
    title: "We review it",
    description: "Our team checks and approves quickly.",
  },
  {
    title: "Volunteers join in",
    description: "Your event goes live for the community.",
  },
];

export default function CreateEventPage() {
  const [selectedCategory, setSelectedCategory] = useState("Health Camp");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    thumbnail: "",
    description: "",
    email: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "thumbnail") {
      setThumbnailPreview(value);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:8000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          category: selectedCategory,
        }),
      });

      const data = await res.json().catch(() => ({}));

      console.log("Event response:", data);

      // Only check HTTP response status
      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create event. Please try again.",
        );
      }

      // Success Toast
      toast.success("Event Created Successfully!", {
        description: data.message || "",
      });

      setSuccess(true);

      // Reset Form
      setFormData({
        title: "",
        date: "",
        venue: "",
        thumbnail: "",
        description: "",
        email: "",
      });

      setSelectedCategory("Health Camp");
      setThumbnailPreview("");
    } catch (error) {
      console.error("Create event error:", error);

      // Error Toast
      toast.error("Event Creation Failed!", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#071b18] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* Left Section */}
        <section className="flex flex-col gap-7 pt-1">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-4 bg-[#e5483e]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aaca7]">
                Start something good
              </span>
            </div>

            <h1 className="max-w-md text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl">
              Create a Community Event
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#a4b5b0]">
              Have an idea to help your neighbours? Organize a health camp,
              clean-up drive or learning session and invite volunteers from
              across Jashore.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-3">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    index === 1 ? "bg-[#149d91]" : "bg-[#e5483e]"
                  }`}
                >
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-xs text-[#91a49e]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Event Image */}
          <div className="relative mt-1 h-48 w-full max-w-md overflow-hidden rounded-xl border border-[#24423c] bg-[#102c26]">
            <Image
              src="/images/jessore.png"
              alt="Community event at a local campus in Jessore"
              width={1000}
              height={800}
              priority
              sizes="(max-width: 768px) 100vw, 450px"
              className="h-[400px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071b18]/50 to-transparent" />

            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-[#071b18]/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <Sparkles className="size-3.5 text-[#f06a5e]" />
              Make a difference together
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#81968f]">
            <CheckCircle2 className="size-4 text-[#20a89a]" />
            Every small action creates a better community.
          </div>
        </section>

        {/* Right Section */}
        <Card className="overflow-hidden rounded-2xl border border-[#23413b] border-t-2 border-t-[#e5483e] bg-[#0d2722] text-white shadow-2xl shadow-black/20">
          <CardContent className="p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Event details</h2>
                <p className="mt-1 text-xs text-[#8fa49c]">
                  Share your idea with the community.
                </p>
              </div>

              <div className="flex size-9 items-center justify-center rounded-full bg-[#183b33] text-[#26b5a5]">
                <CalendarDays className="size-4" />
              </div>
            </div>

            {success && (
              <div
                role="status"
                className="mb-5 flex items-center gap-2 rounded-lg border border-[#1d6b5a] bg-[#123b30] p-3 text-sm text-[#8de5c8]"
              >
                <CheckCircle2 className="size-4 shrink-0" />
                Your event has been created successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-semibold">
                  Event Title
                </Label>

                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Free Health Check-up Camp"
                  required
                  className="h-10 border-[#29443e] bg-[#071b18] text-sm placeholder:text-[#647c73] focus-visible:ring-[#20a89a]"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Category</Label>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        aria-pressed={isSelected}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "border-[#159d90] bg-[#159d90] text-white"
                            : "border-[#29443e] bg-[#071b18] text-[#c0d0ca] hover:border-[#159d90] hover:text-white"
                        }`}
                      >
                        {isSelected && <Check className="size-3" />}
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date and Venue */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-semibold">
                    Event Date
                  </Label>

                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="h-10 border-[#29443e] bg-[#071b18] text-sm text-white [color-scheme:dark] focus-visible:ring-[#20a89a]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-xs font-semibold">
                    Location / Venue
                  </Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 size-4 text-[#6f8980]" />

                    <Input
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Venue, area, Jashore"
                      required
                      className="h-10 border-[#29443e] bg-[#071b18] pl-9 text-sm placeholder:text-[#647c73] focus-visible:ring-[#20a89a]"
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-xs font-semibold">
                  Thumbnail Image URL
                </Label>

                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/event-photo.jpg"
                  className="h-10 border-[#29443e] bg-[#071b18] text-sm placeholder:text-[#647c73] focus-visible:ring-[#20a89a]"
                />

                {thumbnailPreview && (
                  <div className="relative mt-2 h-32 w-full overflow-hidden rounded-lg border border-[#29443e] bg-[#071b18]">
                    <img
                      src={thumbnailPreview}
                      alt="Event thumbnail preview"
                      className="h-full w-full object-cover"
                      onError={() => setThumbnailPreview("")}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-semibold">
                  Event Description
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What will happen, and who can join?"
                  required
                  minLength={10}
                  className="min-h-32 resize-y border-[#29443e] bg-[#071b18] text-sm placeholder:text-[#647c73] focus-visible:ring-[#20a89a]"
                />
              </div>

              {/* Organizer Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Organizer Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="h-10 border-[#29443e] bg-[#071b18] text-sm placeholder:text-[#647c73] focus-visible:ring-[#20a89a]"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 h-11 w-full rounded-full bg-[#e5483e] text-sm font-bold text-white hover:bg-[#cc3d34] disabled:opacity-60"
              >
                {isLoading ? (
                  "Creating event..."
                ) : (
                  <>
                    Create Event
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-[#81968f]">
                Your event will be reviewed before going live.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
