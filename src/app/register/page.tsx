"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

// Password Requirement Component
const PasswordRequirement = ({
  valid,
  children,
}: {
  valid: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 text-[11px] text-[#8fc9d4]">
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
          valid ? "border-[#21b5a7] bg-[#21b5a7]" : "border-[#23423e]"
        }`}
      >
        {valid && <span className="h-1.5 w-1.5 rounded-full bg-[#071a17]" />}
      </span>

      {children}
    </div>
  );
};

const RegisterPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  // Email Registration
  const handleEmailRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    if (!isPasswordValid) {
      setErrorMessage("Please enter a valid password.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;
    const passwordValue = formData.get("password") as string;

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password: passwordValue,
        image: image || undefined,
      });

      if (error) {
        setErrorMessage(
          error.message || "Registration failed. Please try again.",
        );
        return;
      }

      if (data) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071a17] px-5 py-12 text-white">
      <div className="w-full max-w-[330px]">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-1.5">
          <svg
            width="30"
            height="36"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Care Together logo"
          >
            <circle cx="5.5" cy="3.5" r="3" fill="#F15A4A" />
            <circle cx="25.5" cy="3.5" r="3" fill="#20B2A5" />

            <path
              d="M15 33C10 29 1 22 1 13C1 8 5 5 9 5C12 5 14 7 15 10C16 7 19 5 22 5C27 5 29 9 29 13C29 22 20 29 15 33Z"
              fill="#20B2A5"
            />

            <path
              d="M15 10C14 7 12 5 9 5C5 5 1 8 1 13C1 22 10 29 15 33V10Z"
              fill="#F15A4A"
            />
          </svg>

          <span className="text-sm font-bold tracking-wide">
            <span className="text-[#F15A4A]">Care</span>{" "}
            <span className="text-[#20B2A5]">Together</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight">
            Create your account
          </h1>

          <p className="mt-1.5 text-[12px] leading-[18px] text-[#9dcbd4]">
            Join Care Together to volunteer, create events and make a difference
            in Jashore.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleEmailRegister} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-[11px] font-semibold text-white"
            >
              Full Name
            </Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              required
              autoComplete="name"
              className="h-10 rounded-[10px] border-[#23423e] bg-transparent px-3 text-xs text-white placeholder:text-[#718b91] focus-visible:border-[#20b2a5] focus-visible:ring-[#20b2a5]/20"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-[11px] font-semibold text-white"
            >
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-10 rounded-[10px] border-[#23423e] bg-transparent px-3 text-xs text-white placeholder:text-[#718b91] focus-visible:border-[#20b2a5] focus-visible:ring-[#20b2a5]/20"
            />
          </div>

          {/* Profile Photo URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="image"
              className="text-[11px] font-semibold text-white"
            >
              Profile Photo URL{" "}
              <span className="font-normal text-[#9dcbd4]">(optional)</span>
            </Label>

            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/my-photo.jpg"
              className="h-10 rounded-[10px] border-[#23423e] bg-transparent px-3 text-xs text-white placeholder:text-[#718b91] focus-visible:border-[#20b2a5] focus-visible:ring-[#20b2a5]/20"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-[11px] font-semibold text-white"
            >
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="h-10 rounded-[10px] border-[#23423e] bg-transparent px-3 pr-10 text-xs text-white placeholder:text-[#718b91] focus-visible:border-[#20b2a5] focus-visible:ring-[#20b2a5]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9dcbd4] hover:text-white"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="space-y-1.5 pt-0.5">
              <PasswordRequirement valid={hasUppercase}>
                At least one uppercase letter (A-Z)
              </PasswordRequirement>

              <PasswordRequirement valid={hasLowercase}>
                At least one lowercase letter (a-z)
              </PasswordRequirement>

              <PasswordRequirement valid={hasMinLength}>
                Minimum 6 characters length
              </PasswordRequirement>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-xs text-[#ff5549]" role="alert">
              {errorMessage}
            </p>
          )}

          {/* Create Account Button */}
          <Button
            type="submit"
            disabled={!isPasswordValid || isLoading}
            className="h-10 w-full rounded-full bg-[#e4473b] text-xs font-semibold text-white hover:bg-[#d53b30] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-12 text-center text-xs text-[#9dcbd4]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#ff5549] hover:text-[#ff766b]"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
