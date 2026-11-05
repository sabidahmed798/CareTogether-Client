"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarIcon,
  ChevronDownIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Plus,
  SettingsIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeToggle } from "@/components/home/theme-toggle";
// import { AvatarImage } from "@base-ui/react";
// import { AvatarImage } from "@base-ui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  // { href: "/about", label: "About" },
  // { href: "/features", label: "Features" },
  // { href: "/upcoming-events", label: "▦ Upcoming Events" },
  { href: "/upcoming", label: "▦ Upcoming Events" },
  // { href: "/events", label: "All Events" },
  { href: "/create-event", label: "Create Event" },
  // { href: "/all-joinedevent", label: "Joined Events" },
];

// Brand Logo
function Logo() {
  return (
    <span className="flex h-7 w-auto items-center transition-transform duration-300 ease-out group-hover:scale-105 sm:h-8">
      <Image
        src="/images/care_together_logo.png"
        alt="CareTogether"
        width={1998}
        height={577}
        priority
        className="h-full w-auto"
        sizes="(max-width: 640px) 118px, 135px"
      />
    </span>
  );
}

// Navigation Item
function NavItem({
  href,
  label,
  isActive,
  onNavigate,
  variant = "desktop",
}: NavLink & {
  isActive: boolean;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";
  const weight = isMobile && isActive ? "font-semibold" : "font-medium";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-lg transition-colors duration-200 ease-out outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        weight,
        isMobile ? "px-4 py-3 text-base" : "px-3 py-2 text-sm",
        isMobile && isActive
          ? "bg-[#2aa79b]/10 text-foreground"
          : isActive
            ? "text-foreground"
            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
      )}
    >
      {label}

      {!isMobile && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-[#2aa79b] transition-all duration-300 ease-out",
            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          )}
        />
      )}
    </Link>
  );
}

// User Profile Menu
function ProfileMenu({
  onNavigate,
  user,
}: {
  onNavigate?: () => void;
  user: {
    name: string;
    email: string;
    role?: string;
    image?: string;
  };
}) {
  const firstName = user.name.split(" ")[0];

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-9 gap-1.5 pr-1.5 pl-1.5 hover:bg-muted/70"
            aria-label="Open account menu"
          >
            {/* <Avatar>
  <AvatarImage
    src={user?.image ?? undefined}
    alt={user?.name ?? "User"}
    referrerPolicy="no-referrer"
  />
  <AvatarFallback>
    {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
  </AvatarFallback>
</Avatar> */}
            <Avatar size="sm">
              <AvatarImage
                src={(user.image as string) || undefined}
                alt={user?.name ?? "User"}
                referrerPolicy="no-referrer"
              />

              <AvatarFallback className="bg-[#2aa79b]/15 font-medium text-[#149c8e] dark:text-[#3ec2b4]">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>

            <span className="hidden text-sm font-medium md:inline">
              {firstName}
            </span>

            <ChevronDownIcon
              aria-hidden="true"
              className="size-3.5 text-muted-foreground transition-transform duration-200 ease-out group-data-popup-open/button:rotate-180"
            />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="px-2 py-2 font-normal">
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              {user.name}
            </span>

            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>

            <span className="mt-1 inline-flex w-fit rounded-full bg-[#2aa79b]/10 px-2 py-0.5 text-[0.7rem] font-medium text-[#149c8e] dark:text-[#3ec2b4]">
              {user.role || "Member"}
            </span>
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={<Link href="/create-event" />}
          onClick={onNavigate}
        >
          <Plus aria-hidden="true" />
          Create Event
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/event" />} onClick={onNavigate}>
          <SettingsIcon aria-hidden="true" />
          Manage Events
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href="/all-joinedevent" />}
          onClick={onNavigate}
        >
          <CalendarIcon aria-hidden="true" />
          Joined Events
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOutIcon aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main Navbar
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  const closeMobileMenu = () => setMobileOpen(false);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 ease-out",
        scrolled
          ? "border-border/70 bg-background/85 shadow-xs"
          : "border-transparent bg-background/70",
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex w-fit shrink-0 items-center rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="CareTogether — home"
        >
          <Logo />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 justify-self-center lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavItem key={link.href} {...link} isActive={isActive(link.href)} />
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-1.5 justify-self-end sm:gap-2">
          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {isPending ? (
            <Button variant="ghost" disabled className="h-9">
              Loading...
            </Button>
          ) : user ? (
            <ProfileMenu
              user={{
                name: user.name,
                email: user.email,
                role: (user as typeof user & { role?: string }).role,
              }}
              onNavigate={closeMobileMenu}
            />
          ) : (
            <Button
              variant="brand"
              onClick={handleLogin}
              className="group h-9 gap-1.5 px-3 sm:px-4"
              aria-label="Log in to your account"
            >
              <LogInIcon
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
              />
              Log in
            </Button>
          )}

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <XIcon
                aria-hidden="true"
                className="transition-transform duration-200"
              />
            ) : (
              <MenuIcon
                aria-hidden="true"
                className="transition-transform duration-200"
              />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        inert={mobileOpen ? undefined : true}
        className={cn(
          "overflow-hidden bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          aria-label="Primary mobile"
          className="mx-auto flex w-full max-w-7xl flex-col gap-1 border-t border-border/60 px-4 pt-3 pb-4 sm:px-6"
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              {...link}
              isActive={isActive(link.href)}
              onNavigate={closeMobileMenu}
              variant="mobile"
            />
          ))}

          <div className="mt-2 flex items-center justify-between border-t border-border/60 px-4 pt-3">
            <span className="text-sm font-medium text-muted-foreground">
              Theme Mode
            </span>

            <ThemeToggle showLabel className="h-9 px-3" />
          </div>
        </nav>
      </div>
    </header>
  );
}
