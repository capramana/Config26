import type { Metadata, Viewport } from "next";
import "./globals.css";
import AgentationWrapper from "@/app/components/AgentationWrapper";
import { geistMono, zalandoSans } from "./fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Config26",
    template: "%s · Config26",
  },
  description: "Conference guestbook.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zalandoSans.variable} ${zalandoSans.className} ${geistMono.variable} antialiased`}
      >
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
