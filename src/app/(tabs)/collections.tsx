import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CollectionCard from "../../components/CollectionCard";
import { BANNER_IMAGES, COLLECTIONS } from "../../constants/Data";

const { width } = Dimensions.get("window");

export default function CollectionsScreen() {
  const insets = useSafeAreaInsets();
  const [bannerIndex, setBannerIndex] = useState(0);

  const freeCollections = COLLECTIONS.filter((c) => !c.isPremium);
  const premiumCollections = COLLECTIONS.filter((c) => c.isPremium);

  // For Carousel
  const scrollX = useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = width * 0.75;
  const SPACING = 12;
  const SIDE_SPACING = (width - ITEM_WIDTH) / 2;

  return (
    <ScrollView
      className="flex-1 bg-bg"
      style={{ paddingTop: insets.top }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* ── Header ── */}
      <View style={{ paddingHorizontal: 20, marginBottom: 25, marginTop: 5 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            Collections
          </Text>

          {/* Optional: keep empty space for alignment */}
          <View style={{ width: 42, height: 42 }} />
        </View>
      </View>

      {/* ── Banner Carousel ── */}
      <Animated.FlatList
        data={BANNER_IMAGES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE_SPACING,
        }}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;

          scrollX.setValue(x); // for animation

          const index = Math.round(x / (ITEM_WIDTH + SPACING));
          setBannerIndex(index);
        }}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85], // 👈 SIDE SMALL, CENTER BIG
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: 170,
                marginRight: SPACING,
                borderRadius: 22,
                overflow: "hidden",
                transform: [{ scale }],
              }}
            >
              {/* Image */}
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />

              {/* Gradient */}
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.75)"]}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "55%",
                  justifyContent: "flex-end",
                  padding: 16,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 22,
                  }}
                >
                  {item.label}
                </Text>
              </LinearGradient>
            </Animated.View>
          );
        }}
      />

      {/* Banner dots */}
      <View className="flex-row justify-center gap-1.5 mt-3 mb-5">
        {BANNER_IMAGES.map((_, i) => {
          const inputRange = [
            (i - 1) * (ITEM_WIDTH + SPACING),
            i * (ITEM_WIDTH + SPACING),
            (i + 1) * (ITEM_WIDTH + SPACING),
          ];

          const widthAnim = scrollX.interpolate({
            inputRange,
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                width: widthAnim,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#019CDF",
                opacity,
              }}
            />
          );
        })}
      </View>

      {/* ── Free Collections ── */}
      <SectionHeader
        title="Free Collections"
        onSeeAll={() => router.push("/all-collections" as any)}
      />
      <FlatList
        data={freeCollections}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8, gap: 12 }}
        renderItem={({ item }) => (
          <CollectionCard
            item={item}
            onPress={() => router.push(`/collection/${item.id}` as any)}
          />
        )}
      />

      {/* ── Premium Collections ── */}
      <SectionHeader
        title="Premium Collections"
        isPremium
        onSeeAll={() => router.push("/all-collections" as any)}
      />
      <FlatList
        data={premiumCollections}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8, gap: 12 }}
        renderItem={({ item }) => (
          <CollectionCard
            item={item}
            onPress={() => router.push(`/collection/${item.id}` as any)}
          />
        )}
      />
    </ScrollView>
  );
}

function SectionHeader({
  title,
  isPremium,
  onSeeAll,
}: {
  title: string;
  isPremium?: boolean;
  onSeeAll: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between px-5 mb-3 mt-6">
      <View className="flex-row items-center gap-2">
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
          {title}
        </Text>
        {isPremium && <Text style={{ fontSize: 14 }}>👑</Text>}
      </View>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={{ color: "#2ABFBF", fontWeight: "600", fontSize: 13 }}>
          Sell All
        </Text>
      </TouchableOpacity>
    </View>
  );
}
