// "use client";

// import { useState } from "react";
// import type React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { authClient } from "@/lib/auth-client";

// const LoginPage = () => {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Email Login
//   const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setErrorMessage("");

//     const formData = new FormData(e.currentTarget);

//     const email = formData.get("email") as string;
//     const passwordValue = formData.get("password") as string;

//     try {
//       setIsLoading(true);

//       const { data, error } = await authClient.signIn.email({
//         email,
//         password: passwordValue,
//       });

//       if (error) {
//         setErrorMessage(error.message || "Login failed. Please try again.");
//         return;
//       }

//       if (data) {
//         router.push("/");
//         router.refresh();
//       }
//     } catch (error) {
//       console.error("Login error:", error);

//       setErrorMessage("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Google Login
//   const handleGoogleSignIn = async () => {
//     try {
//       setErrorMessage("");
//       setIsGoogleLoading(true);

//       const { error } = await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "/",
//       });

//       if (error) {
//         setErrorMessage(
//           error.message || "Google login failed. Please try again.",
//         );
//         setIsGoogleLoading(false);
//       }
//     } catch (error) {
//       console.error("Google login error:", error);

//       setErrorMessage("Google login failed. Please try again.");
//       setIsGoogleLoading(false);
//     }
//   };

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-[#071a17] px-5 py-12 text-white">
//       <div className="w-full max-w-[330px]">
//         {/* Logo */}
//         <Link href="/" className="mb-8 flex items-center gap-1.5">
//           <svg
//             width="30"
//             height="36"
//             viewBox="0 0 30 36"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-label="Care Together logo"
//           >
//             <circle cx="5.5" cy="3.5" r="3" fill="#F15A4A" />
//             <circle cx="25.5" cy="3.5" r="3" fill="#20B2A5" />

//             <path
//               d="M15 33C10 29 1 22 1 13C1 8 5 5 9 5C12 5 14 7 15 10C16 7 19 5 22 5C27 5 29 9 29 13C29 22 20 29 15 33Z"
//               fill="#20B2A5"
//             />

//             <path
//               d="M15 10C14 7 12 5 9 5C5 5 1 8 1 13C1 22 10 29 15 33V10Z"
//               fill="#F15A4A"
//             />
//           </svg>

//           <span className="text-sm font-bold tracking-wide">
//             <span className="text-[#F15A4A]">Care</span>{" "}
//             <span className="text-[#20B2A5]">Together</span>
//           </span>
//         </Link>

//         {/* Heading */}
//         <div className="mb-5">
//           <h1 className="text-[28px] font-bold leading-tight tracking-tight">
//             Welcome back
//           </h1>

//           <p className="mt-1.5 text-[12px] leading-[18px] text-[#9dcbd4]">
//             Login to join events, manage your own and keep making a difference.
//           </p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleEmailLogin} className="space-y-3.5">
//           {/* Email */}
//           <div className="space-y-1.5">
//             <Label
//               htmlFor="email"
//               className="text-[11px] font-semibold text-white"
//             >
//               Email
//             </Label>

//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="you@example.com"
//               required
//               autoComplete="email"
//               className="h-10 rounded-[10px] border-[#23423e] bg-transparent px-3 text-xs text-white placeholder:text-[#718b91] focus-visible:border-[#20b2a5] focus-visible:ring-[#20b2a5]/20"
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-1.5">
//             <Label
//               htmlFor="password"
//               className="text-[11px] font-semibold text-white"
//             >
//               Password
//             </Label>

//             <div className="relative">
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="current-password"
//                 className="h-10 rounded-[10px] border-[#23423e] bg-transparent px-3 pr-10 text-xs text-white placeholder:text-[#718b91] focus-visible:border-[#20b2a5] focus-visible:ring-[#20b2a5]/20"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9dcbd4] hover:text-white"
//               >
//                 {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//               </button>
//             </div>
//           </div>

//           {/* Error Message */}
//           {errorMessage && (
//             <p className="text-xs text-[#ff5549]" role="alert">
//               {errorMessage}
//             </p>
//           )}

//           {/* Login Button */}
//           <Button
//             type="submit"
//             disabled={!password || isLoading || isGoogleLoading}
//             className="h-10 w-full rounded-full bg-[#e4473b] text-xs font-semibold text-white hover:bg-[#d53b30] disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </Button>
//         </form>

//         {/* Continue with Google */}
//         <Button
//           type="button"
//           variant="outline"
//           onClick={handleGoogleSignIn}
//           disabled={isGoogleLoading || isLoading}
//           className="mt-3.5 h-10 w-full rounded-full border-[#23423e] bg-transparent text-xs font-semibold text-white hover:bg-[#17332e] hover:text-white"
//         >
//           <svg
//             className="mr-2 h-4 w-4"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.75 3.27-8.09Z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 4.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.6 10.6 0 0 0 12 1a11 11 0 0 0-9.85 6.06L5.84 9.9c.87-2.6 3.3-5.53 6.16-5.53Z"
//             />
//           </svg>

//           {isGoogleLoading ? "Connecting..." : "Continue with Google"}
//         </Button>

//         {/* Register Link */}
//         <p className="mt-12 text-center text-xs text-[#9dcbd4]">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/register"
//             className="font-semibold text-[#ff5549] hover:text-[#ff766b]"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default LoginPage;

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
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Email Login
  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password: passwordValue,
      });

      if (error) {
        toast.error(error.message || "Login failed. Please try again.");
        setErrorMessage(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        toast.success("Login successful! Welcome back.");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Something went wrong. Please try again.");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage("");
      setIsGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google login failed.");

        setErrorMessage(
          error.message || "Google login failed. Please try again.",
        );

        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google login error:", error);

      toast.error("Google login failed. Please try again.");
      setErrorMessage("Google login failed. Please try again.");
      setIsGoogleLoading(false);
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
            Welcome back
          </h1>

          <p className="mt-1.5 text-[12px] leading-[18px] text-[#9dcbd4]">
            Login to join events, manage your own and keep making a difference.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-3.5">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-xs text-[#ff5549]" role="alert">
              {errorMessage}
            </p>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={!password || isLoading || isGoogleLoading}
            className="h-10 w-full rounded-full bg-[#e4473b] text-xs font-semibold text-white hover:bg-[#d53b30] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Continue with Google */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="mt-3.5 h-10 w-full rounded-full border-[#23423e] bg-transparent text-xs font-semibold text-white hover:bg-[#17332e] hover:text-white"
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.75 3.27-8.09Z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.6 10.6 0 0 0 12 1a11 11 0 0 0-9.85 6.06L5.84 9.9c.87-2.6 3.3-5.53 6.16-5.53Z"
            />
          </svg>

          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        {/* Register Link */}
        <p className="mt-12 text-center text-xs text-[#9dcbd4]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#ff5549] hover:text-[#ff766b]"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
