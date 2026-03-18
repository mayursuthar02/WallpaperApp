import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WALLPAPERS } from '../../constants/Data';
import WallpaperCard from '../../components/WallpaperCard';

type Filter = 'All' | 'Free' | 'Premium';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const [favIds, setFavIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>('All');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('favorites').then((v) => {
        if (v) setFavIds(JSON.parse(v));
        else setFavIds([]);
      });
    }, [])
  );

  const toggleFav = async (id: string) => {
    const next = favIds.filter((f) => f !== id);
    setFavIds(next);
    await AsyncStorage.setItem('favorites', JSON.stringify(next));
  };

  const favWallpapers = WALLPAPERS.filter((w) => {
    if (!favIds.includes(w.id)) return false;
    if (filter === 'Free') return w.isFree;
    if (filter === 'Premium') return !w.isFree;
    return true;
  });

  const FILTERS: Filter[] = ['All', 'Free', 'Premium'];

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: insets.top }}>

      {/* ── Header ── */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
          Artifex Wallpaper
        </Text>
        <Ionicons name="search-outline" size={22} color="#fff" />
      </View>

      {/* ── Filter Chips ── */}
      <View className="flex-row px-5 gap-2 mb-4">
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 7,
              borderRadius: 999,
              backgroundColor: filter === f ? '#2ABFBF' : '#1C1C1E',
            }}
          >
            <Text
              style={{
                color: filter === f ? '#fff' : '#888',
                fontWeight: '600',
                fontSize: 13,
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Content ── */}
      {favWallpapers.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text
            style={{
              color: '#888',
              fontSize: 15,
              textAlign: 'center',
              lineHeight: 24,
            }}
          >
            Looks empty! Add some{'\n'}wallpapers you love
          </Text>
        </View>
      ) : (
        <FlatList
          data={favWallpapers}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 110,
            gap: 12,
          }}
          columnWrapperStyle={{ gap: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WallpaperCard
              item={item}
              isFav={favIds.includes(item.id)}
              onFav={() => toggleFav(item.id)}
              onPress={() => router.push(`/wallpaper/${item.id}` as any)}
            />
          )}
        />
      )}
    </View>
  );
}
