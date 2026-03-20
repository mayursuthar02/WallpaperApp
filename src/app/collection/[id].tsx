import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
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
      <View
        style={{
          height: 60, // 👈 fixed height for perfect center
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            left: 20,
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="chevron-left" size={18} color="#fff" />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {collection.title}
        </Text>
      </View>

      {/* ── Cover Banner ── */}
      <View
        style={{
          // marginHorizontal: 20,
          // borderRadius: 16,Í
          overflow: "hidden",  
          height: 235,
          marginBottom: 20,
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
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 25 }}>
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
          paddingHorizontal: 20,
          paddingBottom: purchased ? 110 : 180, // adjust for purchase bar
        }}
        columnWrapperStyle={{
          justifyContent: "space-between", // 🔥 PERFECT ALIGNMENT
          marginBottom: 18, // 🔥 CLEAN VERTICAL GAP
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WallpaperCard
            item={item}
            isFav={favorites.includes(item.id)}
            onFav={() => toggleFav(item.id)}
            onPress={() => {
              if (!item.isFree && !purchased) {
                // Alert.alert(
                //   "Premium Collection 🔒",
                //   "To view this wallpaper, please purchase the collection.",
                //   [
                //     { text: "Cancel", style: "cancel" },
                //     {
                //       text: "Buy Now",
                //       onPress: () => setShowPurchase(true), // 👈 open your purchase sheet
                //     },
                //   ],
                // );
                setShowPurchase(true);
              } else {
                router.push(`/wallpaper/${item.id}` as any);
              }
            }}
          />
        )}
      />

      {/* ── Purchase Bar (shown when not purchased) ── */}
      {/* {!purchased && (
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
              height: 55,
              borderRadius: 999,
              backgroundColor: "#019CDF",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Ionicons name="layers-outline" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              Buy Collection ${collection.price}
            </Text>
          </TouchableOpacity>
        </View>
      )} */}

      <PurchaseSheet
        visible={showPurchase}
        collection={collection}
        onClose={() => setShowPurchase(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </View>
  );
}
