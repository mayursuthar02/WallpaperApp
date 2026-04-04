import * as FileSystem from "expo-file-system/legacy";
// import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

import { getImageSource } from "@/src/utils/image";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  Image as RNImage,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WALLPAPERS } from "../../constants/Data";

const { width, height } = Dimensions.get("window");

export default function WallpaperDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [showInfo, setShowInfo] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [showApply, setShowApply] = useState(false);

  const wallpaper = WALLPAPERS.find((w) => w.id === id);
  // Animation
  const sheetY = useState(new Animated.Value(height))[0];
  const imageScale = useState(new Animated.Value(1))[0];
  const imageY = useState(new Animated.Value(0))[0];

  // BottomSheet Open
  const openSheet = () => {
    setShowInfo(true);

    Animated.parallel([
      Animated.spring(sheetY, {
        toValue: height * 0.55,
        useNativeDriver: true,
      }),
      Animated.spring(imageY, {
        toValue: -60, // 👈 move image UP (adjust this)
        useNativeDriver: true,
      }),
    ]).start();
  };
  // BottomSheet Close
  const closeSheet = () => {
    Animated.parallel([
      Animated.spring(sheetY, {
        toValue: height,
        useNativeDriver: true,
      }),
      Animated.spring(imageY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => setShowInfo(false));
  };

  useFocusEffect(
    useCallback(() => {
      if (!wallpaper) return;
      AsyncStorage.getItem("favorites").then((v) => {
        if (v) setIsFav(JSON.parse(v).includes(wallpaper.id));
      });
    }, [wallpaper]),
  );

  if (!wallpaper) return null;

  const toggleFav = async () => {
    const v = await AsyncStorage.getItem("favorites");
    const arr: string[] = v ? JSON.parse(v) : [];
    const next = arr.includes(wallpaper.id)
      ? arr.filter((f) => f !== wallpaper.id)
      : [...arr, wallpaper.id];

    await AsyncStorage.setItem("favorites", JSON.stringify(next));
    setIsFav(!isFav);
  };

  const getPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow storage permission to download wallpaper",
      );
      return false;
    }

    return true;
  };

  // Download Wallpaper Feature
  // const downloadWallpaper = async () => {
  //   try {
  //     const hasPermission = await getPermission();
  //     if (!hasPermission) return;

  //     let uri = wallpaper.image;

  //     if (typeof uri !== "string") {
  //       const asset = RNImage.resolveAssetSource(uri);
  //       uri = asset.uri;
  //     }

  //     console.log("LOCAL URI:", uri);

  //     const asset = await MediaLibrary.createAssetAsync(uri);
  //     await MediaLibrary.createAlbumAsync("Wallpaper", asset, false);

  //     Alert.alert("Success ✅", "Wallpaper saved!");
  //   } catch (e: any) {
  //     console.log("ERROR:", e);
  //     Alert.alert("Error", e?.message || "Failed");
  //   }
  // };

  const downloadWallpaper = async () => {
    try {
      const hasPermission = await getPermission();
      if (!hasPermission) return;

      let uri = wallpaper.image;

      // handle local image
      if (typeof uri !== "string") {
        const asset = RNImage.resolveAssetSource(uri);
        uri = asset.uri;
      }

      // 👉 FIX: create proper file with extension
      const fileUri = FileSystem.cacheDirectory + `wallpaper_${Date.now()}.jpg`;

      // 👉 download first
      const downloaded = await FileSystem.downloadAsync(uri, fileUri);

      console.log("Downloaded URI:", downloaded.uri);

      // 👉 now save to gallery
      const asset = await MediaLibrary.createAssetAsync(downloaded.uri);

      await MediaLibrary.createAlbumAsync("Wallpaper", asset, false);

      Alert.alert("Success ✅", "Wallpaper saved!");
    } catch (e: any) {
      console.log("ERROR:", e);
      Alert.alert("Error", e?.message || "Failed");
    }
  };

  // Apply wallpaper Feature Dev
  const applyWallpaper = async () => {
    try {
      let uri = wallpaper.image;

      if (typeof uri !== "string") {
        const asset = RNImage.resolveAssetSource(uri);
        uri = asset.uri;
      }

      // Save file
      const fileUri = FileSystem.cacheDirectory + `wallpaper_${Date.now()}.jpg`;

      const downloaded = await FileSystem.downloadAsync(uri, fileUri);

      // 🔥 Convert to content URI (FIX)
      const contentUri = await FileSystem.getContentUriAsync(downloaded.uri);

      await IntentLauncher.startActivityAsync(
        "android.intent.action.ATTACH_DATA",
        {
          data: contentUri, // ✅ IMPORTANT
          type: "image/*",
          flags: 3,
          extra: {
            "android.intent.extra.STREAM": contentUri,
          },
        },
      );
    } catch (e) {
      console.log("APPLY ERROR:", e);
      Alert.alert("Error", "Failed to open wallpaper chooser");
    }
  };

  // Apply Wallpaper for APK
  // const applyWallpaper = async () => {
  //   try {
  //     let uri = wallpaper.image;

  //     if (typeof uri !== "string") {
  //       const asset = RNImage.resolveAssetSource(uri);
  //       uri = asset.uri;
  //     }

  //     const contentUri = await FileSystem.getContentUriAsync(uri);

  //     await IntentLauncher.startActivityAsync(
  //       "android.intent.action.ATTACH_DATA",
  //       {
  //         data: contentUri,
  //         type: "image/*",
  //         flags: 1,
  //       },
  //     );
  //   } catch (e: any) {
  //     console.log("ERROR:", e);
  //     Alert.alert("Error", e?.message || "Failed");
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      {/* ── Full Screen Image ── */}
      <Animated.Image
        source={getImageSource(wallpaper.image)}
        style={{
          width,
          height,
          transform: [{ translateY: imageY }],
        }}
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

      {/* ── Bottom Actions ── */}
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
        {/* Info */}
        <TouchableOpacity
          onPress={openSheet}
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

        {/* Download (COMMON) */}
        <TouchableOpacity
          onPress={downloadWallpaper}
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

        {/* 🔥 ONLY ANDROID */}
        {Platform.OS === "android" && (
          <TouchableOpacity
            onPress={() => applyWallpaper()}
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
        )}
      </View>

      {/* ── Info Bottom Sheet ── */}
      {showInfo && (
        <Animated.View
          pointerEvents={showInfo ? "auto" : "none"}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height,
            transform: [{ translateY: sheetY }],
          }}
        >
          <BlurView
            intensity={80}
            tint="dark"
            style={{
              flex: 1,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              overflow: "hidden",
              backgroundColor: "#111",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeSheet}
              style={{ flex: 1 }}
            >
              <View style={{ padding: 20, paddingTop: 12 }}>
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

                {/* 🔥 NEW TOP ROW (like your design) */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#222",
                      gap: 5,
                    }}
                    className="rounded-full px-4 py-2"
                  >
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        backgroundColor: "#222",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/appIcon.png")}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        contentFit="cover"
                      />
                    </View>

                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: 14,
                      }}
                    >
                      Wallbit
                    </Text>

                    <FontAwesome6
                      name="circle-check"
                      size={15}
                      color="#019CDF"
                      solid
                    />
                  </View>

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {/* Views */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: "#222",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: "#00BFFF",
                          fontSize: 13,
                          fontWeight: "600",
                        }}
                      >
                        {wallpaper.views}
                      </Text>
                      <FontAwesome6 name="eye" size={12} color="#00BFFF" />
                    </View>

                    {/* Likes */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: "#222",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FF2D55",
                          fontSize: 13,
                          fontWeight: "600",
                        }}
                      >
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
                    backgroundColor: "#222",
                    borderRadius: 20,
                    padding: 18,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "700",
                      marginBottom: 14,
                    }}
                  >
                    INFO
                  </Text>

                  <InfoRow
                    label="Collection"
                    value={wallpaper.collectionName}
                  />
                  <InfoRow label="Dimensions" value={wallpaper.dimensions} />
                  <InfoRow label="License" value={wallpaper.license} />
                </View>

                {/* Favorite */}
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
                  <Text
                    style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}
                  >
                    {isFav ? "Saved to Favorites" : "Save to Favorites"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </BlurView>
        </Animated.View>
      )}

      {/* Apply Wallpaper */}
      {Platform.OS === "android" && showApply && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#111",
            padding: 20,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
            Apply Wallpaper
          </Text>

          {["Home Screen", "Lock Screen", "Both"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => {
                Alert.alert("Coming Soon 🚀");
                setShowApply(false);
              }}
              style={{
                paddingVertical: 14,
                marginTop: 12,
                backgroundColor: "#222",
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }} className="mb-1">
      <Text style={{ color: "#888", fontSize: 15, width: 90 }}>{label}</Text>
      <Text style={{ color: "#888", fontSize: 15 }}>:</Text>
      <Text style={{ color: "#fff", fontSize: 15, flex: 1 }}>{value}</Text>
    </View>
  );
}
