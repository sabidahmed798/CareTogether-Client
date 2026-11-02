import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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
    strokeWidth="1.6"
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
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Events", href: "/events" },
];

const involvedLinks = [
  { label: "Volunteer", href: "/volunteer" },
  { label: "Donate", href: "/donate" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-slate-100/90 text-slate-800 transition-colors duration-300 dark:bg-[#0f2623] dark:text-white">
      {/* Top gradient line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#e0553f] via-[#7a6a5c] to-[#1f9a8f]" />

      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image
              src="/images/care_together_logo.png"
              alt="CareTogether"
              width={150}
              height={150}
              priority
              className=""
              sizes="(max-width: 640px) 118px, 135px"
            />
            <p className="mt-6 max-w-[270px] text-[15px] leading-7 text-slate-600 dark:text-white/70">
              A community-driven platform bringing the people of Jashore
              together to support one another and build a better future.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-[42px] w-[42px] items-center justify-center rounded-full border border-slate-300/80 bg-white text-teal-600 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1f9a8f] hover:text-white hover:shadow-[0_0_18px_rgba(45,212,191,0.5)] dark:border-transparent dark:bg-[#163732] dark:text-[#2dd4bf] dark:hover:bg-[#1f9a8f] dark:hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Explore</h4>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-slate-600 transition-all duration-200 hover:pl-1 hover:text-teal-600 dark:text-white/70 dark:hover:text-[#2dd4bf]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Get Involved</h4>
            <ul className="mt-5 space-y-3">
              {involvedLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-slate-600 transition-all duration-200 hover:pl-1 hover:text-teal-600 dark:text-white/70 dark:hover:text-[#2dd4bf]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Contact</h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-[15px] text-slate-600 dark:text-white/70">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-[#2dd4bf]" />
                <a
                  href="mailto:hello@caretogether.org"
                  className="transition-colors hover:text-teal-600 dark:hover:text-[#2dd4bf]"
                >
                  sabidahmed798.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-600 dark:text-white/70">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-[#2dd4bf]" />
                <span>Jashore, Khulna Division, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6 mt-12 bg-slate-200 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row dark:text-white/60">
          <p>© 2026 Care Together · Jashore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-teal-600 dark:hover:text-[#2dd4bf]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-teal-600 dark:hover:text-[#2dd4bf]"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
