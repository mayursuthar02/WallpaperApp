import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Wallpaper } from "../constants/Data";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48) / 2;

type Props = {
  item: Wallpaper;
  isFav: boolean;
  onFav: () => void;
  onPress: () => void;
};

export default function WallpaperCard({ item, isFav, onFav, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: CARD_W,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#1C1C1E",
      }}
    >
      {/* Image */}
      <Image
        source={item.image}
        style={{ width: CARD_W, height: CARD_W * 1.3 }}
        resizeMode="cover"
      />

      {/* Premium badge top-left */}
      {!item.isFree && (
        <View
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "#222",
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Ionicons name="star" size={9} color="#FFA600" />
          <Text style={{ color: "#FFB800", fontSize: 10, fontWeight: "700" }}>
            Pro
          </Text>
        </View>
      )}

      {/* Heart top-right */}
      <TouchableOpacity
        onPress={onFav}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: "rgba(0,0,0,0.6)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name={isFav ? "heart" : "heart-outline"}
          size={15}
          color={isFav ? "#FF2D55" : "#ffffff"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
