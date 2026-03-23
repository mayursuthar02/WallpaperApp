import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#111", paddingTop: insets.top }}>
      {/* ── Header (SAME AS FAQ) ── */}
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
          About
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 60,
        }}
      >
        {/* ── APP HEADER (LOGO + NAME) ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 50,
              backgroundColor: "#1C1C1E",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
              overflow: "hidden",
            }}
          >
            {/* Replace with your logo if needed */}
            <Image
              source={require("../../assets/images/appIcon.png")}
              style={{ width: 70, height: 70 }}
              contentFit="cover"
            />
          </View>

          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
            Wallbit
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text
          style={{
            color: "#444",
            fontSize: 14,
            lineHeight: 22,
            marginBottom: 20,
          }}
        >
          Wallbit Wallpaper brings you a curated collection of stunning 4K & 8K
          digital artworks designed to elevate your home and lock screens. Our
          mission is to make personalization effortless with high-quality
          wallpapers, premium collections, and a smooth browsing experience.
        </Text>

        {/* DIVIDER */}
        <View
          style={{
            height: 0.5,
            backgroundColor: "#222",
            marginBottom: 20,
          }}
        />

        {/* ── CREDITS ── */}
        <Text style={sectionTitle}>Credits</Text>

        <View style={{ marginBottom: 1 }}>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={label}>Built by:</Text>
            <Text style={value}> Wallbit</Text>
          </View>

          <Text style={desc}>
            Designed with attention to detail and passion for creativity.
          </Text>
        </View>

        {/* DIVIDER */}
        <View style={divider} />

        {/* ── CONTACT ── */}
        <Text style={sectionTitle}>Contact Support</Text>

        <Text style={desc}>
          For questions, issues, or feedback, feel free to contact us at:
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:support@Wallbitwallpaper.com")}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
        >
          <Text style={{ color: "#019CDF", fontSize: 14 }}>
            support@Wallbitwallpaper.com
          </Text>

          <FontAwesome6
            name="arrow-up-right-from-square"
            size={12}
            color="#00BFFF"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={divider} />

        {/* ── FOLLOW US ── */}
        <Text style={sectionTitle}>Follow Us</Text>

        <Text style={desc}>
          Stay updated with new releases, exclusive drops, and behind-the-scenes
          artwork.
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://instagram.com/Wallbit")}
          style={socialRow}
        >
          <FontAwesome6 name="instagram" size={14} color="#019CDF" />
          <Text style={socialText}>@Wallbit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://x.com/Wallbit")}
          style={socialRow}
        >
          <FontAwesome6 name="x-twitter" size={14} color="#019CDF" />
          <Text style={socialText}>@Wallbit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ── STYLES ── */

const sectionTitle = {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 10,
};

const label = {
  color: "#444",
  fontSize: 14,
};

const value = {
  color: "#fff",
  fontSize: 14,
};

const desc = {
  color: "#444",
  fontSize: 14,
  lineHeight: 22,
  marginBottom: 10,
};

const divider = {
  height: 0.5,
  backgroundColor: "#222",
  marginVertical: 20,
};

const socialRow = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
  gap: 8,
};

const socialText = {
  color: "#019CDF",
  fontSize: 14,
};
