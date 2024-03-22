import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../../globals.css";
import AppLayout from "@/app/ui/layouts/appLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess Game"
};

export default function ChessGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
