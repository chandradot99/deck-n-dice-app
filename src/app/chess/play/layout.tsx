import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play Chess"
};

export default function ChessPageLayout({
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
