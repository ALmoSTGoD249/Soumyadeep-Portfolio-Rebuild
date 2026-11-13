import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "./components/theme-toggle";

export const metadata: Metadata = {
  title: "Soumyadeep Maity — Engineer & Builder",
  description: "Portfolio of Soumyadeep Maity — software, cloud infrastructure, and products built with intent.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ThemeToggle /></body></html>;
}
