import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Collection } from '../constants/Data';

type Props = {
  visible: boolean;
  collection?: Collection;
  onClose: () => void;
  onSuccess: () => void;
};

const FEATURES = [
  'Full 8K resolution downloads',
  'Personal use license included',
  'All wallpapers in this pack',
  'Lifetime access — buy once',
];

export default function PurchaseSheet({
  visible,
  collection,
  onClose,
  onSuccess,
}: Props) {
  const insets = useSafeAreaInsets();

  if (!collection) return null;

  const handleBuy = () => {
    // 👉 Wire your real payment SDK here (e.g. RevenueCat, Stripe, etc.)
    Alert.alert(
      'Confirm Purchase',
      `Buy "${collection.title}" for $${collection.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Buy $${collection.price}`,
          onPress: onSuccess,
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.55)',
          justifyContent: 'flex-end',
        }}
      >
        <Pressable onPress={() => {}}>
          <BlurView
            intensity={65}
            tint="dark"
            style={{
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                paddingHorizontal: 22,
                paddingTop: 20,
                paddingBottom: insets.bottom + 24,
              }}
            >
              {/* Handle */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  alignSelf: 'center',
                  marginBottom: 24,
                }}
              />

              {/* Icon + title */}
              <View style={{ alignItems: 'center', marginBottom: 22 }}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    backgroundColor: 'rgba(42,191,191,0.15)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Ionicons name="layers-outline" size={30} color="#2ABFBF" />
                </View>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20, marginBottom: 6 }}>
                  {collection.title}
                </Text>
                <Text style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>
                  {collection.wallpaperCount} premium 8K wallpapers
                </Text>
              </View>

              {/* Features list */}
              <View
                style={{
                  backgroundColor: 'rgba(28,28,30,0.6)',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 20,
                  gap: 12,
                }}
              >
                {FEATURES.map((feat) => (
                  <View
                    key={feat}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: 'rgba(42,191,191,0.18)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="checkmark" size={13} color="#2ABFBF" />
                    </View>
                    <Text style={{ color: '#fff', fontSize: 14 }}>{feat}</Text>
                  </View>
                ))}
              </View>

              {/* Buy button */}
              <TouchableOpacity
                onPress={handleBuy}
                style={{
                  height: 56,
                  borderRadius: 999,
                  backgroundColor: '#2ABFBF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <Ionicons name="bag-outline" size={20} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                  Buy Pack  ${collection.price}
                </Text>
              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity
                onPress={onClose}
                style={{
                  height: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#888', fontSize: 14 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
