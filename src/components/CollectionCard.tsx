import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Collection } from "../constants/Data";

type Props = {
  item: Collection;
  onPress: () => void;
  size?: "small" | "large";
  cardWidth?: number;
};

export default function CollectionCard({
  item,
  onPress,
  size = "small",
  cardWidth,
}: Props) {
  const W = cardWidth ?? (size === "large" ? 320 : 176);
  const H = size === "large" ? 180 : 112;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: W,
        height: H,
        borderRadius: 22,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <Image
        source={item.coverImage}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={{
          position: "absolute",
          inset: 0,
          justifyContent: size === "large" ? "center" : "flex-end",
          alignItems: size === "large" ? "center" : "flex-start",
          padding: 16,
        }}
      >
        {/* Title */}
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: size === "large" ? 22 : 13,
            textAlign: size === "large" ? "center" : "left",
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        {/* ONLY for small cards */}
        {size === "small" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 3,
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
              {item.wallpaperCount} wallpapers
            </Text>

            {!item.isPremium ? (
              <View
                style={{
                  backgroundColor: "rgba(42,191,191,0.25)",
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color: "#2ABFBF",
                    fontSize: 10,
                    fontWeight: "600",
                  }}
                >
                  Free
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 10,
                  }}
                >
                  ${item.price}
                </Text>
              </View>
            )}
          </View>
        )}
      </LinearGradient>

      {/* Premium badge */}
      {item.isPremium && (
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#222",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Ionicons name="star" size={12} color="#FFA600" />
          <Text
            style={{
              color: "#FFA600",
              fontSize: 11,
              fontWeight: "700",
            }}
          >
            Premium
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}