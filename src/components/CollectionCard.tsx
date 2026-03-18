import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Collection } from '../constants/Data';

type Props = {
  item: Collection;
  onPress: () => void;
  /** 'small' = horizontal list card (default), 'large' = banner width */
  size?: 'small' | 'large';
  cardWidth?: number;
};

export default function CollectionCard({
  item,
  onPress,
  size = 'small',
  cardWidth,
}: Props) {
  const W = cardWidth ?? (size === 'large' ? 320 : 176);
  const H = size === 'large' ? 140 : 112;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: W,
        height: H,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Cover */}
      <Image
        source={item.coverImage}
        style={{ width: W, height: H }}
        resizeMode="cover"
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.72)']}
        style={{
          position: 'absolute',
          inset: 0,
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <Text
          style={{ color: '#fff', fontWeight: '700', fontSize: size === 'large' ? 16 : 13 }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
            {item.wallpaperCount} wallpapers
          </Text>
          {!item.isPremium ? (
            <View
              style={{
                backgroundColor: 'rgba(42,191,191,0.25)',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: '#2ABFBF', fontSize: 10, fontWeight: '600' }}>Free</Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
                ${item.price}
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Premium badge top-right */}
      {item.isPremium && (
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 999,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Ionicons name="star" size={9} color="#FFB800" />
          <Text style={{ color: '#FFB800', fontSize: 10, fontWeight: '700' }}>Premium</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
