import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COPILOT MEETING - Trợ lý Cuộc họp AI",
  description: "Hệ thống Trợ lý Cuộc họp ứng dụng Trí tuệ Nhân tạo toàn diện",
};

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Cuộc họp", href: "/meetings" },
  { label: "Lịch họp", href: "/calendar" },
  { label: "Biên bản", href: "/minutes" },
  { label: "Báo cáo", href: "/reports" },
  { label: "Phân tích", href: "/analytics" },
  { label: "Extension", href: "/extensions" },
  { label: "Quản trị", href: "/admin" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar logo="COPILOT MEETING" links={navLinks} />
        {children}
      </body>
    </html>
  );
}
