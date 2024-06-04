"use client";

import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSupabase } from "./supabase-provider";
import { getURL } from "@/utils/helpers";

interface AuthContextProps {
  user: User | null | undefined;
  emailLoading: boolean;
  googleLoading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{
    user: User | null;
    session: Session | null;
    error: Error | null;
  }>;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{
    user: User | null;
    session: Session | null;
    error: Error | null;
  }>;
  signInWithMagicLink: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  emailLoading: false,
  googleLoading: false,
  signOut: async () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async (email: string, password: string) => {
    return { user: null, session: null, error: null };
  },
  signUpWithEmail: async (email: string, password: string) => {
    return { user: null, session: null, error: null };
  },
  signInWithMagicLink: async (email: string) => {},
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const user = serverSession?.user ?? null;

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Sign-In with Github
  const signInWithGoogle = async () => {
    // posthog.capture("sign_in", { method: "google" });
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        setGoogleLoading(false);
        toast.error("Error signing in with Google");
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    // posthog.capture("sign_in", { method: "email" });
    setEmailLoading(true);
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (user) {
      router.refresh();
    }
    setEmailLoading(false);
    return { user, session, error };
  };

  // Sign-Up with Email
  const signUpWithEmail = async (email: string, password: string) => {
    // posthog.capture("sign_up", { method: "email" });
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "/auth/callback",
      },
    });
    if (user) {
      router.push("/");
    }

    setEmailLoading(false);
    return { user, session, error };
  };

  // Sign-In with Magic Link
  const signInWithMagicLink = async (email: string) => {
    // posthog.capture("sign_in", { method: "magic_link" });
    setEmailLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `https://${getURL()}/auth/callback`,
      },
    });
    setEmailLoading(false);
    if (data) {
      toast.success("Magic link sent to your email");
    }
    if (error) {
      toast.error("Error sending magic link");
    }
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        console.log("Refresh");
        router.refresh();
      }
      if (session?.user) {
        // posthog.identify(session?.user?.id, {
        //   email: session?.user?.email,
        // });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: AuthContextProps = {
    user,
    emailLoading,
    googleLoading,
    signOut,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInWithMagicLink,
  };

  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  let context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
