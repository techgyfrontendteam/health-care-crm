import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Health Care CRM",
  description: "Hospital relationship and care operations workspace",
  icons: {
    icon: "/techgy-link-mark-white.png",
    apple: "/techgy-link-mark-white.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
