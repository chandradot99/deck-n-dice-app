import type { Metadata } from "next";
import AppLayout from "@/app/ui/layouts/appLayout";

export const metadata: Metadata = {
  title: "Play Chess"
};

export default function ChessPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
