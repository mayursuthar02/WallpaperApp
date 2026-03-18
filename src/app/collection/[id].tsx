import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PurchaseSheet from "../../components/PurchaseSheet";
import WallpaperCard from "../../components/WallpaperCard";
import { COLLECTIONS, WALLPAPERS } from "../../constants/Data";

const { width } = Dimensions.get("window");

export default function CollectionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [showPurchase, setShowPurchase] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const collection = COLLECTIONS.find((c) => c.id === id);
  const wallpapers = WALLPAPERS.filter((w) => w.collectionId === id);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("purchased").then((v) => {
        if (v) setPurchased(JSON.parse(v).includes(id));
      });
      AsyncStorage.getItem("favorites").then((v) => {
        if (v) setFavorites(JSON.parse(v));
      });
    }, [id]),
  );

  if (!collection) return null;

  const toggleFav = async (wId: string) => {
    const next = favorites.includes(wId)
      ? favorites.filter((f) => f !== wId)
      : [...favorites, wId];
    setFavorites(next);
    await AsyncStorage.setItem("favorites", JSON.stringify(next));
  };

  const handlePurchaseSuccess = async () => {
    const v = await AsyncStorage.getItem("purchased");
    const arr: string[] = v ? JSON.parse(v) : [];
    if (!arr.includes(id)) {
      await AsyncStorage.setItem("purchased", JSON.stringify([...arr, id]));
    }
    setPurchased(true);
    setShowPurchase(false);
  };

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: insets.top }}>
      {/* ── Header ── */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#1C1C1E",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {collection.title}
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* ── Cover Banner ── */}
      <View
        style={{
          marginHorizontal: 20,
          borderRadius: 16,
          overflow: "hidden",
          height: 180,
          marginBottom: 16,
        }}
      >
        <Image
          source={collection.coverImage}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 20 }}>
            {collection.title}
          </Text>
        </LinearGradient>
      </View>

      {/* ── Wallpaper Grid ── */}
      <FlatList
        data={wallpapers}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: purchased ? 110 : 220,
          gap: 12,
        }}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WallpaperCard
            item={item}
            isFav={favorites.includes(item.id)}
            onFav={() => toggleFav(item.id)}
            onPress={() => router.push(`/wallpaper/${item.id}` as any)}
          />
        )}
      />

      {/* ── Purchase Bar (shown when not purchased) ── */}
      {!purchased && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#111111",
            paddingHorizontal: 20,
            paddingTop: 14,
            paddingBottom: insets.bottom + 16,
            gap: 12,
            borderTopWidth: 1,
            borderTopColor: "#2A2A2A",
          }}
        >
          <TouchableOpacity
            onPress={() => setShowPurchase(true)}
            style={{
              height: 56,
              borderRadius: 999,
              backgroundColor: "#2ABFBF",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Ionicons name="layers-outline" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
              Buy Collection ${collection.price}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 56,
              borderRadius: 999,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#111", fontWeight: "700", fontSize: 15 }}>
              Unlock All – Go Premium
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <PurchaseSheet
        visible={showPurchase}
        collection={collection}
        onClose={() => setShowPurchase(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </View>
  );
}
