import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

  return (
    <ScrollView
      className="flex-1 bg-bg"
      style={{ paddingTop: insets.top }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* ── Header ── */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          Artifex Wallpaper
        </Text>
      </View>

      {/* ── Banner Carousel ── */}
      <FlatList
        data={BANNER_IMAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        style={{ marginHorizontal: 20, borderRadius: 16, overflow: "hidden" }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          setBannerIndex(
            Math.round(e.nativeEvent.contentOffset.x / (width - 40)),
          );
        }}
        renderItem={({ item }) => (
          <View style={{ width: width - 40, height: 140 }}>
            <Image
              source={item.image}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.65)"]}
              style={{
                position: "absolute",
                inset: 0,
                justifyContent: "flex-end",
                padding: 16,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
                {item.label}
              </Text>
            </LinearGradient>
          </View>
        )}
      />
      {/* Banner dots */}
      <View className="flex-row justify-center gap-1.5 mt-3 mb-5">
        {BANNER_IMAGES.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === bannerIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === bannerIndex ? "#2ABFBF" : "#333",
            }}
          />
        ))}
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
