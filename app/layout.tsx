import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Marian Abebe // Engineering Mission", template: "%s // Marian Abebe" },
  description: "An engineering portfolio exploring autonomous systems, electrical engineering, and space systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
