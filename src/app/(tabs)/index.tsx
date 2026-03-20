import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
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
  const [purchasedCollections, setPurchasedCollections] = useState<string[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("purchased").then((v) => {
        if (v) setPurchasedCollections(JSON.parse(v));
      });
    }, []),
  );

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
    <View style={{ flex: 1, backgroundColor: "#111", paddingTop: insets.top}}>
      {/* 🔥 HEADER */}
      <View style={{ paddingHorizontal: 20, marginBottom: 25, marginTop: 5 }}>
        {showSearch ? (
          // 🔍 SEARCH MODE
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#222",
              borderRadius: 999,
              height: 50,
              paddingHorizontal: 6,
            }}
          >
            {/* Search Icon */}
            <View className="w-[40] h-[40] flex items-center justify-center rounded-full">
              <FontAwesome6 name="magnifying-glass" size={14} color="#888" />
            </View>

            {/* Input */}
            <TextInput
              autoFocus
              value={search}
              onChangeText={setSearch}
              placeholder="Search..."
              placeholderTextColor="#555"
              style={{
                flex: 1,
                color: "#fff",
                fontSize: 18,
                marginLeft: 5,
              }}
            />

            {/* ❌ CLOSE BUTTON (ALWAYS visible) */}
            <TouchableOpacity
              onPress={() => {
                setSearch("");
                setShowSearch(false);
              }}
              className="w-[40] h-[40] flex items-center justify-center bg-[#111] rounded-full"
            >
              <FontAwesome6 name="xmark" size={16} color="#aaa" />
            </TouchableOpacity>
          </View>
        ) : (
          // 🏠 NORMAL MODE
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
                width: 42,
                height: 42,
                borderRadius: 999,
                backgroundColor: "#222",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome6 name="magnifying-glass" size={17} color="#fff" />
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
          marginBottom: 25,
        }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: filter === f ? "#019CDF" : "#222",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
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
        }}
        columnWrapperStyle={{
          justifyContent: "space-between", // 🔥 KEY FIX
          marginBottom: 18,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WallpaperCard
            item={item}
            isFav={favorites.includes(item.id)}
            onFav={() => toggleFav(item.id)}
            onPress={() => {
              if (
                !item.isFree &&
                !purchasedCollections.includes(item.collectionId)
              ) {
                router.push(`/collection/${item.collectionId}` as any);
              } else {
                router.push(`/wallpaper/${item.id}` as any);
              }
            }}
          />
        )}
      />
    </View>
  );
}
