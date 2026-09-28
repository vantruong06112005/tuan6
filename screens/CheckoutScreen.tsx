import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { CartStackParamList } from '../navigation/CartStack';
import type { MainTabParamList } from '../navigation/MainTabNavigator';
import { useCart } from '../store/useCart';

type Props = CompositeScreenProps<
  NativeStackScreenProps<CartStackParamList, 'Checkout'>,
  BottomTabScreenProps<MainTabParamList>
>;

export default function CheckoutScreen({ route, navigation }: Props) {
  const { total } = route.params;
  const { clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const handleConfirmOrder = () => {
    Alert.alert(
      'Đặt hàng thành công!',
      `Cảm ơn bạn đã mua hàng. Đơn hàng trị giá ${total.toLocaleString('vi-VN')}đ đã được ghi nhận.`,
      [
        {
          text: 'Về trang chủ',
          onPress: () => {
            clearCart();
            setOrdered(true);
            navigation.navigate('Home');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📦</Text>
      <Text style={styles.title}>Xác nhận thanh toán</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Tổng số tiền cần thanh toán:</Text>
        <Text style={styles.total}>
          {total.toLocaleString('vi-VN')}đ
        </Text>
        <Text style={styles.method}>Hình thức: Thanh toán khi nhận hàng (COD)</Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmOrder}
        activeOpacity={0.8}
        disabled={ordered}
      >
        <Text style={styles.confirmButtonText}>Xác nhận đặt hàng</Text>
      </TouchableOpacity>
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
  icon: {
    fontSize: 54,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  total: {
    fontSize: 24,
    color: '#FF6B35',
    fontWeight: '700',
    marginBottom: 12,
  },
  method: {
    fontSize: 13,
    color: '#888',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
