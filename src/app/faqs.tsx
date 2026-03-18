import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const FAQS = [
  {
    id: '1',
    q: 'How do I download wallpapers?',
    a: 'Tap any wallpaper and press Download or Set Wallpaper.',
  },
  {
    id: '2',
    q: 'Why is my download limit restricted?',
    a: 'Free users have a limited number of downloads per month. Upgrade to Premium for unlimited downloads.',
  },
  {
    id: '3',
    q: 'Can I use the wallpapers after my subscription ends?',
    a: 'Wallpapers you downloaded during your subscription remain on your device. However, you will lose access to premium wallpapers in the app until you renew.',
  },
  {
    id: '4',
    q: 'How often do you add new wallpapers?',
    a: 'We add new collections and wallpapers regularly. Follow us on social media to stay updated with the latest drops.',
  },
  {
    id: '5',
    q: 'Can I use wallpapers commercially?',
    a: 'No. All wallpapers are for personal use only. No commercial use is allowed. Credits are required when sharing in setup photos.',
  },
  {
    id: '6',
    q: 'How do I cancel my subscription?',
    a: 'You can cancel anytime through your device\'s subscription settings (App Store or Play Store). Your access continues until the end of the billing period.',
  },
];

export default function FAQsScreen() {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

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
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>FAQs</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 60,
          gap: 10,
        }}
      >
        {FAQS.map((faq, index) => {
          const isOpen = expanded === faq.id;
          return (
            <TouchableOpacity
              key={faq.id}
              onPress={() => toggle(faq.id)}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#1C1C1E',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: isOpen ? '#2ABFBF' : 'transparent',
              }}
            >
              <View className="flex-row items-center justify-between">
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '600',
                    flex: 1,
                    paddingRight: 8,
                    lineHeight: 20,
                  }}
                >
                  {index + 1}. {faq.q}
                </Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={isOpen ? '#2ABFBF' : '#555'}
                />
              </View>

              {isOpen && (
                <Text
                  style={{
                    color: '#888',
                    fontSize: 13,
                    lineHeight: 21,
                    marginTop: 10,
                  }}
                >
                  {faq.a}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
