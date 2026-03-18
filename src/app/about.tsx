import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: insets.top }}>

      {/* ── Header ── */}
      <View className="flex-row items-center gap-3 px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#1C1C1E',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>
          About Artifex Wallpaper
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 60 }}
      >
        {/* Logo */}
        <View className="items-center mb-8">
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: '#1C1C1E',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 30, fontWeight: '900' }}>A</Text>
          </View>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
            Artifex Wallpaper
          </Text>
        </View>

        {/* Description */}
        <Section title={null}>
          <Text style={{ color: '#aaa', fontSize: 14, lineHeight: 22 }}>
            Artifex Wallpaper brings you a curated collection of stunning 4K &amp; 8K digital artworks designed to personalise
            your home and lock screens. Our mission is to make personalisation effortless with high-quality wallpapers,
            premium collections, and a smooth browsing experience.
          </Text>
        </Section>

        {/* Credits */}
        <SectionLabel label="Credits" />
        <Section title={null}>
          <InfoRow label="Built by" value="Artifex Wall" />
          <Text style={{ color: '#888', fontSize: 13, marginTop: 6, lineHeight: 20 }}>
            Designed with attention to detail and passion for creativity.
          </Text>
        </Section>

        {/* Contact Support */}
        <SectionLabel label="Contact Support" />
        <Section title={null}>
          <Text style={{ color: '#aaa', fontSize: 14, lineHeight: 22, marginBottom: 8 }}>
            For questions, issues, or feedback, feel free to contact us at:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@artifexwallpaper.com')}>
            <Text style={{ color: '#2ABFBF', fontSize: 14, fontWeight: '500' }}>
              support@artifexwallpaper.com ↗
            </Text>
          </TouchableOpacity>
        </Section>

        {/* Follow Us */}
        <SectionLabel label="Follow Us" />
        <Section title={null}>
          <Text style={{ color: '#aaa', fontSize: 13, lineHeight: 21, marginBottom: 10 }}>
            Stay updated with new releases, exclusive drops, and behind-the-scenes artwork.
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://instagram.com/artifexwallpaper')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}
          >
            <Ionicons name="logo-instagram" size={16} color="#2ABFBF" />
            <Text style={{ color: '#2ABFBF', fontSize: 13 }}>@artifexwallpaper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://x.com/artifexwall')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <Ionicons name="logo-twitter" size={16} color="#2ABFBF" />
            <Text style={{ color: '#2ABFBF', fontSize: 13 }}>@artifexwall</Text>
          </TouchableOpacity>
        </Section>
      </ScrollView>
    </View>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <Text
      style={{
        color: '#2ABFBF',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.1,
        textTransform: 'uppercase',
        marginTop: 22,
        marginBottom: 10,
      }}
    >
      {label}
    </Text>
  );
}

function Section({ title, children }: { title: string | null; children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 16,
      }}
    >
      {title && (
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15, marginBottom: 8 }}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
      <Text style={{ color: '#888', fontSize: 13, width: 70 }}>{label}</Text>
      <Text style={{ color: '#888', fontSize: 13 }}>:</Text>
      <Text style={{ color: '#fff', fontSize: 13, flex: 1 }}>{value}</Text>
    </View>
  );
}
