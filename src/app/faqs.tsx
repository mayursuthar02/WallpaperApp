import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FAQS = [
  {
    id: "1",
    q: "How do I download wallpapers?",
    a: "Tap any wallpaper and press Download or Set Wallpaper.",
  },
  {
    id: "2",
    q: "Why is my download limit restricted?",
    a: "Free users have limited downloads. Upgrade to Premium.",
  },
  {
    id: "3",
    q: "Can I use wallpapers after subscription ends?",
    a: "Downloaded wallpapers remain on your device.",
  },
  {
    id: "4",
    q: "How often do you add wallpapers?",
    a: "We add new wallpapers regularly.",
  },
];

// Enable animation on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function FAQsScreen() {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111", paddingTop: insets.top }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 45,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            left: 20,
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="chevron-left" size={18} color="#fff" />
        </TouchableOpacity>

        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          FAQs
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 60,
          gap: 14,
        }}
      >
        {FAQS.map((faq, index) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            index={index}
            isOpen={expanded === faq.id}
            onPress={() => toggle(faq.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function FAQItem({ faq, index, isOpen, onPress }: any) {
  const animation = useRef(new Animated.Value(0)).current;

  // Animate on open/close
  if (isOpen) {
    Animated.timing(animation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // adjust if text is bigger
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        backgroundColor: "#181818",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Question */}
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 15,
            flex: 1,
            lineHeight: 22,
          }}
        >
          {index + 1}. {faq.q}
        </Text>
      </View>

      {/* Divider */}
      {isOpen && (
        <View
          style={{
            height: 0.5,
            backgroundColor: "rgba(255,255,255,0.08)",
            marginHorizontal: 16,
          }}
        />
      )}

      {/* Animated Answer */}
      <Animated.View
        style={{
          height,
          opacity,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "#aaa",
            fontSize: 14,
            lineHeight: 22,
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          {faq.a}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
