import { useAuthStore } from "@/src/store/authStore";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const [notif, setNotif] = useState(true);
  const { signOut } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  // const signOut = useAuthStore((state) => state.signOut);

  return (
    <View style={{ flex: 1, backgroundColor: "#111", paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card ── */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 16,
            marginBottom: 10,
            padding: 20,
            borderRadius: 16,
            backgroundColor: "#181818",
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* Logo / Avatar */}
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: "#111",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              // source={require("../../../assets/images/appIcon.png")}
              source={
                user?.avatar_url
                  ? { uri: user.avatar_url }
                  : require("../../../assets/images/appIcon.png")
              }
              style={{ width: 70, height: 70 }}
              contentFit="cover"
            />
          </View>

          {/* Text Content */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 23,
              }}
            >
              {user?.full_name || "Guest"}
            </Text>

            {/* Premium Row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginTop: 4,
              }}
            >
              <FontAwesome6 name="bookmark" size={12} color="#FFA600" solid />
              <Text
                style={{
                  color: "#FFA600",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Premium User
              </Text>
            </View>

            {/* Expiry */}
            <Text
              style={{
                color: "#444444",
                fontSize: 12,
                marginTop: 5,
              }}
            >
              Expire Date: 30-10-2025
            </Text>
          </View>
        </View>

        {/* ── Menu ── */}
        <MenuGroup>
          <MenuItem
            icon="layers-outline"
            label="My Collection"
            onPress={() => router.push("/my-collections" as any)}
          />
          {/* <MenuItem
          icon="card-outline"
          label="Manage Subscription"
          onPress={() => router.push("/subscription" as any)}
          isLast
        /> */}
        </MenuGroup>

        <SectionLabel label="Settings" />
        <MenuGroup>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 14,
              borderBottomWidth: 0.5,
              borderBottomColor: "#2A2A2A",
              // marginHorizontal: 20,
            }}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications-outline" size={20} color="#888" />
              <Text style={{ color: "#fff", fontSize: 14 }}>
                Notification Alerts
              </Text>
            </View>
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ true: "#019CDF", false: "#333" }}
              thumbColor="#ffffff"
            />
          </View>
        </MenuGroup>

        <SectionLabel label="Need Help?" />
        <MenuGroup>
          <MenuItem
            icon="help-circle-outline"
            label="FAQs"
            onPress={() => router.push("/faqs" as any)}
          />
          <MenuItem
            icon="alert-circle-outline"
            label="Report a Problem"
            onPress={() => Alert.alert("Report", "Feature coming soon.")}
            isLast
          />
        </MenuGroup>

        <SectionLabel label="About" />
        <MenuGroup>
          <MenuItem
            icon="information-circle-outline"
            label="About Wallbit"
            onPress={() => router.push("/about" as any)}
          />
          <MenuItem
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() =>
              Alert.alert("Privacy Policy", "Feature coming soon.")
            }
          />
          <MenuItem
            icon="document-text-outline"
            label="Terms of Service"
            onPress={() => Alert.alert("Terms", "Feature coming soon.")}
            isLast
          />
        </MenuGroup>

        <SectionLabel label="Version" />
        <View className="px-5 py-2">
          <Text style={{ color: "#888", fontSize: 13 }}>Version 1.0.2</Text>
        </View>

        <TouchableOpacity onPress={signOut} className="px-5 mt-6 pb-2">
          <Text style={{ color: "#FF2D55", fontSize: 15, fontWeight: "600" }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <Text
      style={{
        color: "#019CDF",
        fontSize: 15,
        fontWeight: "600",
        paddingHorizontal: 20,
        marginTop: 24,
        marginBottom: 6,
      }}
    >
      {label}
    </Text>
  );
}

function MenuGroup({ children }: { children: React.ReactNode }) {
  return <View style={{ marginHorizontal: 20 }}>{children}</View>;
}

function MenuItem({
  icon,
  label,
  onPress,
  isLast = false,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: isLast ? 0 : 0.5,
        borderBottomColor: "#222",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Ionicons name={icon} size={20} color="#888" />
        <Text style={{ color: "#fff", fontSize: 16 }}>{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color="#444" />
    </TouchableOpacity>
  );
}
