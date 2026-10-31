import type { Metadata } from "next";
import { PlatformFeatures } from "@/components/platform-features";

export const metadata: Metadata = {
  title: "Platform Features",
  description:
    "Everything CareTogether brings to Jashore — local initiatives, volunteer matching, event management, support for families in need, transparent impact and a connected community network.",
};

export default function FeaturesPage() {
  return <PlatformFeatures />;
}
