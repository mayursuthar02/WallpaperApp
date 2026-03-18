import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const [notif, setNotif] = useState(true);

  const logout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('onboarded');
          router.replace('/onboarding' as any);
        },
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1 bg-bg"
      style={{ paddingTop: insets.top }}
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Profile Card ── */}
      <View className="items-center pt-8 pb-6 px-5">
        <View
          className="w-16 h-16 rounded-full bg-card items-center justify-center mb-3"
          style={{ borderWidth: 2, borderColor: '#2ABFBF' }}
        >
          <Text style={{ color: '#fff', fontSize: 26, fontWeight: '800' }}>A</Text>
        </View>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
          Artifex Wallpaper
        </Text>
        <View className="flex-row items-center gap-1.5 mt-1 mb-1">
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={{ color: '#FFB800', fontSize: 12, fontWeight: '600' }}>
            Premium User
          </Text>
        </View>
        <Text style={{ color: '#888', fontSize: 12 }}>user@example.com</Text>
      </View>

      {/* ── Menu ── */}
      <MenuGroup>
        <MenuItem
          icon="layers-outline"
          label="My Collection"
          onPress={() => router.push('/my-collections' as any)}
        />
        <MenuItem
          icon="card-outline"
          label="Manage Subscription"
          onPress={() => router.push('/subscription' as any)}
          isLast
        />
      </MenuGroup>

      <SectionLabel label="Settings" />
      <MenuGroup>
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-row items-center gap-3">
            <Ionicons name="notifications-outline" size={20} color="#888" />
            <Text style={{ color: '#fff', fontSize: 14 }}>Notification Alerts</Text>
          </View>
          <Switch
            value={notif}
            onValueChange={setNotif}
            trackColor={{ true: '#2ABFBF', false: '#333' }}
            thumbColor="#ffffff"
          />
        </View>
      </MenuGroup>

      <SectionLabel label="Need Help?" />
      <MenuGroup>
        <MenuItem
          icon="help-circle-outline"
          label="FAQs"
          onPress={() => router.push('/faqs' as any)}
        />
        <MenuItem
          icon="alert-circle-outline"
          label="Report a Problem"
          onPress={() => Alert.alert('Report', 'Feature coming soon.')}
          isLast
        />
      </MenuGroup>

      <SectionLabel label="About" />
      <MenuGroup>
        <MenuItem
          icon="information-circle-outline"
          label="About Artifex Wallpaper"
          onPress={() => router.push('/about' as any)}
        />
        <MenuItem
          icon="shield-checkmark-outline"
          label="Privacy Policy"
          onPress={() => Alert.alert('Privacy Policy', 'Feature coming soon.')}
        />
        <MenuItem
          icon="document-text-outline"
          label="Terms of Service"
          onPress={() => Alert.alert('Terms', 'Feature coming soon.')}
          isLast
        />
      </MenuGroup>

      <SectionLabel label="Version" />
      <View className="px-5 py-2">
        <Text style={{ color: '#888', fontSize: 13 }}>Version 1.0.2</Text>
      </View>

      <TouchableOpacity onPress={logout} className="px-5 mt-6 pb-2">
        <Text style={{ color: '#FF3B30', fontSize: 14, fontWeight: '600' }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <Text
      style={{
        color: '#2ABFBF',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 8,
      }}
    >
      {label}
    </Text>
  );
}

function MenuGroup({ children }: { children: React.ReactNode }) {
  return (
    <View
      className="mx-5 overflow-hidden"
      style={{ backgroundColor: '#1C1C1E', borderRadius: 16 }}
    >
      {children}
    </View>
  );
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
      className="flex-row items-center justify-between px-5 py-4"
      style={!isLast ? { borderBottomWidth: 1, borderBottomColor: '#2A2A2A' } : {}}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={20} color="#888" />
        <Text style={{ color: '#fff', fontSize: 14 }}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#444" />
    </TouchableOpacity>
  );
}
