import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"; // 👈 use this for toggle
import { Image } from "expo-image";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  // Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Wallpaper } from "../constants/Data";
import { getImageSource } from "../utils/image";

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
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn} // 👈 ADD HERE
        onPressOut={handlePressOut} // 👈 ADD HERE
        activeOpacity={1} // 👈 important (disable default fade)
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "#1C1C1E",
        }}
      >
        {/* Image */}
        <Image
          source={getImageSource(item.image)}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          loading="lazy"
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
            <FontAwesome6 name="lock" size={12} color="#FFA600" />
            <Text
              style={{
                color: "#FFB800",
                fontSize: 12,
                fontWeight: "700",
                marginLeft: 4,
              }}
            >
              Lock
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
            name={isFav ? "heart" : "heart-o"}
            size={17}
            color={isFav ? "#FF2D55" : "#fff"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
