"use client";

import * as React from "react";
// import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import SupabaseAuthProvider from "./auth-provider";
import { PHProvider } from "./posthog-provider";
import SupabaseProvider from "./supabase-provider";
import { Session } from "@supabase/supabase-js";

export function Providers({
  children,
  ...props
}: ThemeProviderProps & {
  session: Session | null;
}) {
  const { session, ...rest } = props;
  return (
    <ThemeProvider {...rest}>
      <PHProvider>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            <TooltipProvider>{children}</TooltipProvider>
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </PHProvider>
    </ThemeProvider>
  );
}
