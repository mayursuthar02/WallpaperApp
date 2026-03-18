import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
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
          options={{ presentation: "fullScreenModal", animation: "fade" }}
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
