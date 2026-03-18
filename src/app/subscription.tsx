import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: 'Rs. 410.00',
    period: '/ Month',
    perks: [
      'Full Access to All Wallpapers',
      'Access Premium Collections',
      '30 Downloads / Month',
    ],
  },
  {
    id: 'annual',
    label: 'Annual',
    price: 'Rs. 1,509.00',
    period: '/ Year',
    perks: [
      'Full Access to All Wallpapers',
      'Access Premium Collections',
      '250 Downloads / Year',
    ],
  },
];

export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('monthly');

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
          Manage Subscription
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 140,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 32, marginTop: 16, marginBottom: 8 }}>
          Unlock Premium
        </Text>
        <Text style={{ color: '#888', fontSize: 14, lineHeight: 22, marginBottom: 28 }}>
          Access all 4K &amp; 8K wallpapers, exclusive packs, and more.
        </Text>

        <Text
          style={{
            color: '#2ABFBF',
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          Subscription Plan
        </Text>

        {PLANS.map((plan) => {
          const isSelected = selected === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelected(plan.id)}
              style={{
                backgroundColor: isSelected ? 'rgba(42,191,191,0.1)' : '#1C1C1E',
                borderRadius: 20,
                padding: 20,
                marginBottom: 14,
                borderWidth: 2,
                borderColor: isSelected ? '#2ABFBF' : 'transparent',
              }}
            >
              {/* Plan header */}
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>
                    {plan.label} — {plan.price}
                  </Text>
                  <Text style={{ color: '#888', fontSize: 13, marginTop: 2 }}>
                    {plan.period}
                  </Text>
                </View>
                {isSelected && (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: '#2ABFBF',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="checkmark" size={15} color="#fff" />
                  </View>
                )}
              </View>

              {/* Perks */}
              {plan.perks.map((perk) => (
                <View
                  key={perk}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}
                >
                  <Ionicons name="checkmark-circle" size={16} color="#2ABFBF" />
                  <Text style={{ color: '#fff', fontSize: 13 }}>{perk}</Text>
                </View>
              ))}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Subscribe Button ── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
          paddingTop: 14,
          backgroundColor: '#111111',
          borderTopWidth: 1,
          borderTopColor: '#2A2A2A',
        }}
      >
        <TouchableOpacity
          onPress={() => Alert.alert('Subscribe', 'Payment integration coming soon!')}
          style={{
            height: 56,
            borderRadius: 999,
            backgroundColor: '#2ABFBF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
