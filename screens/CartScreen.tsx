import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { CartStackParamList } from '../navigation/CartStack';
import type { MainTabParamList } from '../navigation/MainTabNavigator';
import { useCart } from '../store/useCart';

type Props = CompositeScreenProps<
  NativeStackScreenProps<CartStackParamList, 'CartMain'>,
  BottomTabScreenProps<MainTabParamList>
>;

export default function CartScreen({ navigation }: Props) {
  const {
    items,
    totalAmount,
    totalQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleClearCart = () => {
    Alert.alert(
      'Xóa giỏ hàng',
      'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi giỏ hàng?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: clearCart },
      ],
    );
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout', { total: totalAmount });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giỏ hàng ({totalQuantity})</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng của bạn đang trống</Text>
          <Text style={styles.emptySubtitle}>
            Hãy chọn những cuốn sách yêu thích từ danh mục nhé!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreButtonText}>Khám phá sách</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View key={item.bookId} style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>
                    {item.price.toLocaleString('vi-VN')}đ
                  </Text>
                  <Text style={styles.subtotalText}>
                    Tạm tính:{' '}
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </Text>
                </View>

                <View style={styles.actionColumn}>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.bookId)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.removeBtnText}>✕</Text>
                  </TouchableOpacity>

                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() =>
                        updateQuantity(item.bookId, item.quantity - 1)
                      }
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() =>
                        updateQuantity(item.bookId, item.quantity + 1)
                      }
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tổng số lượng:</Text>
              <Text style={styles.summaryValue}>{totalQuantity} cuốn</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
              <Text style={styles.totalAmount}>
                {totalAmount.toLocaleString('vi-VN')}đ
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.8}
            >
              <Text style={styles.checkoutButtonText}>
                Tiến hành thanh toán
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  clearText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  exploreButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  scrollList: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    marginBottom: 4,
  },
  subtotalText: {
    fontSize: 12,
    color: '#888',
  },
  actionColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginBottom: 12,
    padding: 4,
  },
  removeBtnText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '700',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  qtyButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  qtyText: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  totalAmount: {
    fontSize: 20,
    color: '#FF6B35',
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
