import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page"
};

export default function LoginLayout({
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
