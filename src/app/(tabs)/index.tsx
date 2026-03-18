import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WallpaperCard from "../../components/WallpaperCard";
import { WALLPAPERS } from "../../constants/Data";

type Filter = "All" | "Free" | "Premium";

export default function WallpapersScreen() {
  const insets = useSafeAreaInsets();

  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("favorites").then((v) => {
        if (v) setFavorites(JSON.parse(v));
      });
    }, []),
  );

  const filtered = useMemo(() => {
    let list = WALLPAPERS;
    if (filter === "Free") list = list.filter((w) => w.isFree);
    if (filter === "Premium") list = list.filter((w) => !w.isFree);
    if (search.trim())
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase()),
      );
    return list;
  }, [filter, search]);

  const toggleFav = async (id: string) => {
    const next = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(next);
    await AsyncStorage.setItem("favorites", JSON.stringify(next));
  };

  const FILTERS: Filter[] = ["All", "Free", "Premium"];

  return (
    <View style={{ flex: 1, backgroundColor: "#111", paddingTop: insets.top }}>
      {/* 🔥 HEADER */}
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        {showSearch ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#1c1c1e",
              borderRadius: 999,
              paddingHorizontal: 14,
              height: 44,
              gap: 10,
            }}
          >
            <FontAwesome6 name="magnifying-glass" size={14} color="#888" />

            <TextInput
              autoFocus
              value={search}
              onChangeText={setSearch}
              placeholder="Search..."
              placeholderTextColor="#666"
              style={{ flex: 1, color: "#fff", fontSize: 14 }}
            />

            {!!search && (
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  setShowSearch(false);
                }}
              >
                <FontAwesome6 name="xmark" size={14} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
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
              Artifex Wallpaper
            </Text>

            <TouchableOpacity
              onPress={() => setShowSearch(true)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#1c1c1e",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome6 name="magnifying-glass" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 🔥 FILTER CHIPS */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          gap: 10,
          marginBottom: 15,
        }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: filter === f ? "#019CDF" : "#1c1c1e",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔥 GRID */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
          gap: 18,
        }}
        columnWrapperStyle={{ gap: 18 }}
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
    </View>
  );
}
