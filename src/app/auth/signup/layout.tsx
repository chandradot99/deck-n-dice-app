import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp Page"
};

export default function SignUpLayout({
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
