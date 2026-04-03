import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { create } from "zustand";
import { supabase } from "../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

// const REDIRECT_URL = Linking.createURL("auth/callback");
const REDIRECT_URL = Linking.createURL("/");

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const processAuthUrl = async (url: string) => {
  try {
    let params: Record<string, string> = {};

    // Supabase returns tokens in hash fragment #access_token=...
    if (url.includes("#")) {
      const hash = url.split("#")[1];
      params = Object.fromEntries(new URLSearchParams(hash));
    }

    // Fallback: PKCE uses ?code=
    if (!params.access_token && !params.code && url.includes("?")) {
      const qs = url.split("?")[1]?.split("#")[0];
      if (qs) params = Object.fromEntries(new URLSearchParams(qs));
    }

    console.log("Params keys:", Object.keys(params));

    // PKCE flow
    if (params.code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        params.code,
      );
      if (error) throw error;
      return data.session;
    }

    // Implicit flow
    if (params.access_token) {
      const { data, error } = await supabase.auth.setSession({
        access_token: params.access_token,
        refresh_token: params.refresh_token,
      });
      if (error) throw error;
      return data.session;
    }

    return null;
  } catch (err) {
    console.log("processAuthUrl error:", err);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  signInWithGoogle: async () => {
    try {
      set({ isLoading: true });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: REDIRECT_URL,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          REDIRECT_URL,
        );

        console.log("Browser result type:", result.type);

        if (result.type === "success" && result.url) {
          // Manually process the URL — this triggers onAuthStateChange
          const session = await processAuthUrl(result.url);

          if (session) {
            console.log("Session set successfully");
            // onAuthStateChange in _layout.tsx will fire SIGNED_IN now
          } else {
            console.log("No session extracted from URL");
          }
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
    router.replace("/onboarding");
  },
}));
