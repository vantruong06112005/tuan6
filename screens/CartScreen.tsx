import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CartStackParamList } from '../navigation/CartStack';
import { useCart } from '../store/cartStore';

type Props = NativeStackScreenProps<
  CartStackParamList,
  'CartMain'
>;

export default function CartScreen({ navigation }: Props) {
  const { items, totalAmount, totalQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>

      {items.length === 0 ? (
        <Text style={styles.empty}>Chưa có sản phẩm</Text>
      ) : (
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.bookId} style={styles.itemRow}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemText}>
                {item.quantity} x {item.price.toLocaleString('vi-VN')}đ
              </Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.total}>
        Tổng: {totalAmount.toLocaleString('vi-VN')}đ
      </Text>
      <Text style={styles.totalQuantity}>
        Số lượng: {totalQuantity}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Checkout', { total: totalAmount })}
        disabled={items.length === 0}
      >
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    width: '100%',
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  total: {
    fontSize: 20,
    color: '#FF6B35',
    fontWeight: '700',
    marginBottom: 8,
  },
  totalQuantity: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
