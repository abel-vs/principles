import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/lib/providers/providers";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Manrope } from "next/font/google";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Script from "next/script";

const font = Manrope({ subsets: ["latin"] });

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Web-Starter",
  description: "Leggoooooooooo!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={font.className}>
      <head>
        <Script src="https://cdn.tolt.io/tolt.js" data-tolt="TOLT-KEY" />
      </head>
      <body className={cn("flex flex-col bg-background min-h-screen")}>
        <Toaster />
        <Providers
          session={session}
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
