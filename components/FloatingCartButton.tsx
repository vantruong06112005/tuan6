import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { useCart } from '../store/useCart';

type Props = {
  onPress?: () => void;
};

export default function FloatingCartButton({ onPress }: Props) {
  const { totalQuantity } = useCart();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.icon}>🛒</Text>

      {totalQuantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 26,
    color: '#FFF',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
