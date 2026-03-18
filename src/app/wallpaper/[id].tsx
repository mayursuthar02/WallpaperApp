import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PurchaseSheet from "../../components/PurchaseSheet";
import { COLLECTIONS, WALLPAPERS } from "../../constants/Data";

const { width, height } = Dimensions.get("window");

export default function WallpaperDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [showInfo, setShowInfo] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const wallpaper = WALLPAPERS.find((w) => w.id === id);
  const collection = COLLECTIONS.find((c) => c.id === wallpaper?.collectionId);

  useFocusEffect(
    useCallback(() => {
      if (!wallpaper) return;
      AsyncStorage.getItem("favorites").then((v) => {
        if (v) setIsFav(JSON.parse(v).includes(wallpaper.id));
      });
      AsyncStorage.getItem("purchased").then((v) => {
        if (v) setPurchased(JSON.parse(v).includes(wallpaper.collectionId));
      });
    }, [wallpaper]),
  );

  if (!wallpaper) return null;

  const canAccess = wallpaper.isFree || purchased;

  const toggleFav = async () => {
    const v = await AsyncStorage.getItem("favorites");
    const arr: string[] = v ? JSON.parse(v) : [];
    const next = arr.includes(wallpaper.id)
      ? arr.filter((f) => f !== wallpaper.id)
      : [...arr, wallpaper.id];
    await AsyncStorage.setItem("favorites", JSON.stringify(next));
    setIsFav(!isFav);
  };

  const handlePurchaseSuccess = async () => {
    const v = await AsyncStorage.getItem("purchased");
    const arr: string[] = v ? JSON.parse(v) : [];
    if (!arr.includes(wallpaper.collectionId)) {
      await AsyncStorage.setItem(
        "purchased",
        JSON.stringify([...arr, wallpaper.collectionId]),
      );
    }
    setPurchased(true);
    setShowPurchase(false);
  };

  return (
    // <Safe></Safe>
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      {/* ── Full Screen Image ── */}
      <Image
        source={wallpaper.image}
        style={{ width, height }}
        resizeMode="cover"
      />

      {/* ── Top Bar ── */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 8,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="share" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ── Bottom Buttons ── */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
        }}
      >
        {canAccess ? (
          /* Download / Apply */
          <View
            style={{
              position: "absolute",
              bottom: insets.bottom + 20,
              left: 20,
              right: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Info Button */}
            <TouchableOpacity
              onPress={() => setShowInfo(true)}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "#222",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome6 name="bars" size={18} color="#fff" />
            </TouchableOpacity>

            {/* Download */}
            <TouchableOpacity
              style={{
                flex: 1,
                height: 52,
                borderRadius: 999,
                backgroundColor: "#222",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Download</Text>
            </TouchableOpacity>

            {/* Apply */}
            <TouchableOpacity
              style={{
                flex: 1,
                height: 52,
                borderRadius: 999,
                backgroundColor: "#019CDF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Purchase Buttons */
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => setShowPurchase(true)}
              style={{
                height: 56,
                borderRadius: 999,
                backgroundColor: "#019CDF",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <FontAwesome6 name="layer-group" size={16} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                Buy Collection ${collection?.price ?? 3}
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
              <Text style={{ color: "#222", fontWeight: "700", fontSize: 15 }}>
                Unlock All – Go Premium
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ── Info Bottom Sheet ── */}
      {showInfo && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowInfo(false)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <BlurView
              intensity={80} // 👈 increase blur
              tint="dark"
              style={{
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                overflow: "hidden",
                backgroundColor: "#111", // 👈 ADD THIS
              }}
            >
              <View style={{ padding: 20, paddingBottom: insets.bottom + 20 }}>
                {/* Handle */}
                <View
                  style={{
                    width: 50,
                    height: 5,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    marginBottom: 22,
                  }}
                />

                {/* Top Row */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  {/* Author */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999,
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: "#111",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>
                        A
                      </Text>
                    </View>

                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      Artifex
                    </Text>

                    <FontAwesome6
                      name="circle-check"
                      size={12}
                      color="#019CDF"
                      solid
                    />
                  </View>

                  {/* Stats */}
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {/* Views */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 999,
                        gap: 6,
                      }}
                    >
                      <Text style={{ color: "#00BFFF", fontSize: 12 }}>
                        {wallpaper.views}
                      </Text>
                      <FontAwesome6 name="eye" size={12} color="#00BFFF" />
                    </View>

                    {/* Likes */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 999,
                        gap: 6,
                      }}
                    >
                      <Text style={{ color: "#FF2D55", fontSize: 12 }}>
                        {wallpaper.likes}
                      </Text>
                      <FontAwesome6
                        name="heart"
                        size={12}
                        color="#FF2D55"
                        solid
                      />
                    </View>
                  </View>
                </View>

                {/* INFO CARD */}
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: 20,
                    padding: 18,
                  }}
                >
                  {/* Title */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 14,
                    }}
                  >
                    <FontAwesome6
                      name="circle-info"
                      size={16}
                      color="#019CDF"
                    />
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      INFO
                    </Text>
                  </View>
                  {/* Rows */}
                  <InfoRow
                    label="Collection"
                    value={wallpaper.collectionName}
                  />
                  <InfoRow label="Dimensions" value={wallpaper.dimensions} />
                  <InfoRow label="License" value={wallpaper.license} />
                  <InfoRow label="Release Date" value="12 Aug 2025" />
                </View>

                {/* Favorite Button */}
                <TouchableOpacity
                  onPress={toggleFav}
                  style={{
                    marginTop: 16,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <FontAwesome6
                    name="heart"
                    size={16}
                    color="#FF2D55"
                    solid={isFav}
                  />
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    {isFav ? "Saved to Favorites" : "Save to Favorites"}
                  </Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ── Purchase Sheet ── */}
      <PurchaseSheet
        visible={showPurchase}
        collection={collection}
        onClose={() => setShowPurchase(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Text style={{ color: "#888", fontSize: 13, width: 90 }}>{label}</Text>
      <Text style={{ color: "#888", fontSize: 13 }}>:</Text>
      <Text style={{ color: "#fff", fontSize: 13, flex: 1 }}>{value}</Text>
    </View>
  );
}
