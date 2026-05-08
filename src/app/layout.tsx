import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import { BookingProvider } from "@/components/ui/BookingModal";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumelogics — AI Automation Consultancy",
  description:
    "We help businesses automate the repetitive and amplify the strategic with custom AI workflows, agents, and integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <BookingProvider>{children}</BookingProvider>
        {/* Loaded after hydration so Calendly can find the inline-widget
            element (rendered by BookingProvider) and preload the iframe in
            the background — opening the modal is then instant. */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
