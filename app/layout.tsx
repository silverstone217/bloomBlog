import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const open_Sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloom, the best blog post ever",
  description:
    "Read best blog post on whole world, best content, good news and best authors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={open_Sans.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
