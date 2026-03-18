import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLLECTIONS } from '../constants/Data';

const { width } = Dimensions.get('window');
const CARD_W = width - 40;

export default function AllCollectionsScreen() {
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
          Free / Premium Collections
        </Text>
      </View>

      {/* ── List ── */}
      <FlatList
        data={COLLECTIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 40,
          gap: 14,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/collection/${item.id}` as any)}
            activeOpacity={0.85}
            style={{
              width: CARD_W,
              height: 130,
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            <Image
              source={item.coverImage}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.72)']}
              style={{
                position: 'absolute',
                inset: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
                {item.title}
              </Text>
              {item.isPremium && (
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 999,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Ionicons name="star" size={10} color="#FFB800" />
                  <Text style={{ color: '#FFB800', fontSize: 11, fontWeight: '700' }}>
                    Premium
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
