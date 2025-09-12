import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Admin/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard | Cyber Awareness Hub",
  description: "Admin panel for managing CyberHub content and users",
};

export default async function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar />

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
