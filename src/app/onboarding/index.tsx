import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import WallpaperLogo from "../../../assets/images/appIcon.png";
import { useAuthStore } from "../../store/authStore";

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
  const { signInWithGoogle, isLoading } = useAuthStore();

  // Dote Animation
  const scrollX = useRef(new Animated.Value(0)).current;

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

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  // Page 4 — Login screen
  if (active === SLIDES.length) {
    return (
      <SafeAreaView
        className="flex-1 bg-bg items-center justify-between px-8 relative"
        style={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 12,
        }}
      >
        <Text className="text-white font-bold text-3xl">Wallbit</Text>

        {/* Logo */}
        <View className="items-center mt-[-100px]">
          <View className="w-[203] h-[203] rounded-full bg-card items-center justify-center mb-10 overflow-hidden">
            <ImageBackground
              source={WallpaperLogo}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white font-bold text-4xl mb-5 mt-10">
            Join with Wallbit
          </Text>
          <Text className="text-[#444] text-2xl text-center leading-8 px-2">
            Step into the world of premium 8K art. Unlock exclusive wallpapers
            crafted by Wallbit.
          </Text>
        </View>

        {/* Google Button */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-[55] rounded-full bg-white items-center justify-center flex-row gap-3"
        >
          <AntDesign name="google" size={20} color="#111" />
          <Text style={{ color: "#111111", fontWeight: "700", fontSize: 18 }}>
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Text>
        </TouchableOpacity>

        {isLoading && (
          <View
            className={`absolute bg-[#111] z-10 top-0 left-0 right-0 bottom-0 w-[${width}] h-[${height}] opacity-80 flex items-center justify-center`}
          >
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      style={{ paddingBottom: insets.bottom + 12 }}
    >
      {/* Slides */}
      <Animated.FlatList
        ref={flatRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }, // IMPORTANT for width animation
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <View style={{ width }} className="items-center pt-14 px-10">
            {/* Image Card */}
            <View
              className="rounded-3xl overflow-hidden items-center justify-center"
              style={{ width: width, height: (width - 64) * 1.05 }}
            >
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            {/* Dots */}
            <View className="flex-row items-center gap-2 mb-24">
              {SLIDES.map((_, i) => {
                const inputRange = [
                  (i - 1) * width,
                  i * width,
                  (i + 1) * width,
                ];

                const dotWidth = scrollX.interpolate({
                  inputRange,
                  outputRange: [10, 20, 10],
                  extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: "clamp",
                });

                return (
                  <Animated.View
                    key={i}
                    style={{
                      width: dotWidth,
                      height: 4,
                      borderRadius: 4,
                      backgroundColor: "#fff",
                      opacity,
                    }}
                  />
                );
              })}
            </View>

            <Text
              className="text-white font-bold text-center mb-5"
              style={{ fontSize: 32, lineHeight: 37 }}
            >
              {item.title}
            </Text>
            <Text className="text-[#444] text-2xl text-center leading-8 px-2">
              {item.sub}
            </Text>
          </View>
        )}
      />

      {/* Bottom Buttons */}
      <View
        className={`flex-row items-center px-10 gap-4 pt-4 ${active == 0 ? "justify-end" : "justify-between"}`}
      >
        {active > 0 && (
          <TouchableOpacity
            onPress={goBack}
            className="w-[55] h-[55] rounded-full bg-card items-center justify-center"
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={isLast ? () => setActive(SLIDES.length) : goNext}
          className="h-[55] w-[100] rounded-full items-center justify-center"
          style={{ backgroundColor: "#019CDF" }}
        >
          <Text className="text-white font-bold text-[18px]">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
