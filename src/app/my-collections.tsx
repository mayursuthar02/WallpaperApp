import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTIONS } from '../constants/Data';

const { width } = Dimensions.get('window');

export default function MyCollectionsScreen() {
  const insets = useSafeAreaInsets();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('purchased').then((v) => {
        if (v) setPurchasedIds(JSON.parse(v));
      });
    }, [])
  );

  const myCollections = COLLECTIONS.filter((c) => purchasedIds.includes(c.id));

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
          My Collections
        </Text>
      </View>

      {myCollections.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Ionicons name="layers-outline" size={52} color="#333" />
          <Text
            style={{
              color: '#888',
              fontSize: 15,
              textAlign: 'center',
              marginTop: 16,
              lineHeight: 24,
            }}
          >
            You haven't purchased{'\n'}any collections yet.
          </Text>
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/collections' as any)}
            style={{
              marginTop: 24,
              paddingHorizontal: 28,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: '#2ABFBF',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
              Browse Collections
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={myCollections}
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
                width: width - 40,
                height: 140,
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
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={{
                  position: 'absolute',
                  inset: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>
                  {item.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
