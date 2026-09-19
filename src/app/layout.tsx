import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohd Anas",
};

// Scaffold stub: replaced with the full app shell in Task 3.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
