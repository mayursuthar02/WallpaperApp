import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/onboarding");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        console.log("Session:", session ? "EXISTS" : "NULL");
        console.log("User:", session?.user?.email);

        if (
          (event === "SIGNED_IN" ||
            event === "INITIAL_SESSION" ||
            event === "TOKEN_REFRESHED") &&
          session?.user &&
          !useAuthStore.getState().isAuthenticated
        ) {
          console.log("✅ Should redirect to tabs now");

          const user = session.user;

          useAuthStore.setState({
            user: {
              id: user.id,
              email: user.email!,
              full_name: user.user_metadata?.full_name || "",
              avatar_url: user.user_metadata?.avatar_url || "",
            },
            isAuthenticated: true,
          });

          console.log("Store updated, calling router.replace...");
          router.replace("/(tabs)");
        }
      },
    );

    SplashScreen.hideAsync();

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#111111" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="wallpaper/[id]"
          options={{
            presentation: "transparentModal",
            animation: "fade_from_bottom",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="collection/[id]"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="all-collections"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="subscription"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="my-collections"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="about"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen name="faqs" options={{ animation: "slide_from_right" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
