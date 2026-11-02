import { Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const JoinOur = () => {
  return (
    <section className="w-full bg-slate-100/70 px-4 py-10 transition-colors duration-300 md:px-10 md:py-16 dark:bg-[#0b1a17]">
      <style>{`
        @keyframes rgb-glow {
          0%   { box-shadow: 0 0 20px 2px rgba(255, 0, 80, 0.55); }
          25%  { box-shadow: 0 0 20px 2px rgba(255, 190, 0, 0.55); }
          50%  { box-shadow: 0 0 20px 2px rgba(0, 255, 140, 0.55); }
          75%  { box-shadow: 0 0 20px 2px rgba(0, 140, 255, 0.55); }
          100% { box-shadow: 0 0 20px 2px rgba(255, 0, 80, 0.55); }
        }
        @keyframes rgb-border {
          0%   { border-color: rgba(255, 0, 80, 0.85); }
          25%  { border-color: rgba(255, 190, 0, 0.85); }
          50%  { border-color: rgba(0, 255, 140, 0.85); }
          75%  { border-color: rgba(0, 140, 255, 0.85); }
          100% { border-color: rgba(255, 0, 80, 0.85); }
        }
        .rgb-hover {
          transition: transform .3s ease, background-color .3s ease;
        }
        .rgb-hover:hover {
          animation: rgb-glow 3s linear infinite, rgb-border 3s linear infinite;
          transform: translateY(-3px);
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-teal-900/10 bg-gradient-to-br from-[#0a3a33] via-[#07302b] to-[#06302a] p-8 shadow-xl md:p-16 dark:border-white/10 dark:shadow-none">
        {/* Background glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#6b4a3f]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[#14584f]/70 blur-3xl" />

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#e0553f]" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#5eead4]">
                Join our community
              </span>
            </div>

            <h2 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
              Stay Connected
            </h2>

            <p className="mt-5 max-w-md text-base leading-8 text-white/80">
              Get updates on new initiatives, upcoming events and volunteer
              opportunities in Jashore, straight to your inbox.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="rgb-hover h-[52px] flex-1 rounded-full border-2 border-white/30 bg-white/10 px-6 text-white placeholder:text-white/50 focus-visible:border-white/60 focus-visible:ring-0"
              />
              <Button className="rgb-hover h-[52px] rounded-full bg-[#d9443a] px-8 text-base font-semibold text-white hover:bg-[#e5574c]">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5 lg:pl-6">
            <Card className="rgb-hover flex flex-row items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/70">Email us</p>
                <p className="text-sm font-semibold leading-5 text-white">
                  sabidahmed798@gmail.com
                </p>
              </div>
            </Card>

            <Card className="rgb-hover flex flex-row items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/70">Based in</p>
                <p className="text-sm font-semibold leading-5 text-white">
                  Jashore, Khulna Division, Bangladesh
                </p>
              </div>
            </Card>

            <div className="flex items-center gap-3 pt-1">
              {[FacebookIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rgb-hover flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinOur;
