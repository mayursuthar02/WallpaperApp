import { FontAwesome } from "@expo/vector-icons"; // 👈 use this for toggle
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Wallpaper } from "../constants/Data";

const { width } = Dimensions.get("window");

// 2 column grid with spacing
const CARD_W = (width - 40 - 18) / 2;
const CARD_H = CARD_W * (200 / 150); // 👈 exact Figma ratio

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
        height: CARD_H,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#1C1C1E",
        // marginBottom: 16,
      }}
    >
      {/* Image */}
      <Image
        source={item.image}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      {/* Premium badge */}
      {!item.isFree && (
        <View
          style={{
            position: "absolute",
            top: 11,
            left: 10,
            backgroundColor: "#111",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome name="star" size={14} color="#FFA600" />
          <Text
            style={{
              color: "#FFB800",
              fontSize: 12,
              fontWeight: "700",
              marginLeft: 4,
            }}
          >
            Premium
          </Text>
        </View>
      )}

      {/* Heart */}
      <TouchableOpacity
        onPress={onFav}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 35,
          height: 35,
          borderRadius: 999,
          backgroundColor: "#111",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome
          name={isFav ? "heart" : "heart-o"} // ✅ perfect toggle
          size={17}
          color={isFav ? "#FF2D55" : "#fff"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
