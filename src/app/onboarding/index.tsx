import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// Replace these with your actual onboarding images in assets/onboarding/
const SLIDES = [
  {
    id: "1",
    title: "Discover Art in Every Pixel",
    sub: "Handcrafted 8K wallpapers designed to transform your screen — from phone to desktop.",
    image: require("../../../assets/onboarding/ob1.png"),
  },
  {
    id: "2",
    title: "Access Exclusive 8K Collections",
    sub: "Subscribe monthly or yearly for unlimited access, or buy your favorite collections individually.",
    image: require("../../../assets/onboarding/ob2.png"),
  },
  {
    id: "3",
    title: "Your Favorites, Always with You",
    sub: "Save wallpapers you love and access them anytime, anywhere.",
    image: require("../../../assets/onboarding/ob3.png"),
  },
];

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const isLast = active === SLIDES.length - 1;

  const goNext = () => {
    if (!isLast) {
      flatRef.current?.scrollToIndex({ index: active + 1, animated: true });
      setActive(active + 1);
    } else {
      goToLogin();
    }
  };

  const goBack = () => {
    flatRef.current?.scrollToIndex({ index: active - 1, animated: true });
    setActive(active - 1);
  };

  const goToLogin = async () => {
    await AsyncStorage.setItem("onboarded", "true");
    router.replace("/(tabs)");
  };

  // Page 4 — Login screen
  if (active === SLIDES.length) {
    return (
      <View
        className="flex-1 bg-bg items-center justify-between px-8"
        style={{
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <Text className="text-white font-bold text-xl">Artifex Wallpaper</Text>

        {/* Logo */}
        <View className="items-center">
          <View className="w-28 h-28 rounded-full bg-card items-center justify-center mb-10">
            <Text className="text-white font-black text-5xl">A</Text>
          </View>
          <Text className="text-white font-bold text-3xl mb-3">
            Join with Artifex
          </Text>
          <Text className="text-muted text-sm text-center leading-6 px-4">
            Step into the world of premium 8K art. Unlock exclusive wallpapers
            crafted by Artifex.
          </Text>
        </View>

        {/* Google Button */}
        <TouchableOpacity
          onPress={goToLogin}
          className="w-full h-14 rounded-full bg-white items-center justify-center flex-row gap-3"
        >
          <AntDesign name="google" size={20} color="#111" />
          <Text style={{ color: "#111111", fontWeight: "700", fontSize: 16 }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-bg"
      style={{ paddingBottom: insets.bottom + 12 }}
    >
      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <View style={{ width }} className="items-center pt-14 px-8">
            {/* Image Card */}
            <View
              className="rounded-3xl overflow-hidden bg-card items-center justify-center"
              style={{ width: width - 64, height: (width - 64) * 1.05 }}
            >
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            {/* Dots */}
            <View className="flex-row items-center gap-2 mt-8 mb-7">
              {SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === active ? "#2ABFBF" : "#333333",
                  }}
                />
              ))}
            </View>

            <Text
              className="text-white font-bold text-center mb-3"
              style={{ fontSize: 24, lineHeight: 32 }}
            >
              {item.title}
            </Text>
            <Text className="text-muted text-sm text-center leading-6 px-2">
              {item.sub}
            </Text>
          </View>
        )}
      />

      {/* Bottom Buttons */}
      <View className="flex-row items-center px-8 gap-4 pt-4">
        {active > 0 && (
          <TouchableOpacity
            onPress={goBack}
            className="w-12 h-12 rounded-full bg-card items-center justify-center"
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={isLast ? () => setActive(SLIDES.length) : goNext}
          className="flex-1 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: "#2ABFBF" }}
        >
          <Text className="text-white font-bold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
