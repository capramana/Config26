import type { Metadata } from "next";
import "./globals.css";
import { geistMono, zalandoSans } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Config26",
    template: "%s · Config26",
  },
  description: "Conference memento guestbook.",
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
      </body>
    </html>
  );
}
