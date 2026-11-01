import { HeroBanner } from "@/components/home/hero-banner";
import JoinOur from "@/components/home/join-our";
import { PlatformFeatures } from "@/components/home/platform-features";

export default function Home() {
  return (
    <>
      <HeroBanner />

      <PlatformFeatures />
      <JoinOur />
    </>
  );
}
