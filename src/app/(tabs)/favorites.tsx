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

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();

  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("favorites").then((v) => {
        if (v) setFavorites(JSON.parse(v));
        else setFavorites([]);
      });
    }, []),
  );

  // 🔥 Filter logic (same as main screen but only favorites)
  const filtered = useMemo(() => {
    let list = WALLPAPERS.filter((w) => favorites.includes(w.id));

    if (filter === "Free") list = list.filter((w) => w.isFree);
    if (filter === "Premium") list = list.filter((w) => !w.isFree);

    if (search.trim()) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return list;
  }, [filter, search, favorites]);

  const toggleFav = async (id: string) => {
    const next = favorites.filter((f) => f !== id);
    setFavorites(next);
    await AsyncStorage.setItem("favorites", JSON.stringify(next));
  };

  const FILTERS: Filter[] = ["All", "Free", "Premium"];

  return (
    <View style={{ flex: 1, backgroundColor: "#111", paddingTop: insets.top }}>
      {/* 🔥 HEADER (same as main screen) */}
      <View style={{ paddingHorizontal: 20, marginBottom: 25, marginTop: 5 }}>
        {showSearch ? (
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
            <View className="w-[40] h-[40] items-center justify-center">
              <FontAwesome6 name="magnifying-glass" size={14} color="#888" />
            </View>

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

            <TouchableOpacity
              onPress={() => {
                setSearch("");
                setShowSearch(false);
              }}
              className="w-[40] h-[40] items-center justify-center bg-[#111] rounded-full"
            >
              <FontAwesome6 name="xmark" size={16} color="#aaa" />
            </TouchableOpacity>
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
              Favorites
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

      {/* 🔥 CONTENT */}
      {filtered.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text
            style={{
              color: "#555",
              fontSize: 20,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            Looks empty! Add some{"\n"}wallpapers you love
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 18,
          }}
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
      )}
    </View>
  );
}
