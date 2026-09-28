import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { CartStackParamList } from '../navigation/CartStack';

type Props = NativeStackScreenProps<
  CartStackParamList,
  'Checkout'
>;

export default function CheckoutScreen({ route }: Props) {
  const { total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      <Text style={styles.total}>
        Tổng tiền: {total.toLocaleString('vi-VN')}đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  total: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '600',
  },
});
