"use client";
import React, { ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

interface PHProviderProps {
  children: ReactNode;
}

export function PHProvider({ children }: PHProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
