import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/lib/providers/providers";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Script from "next/script";
import { garamond, manrope } from "@/lib/fonts";

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
    <html lang="en" className={manrope.className}>
      <head>
        <Script src="https://cdn.tolt.io/tolt.js" data-tolt="TOLT-KEY" />
      </head>
      <body
        className={cn(
          "flex flex-col min-h-screen",
          manrope.variable,
          garamond.variable
        )}
      >
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
