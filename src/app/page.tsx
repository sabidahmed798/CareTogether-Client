import { HeroBanner } from "@/components/home/hero-banner";
import JoinOur from "@/components/home/join-our";
import { PlatformFeatures } from "@/components/home/platform-features";
import JoinedEventPage from "./galary/page";

import ResendPage from "@/components/home/recent";

export default function Home() {
  return (
    <>
      <HeroBanner />

      <PlatformFeatures />
      <ResendPage />
      <JoinedEventPage />
      <JoinOur />
    </>
  );
}
