import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((v) => {
      setTarget(v ? "/(tabs)" : "/onboarding");
    });
  }, []);

  if (!target) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#111111",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#2ABFBF" size="large" />
      </View>
    );
  }

  return <Redirect href={target as any} />;
}
