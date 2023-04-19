"use client";
import { MantineProvider } from "@mantine/core";
import "./globals.css";
import { Footer } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" h-screen bg-gray-900">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark", primaryColor: "lime" }}
        >
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
