import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import Header from "@/components/common/Header";
import SmoothScroll from "@/components/common/SmoothScroll";
import ThemeProvider from "@/lib/theme-context";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumen X Labs - Digital Solutions",
  description: "Creating innovative digital experiences with video production, metrics tracking, and interactive solutions.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StyledComponentsRegistry>
          <ThemeProvider>
            <SmoothScroll>
              <Header />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
