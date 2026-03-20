import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Collection } from "../constants/Data";

type Props = {
  visible: boolean;
  collection?: Collection;
  onClose: () => void;
  onSuccess: () => void;
};

const FEATURES = [
  "Full 8K resolution downloads",
  "Personal use license included",
  "All wallpapers in this pack",
  "Lifetime access — buy once",
];

export default function PurchaseSheet({
  visible,
  collection,
  onClose,
  onSuccess,
}: Props) {
  const insets = useSafeAreaInsets();

  const [showModal, setShowModal] = useState(visible);

  const translateY = useRef(new Animated.Value(300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // 🔥 HANDLE OPEN / CLOSE
  useEffect(() => {
    if (visible) {
      setShowModal(true);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 300,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false); // 👈 unmount AFTER animation
      });
    }
  }, [visible]);

  if (!showModal || !collection) return null;

  const handleBuy = () => {
    Alert.alert(
      "Confirm Purchase",
      `Buy "${collection.title}" for $${collection.price}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: `Buy $${collection.price}`, onPress: onSuccess },
      ],
    );
  };

  const handleClose = () => {
    onClose(); // parent will set visible=false → animation runs
  };

  return (
    <Modal transparent statusBarTranslucent>
      {/* 🔥 BACKDROP */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity,
          justifyContent: "flex-end",
        }}
      >
        {/* CLICK OUTSIDE */}
        <Pressable style={{ flex: 1 }} onPress={handleClose} />

        {/* 🔥 SHEET */}
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
        >
          <BlurView
            intensity={65}
            tint="dark"
            style={{
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                paddingHorizontal: 22,
                paddingTop: 20,
                paddingBottom: insets.bottom + 24,
                backgroundColor: "#111",
              }}
            >
              {/* HANDLE */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  alignSelf: "center",
                  marginBottom: 24,
                }}
              />

              {/* ICON + TITLE */}
              <View style={{ alignItems: "center", marginBottom: 22 }}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    backgroundColor: "#133240",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  <FontAwesome6 name="layer-group" size={28} color="#019CDF" />
                </View>

                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 20,
                    marginBottom: 6,
                  }}
                >
                  {collection.title}
                </Text>

                <Text style={{ color: "#888", fontSize: 13 }}>
                  {collection.wallpaperCount} premium 8K wallpapers
                </Text>
              </View>

              {/* FEATURES */}
              <View
                style={{
                  backgroundColor: "#222",
                  borderRadius: 25,
                  padding: 20,
                  marginBottom: 20,
                  gap: 12,
                }}
              >
                {FEATURES.map((feat) => (
                  <View
                    key={feat}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: "#133240",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome6 name="check" size={12} color="#019CDF" />
                    </View>

                    <Text style={{ color: "#fff", fontSize: 14 }}>{feat}</Text>
                  </View>
                ))}
              </View>

              {/* BUY BUTTON */}
              <TouchableOpacity
                onPress={handleBuy}
                style={{
                  height: 56,
                  borderRadius: 999,
                  backgroundColor: "#019CDF",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <FontAwesome6 name="bag-shopping" size={18} color="#fff" />
                <Text
                  style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}
                >
                  Buy Pack ${collection.price}
                </Text>
              </TouchableOpacity>

              {/* CANCEL */}
              <TouchableOpacity
                onPress={handleClose}
                style={{
                  height: 56,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#222",
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
