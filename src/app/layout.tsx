import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/providers/theme-provider";

const oswaid = Oswald({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CareTogether — Community Care & Social Welfare",
    template: "%s | CareTogether",
  },
  description:
    "CareTogether brings volunteers, donors, and communities together to organize events, support families, and create lasting social impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswaid.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <main className="flex flex-1 flex-col">
              <Navbar />
              {children}
              <Toaster position="top-right" richColors />
              <Footer />
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
