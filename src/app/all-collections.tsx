import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLLECTIONS } from "../constants/Data";

const { width } = Dimensions.get("window");
const CARD_W = width - 40;

export default function AllCollectionsScreen() {
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type?: string }>();

  const filteredCollections = COLLECTIONS.filter((item) => {
    if (type === "free") return !item.isPremium;
    if (type === "premium") return item.isPremium;
    return true;
  });

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: insets.top }}>
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 5,
          marginBottom: 15,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: "#222",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <FontAwesome6 name="chevron-left" size={18} color="#fff" />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: 22,
          }}
        >
          {type === "free"
            ? "Free Collections"
            : type === "premium"
              ? "Premium Collections"
              : "All Collections"}
        </Text>
      </View>

      {/* ── List ── */}
      <FlatList
        data={filteredCollections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 40,
          gap: 25,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/collection/${item.id}` as any)}
            activeOpacity={0.9}
            style={{
              width: CARD_W,
              height: 190,
              borderRadius: 22,
              overflow: "hidden",
            }}
          >
            <Image
              source={item.coverImage}
              style={{
                width: "100%",
                height: "100%",
                // opacity: 0.95,
              }}
              resizeMode="cover"
            />

            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
              style={{
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center",
                // opacity: 0.3
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 24,
                  letterSpacing: 0.5,
                }}
              >
                {item.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
