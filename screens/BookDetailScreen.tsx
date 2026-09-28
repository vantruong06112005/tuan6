import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { HomeStackParamList } from '../navigation/HomeStack';
import type { MainTabParamList } from '../navigation/MainTabNavigator';
import { BOOKS } from '../data/books';
import { useCart } from '../store/useCart';
import FloatingCartButton from '../components/FloatingCartButton';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'BookDetail'>,
  BottomTabScreenProps<MainTabParamList>
>;

export default function BookDetailScreen({ route, navigation }: Props) {
  const { bookId } = route.params;
  const { addToCart, getItemQuantity } = useCart();

  const book = BOOKS.find((b) => b.id === bookId);
  const qtyInCart = getItemQuantity(bookId);

  if (!book) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Không tìm thấy sách ({bookId})</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      bookId: book.id,
      title: book.title,
      price: book.price,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.bookCover}>
          <Text style={styles.bookCoverIcon}>📖</Text>
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>
        <Text style={styles.price}>
          {book.price.toLocaleString('vi-VN')}đ
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Mô tả nội dung</Text>
        <Text style={styles.description}>{book.description}</Text>

        {qtyInCart > 0 && (
          <View style={styles.inCartNotice}>
            <Text style={styles.inCartText}>
              ✓ Đang có {qtyInCart} cuốn trong giỏ hàng
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </ScrollView>

      <FloatingCartButton onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#888',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  bookCover: {
    height: 180,
    backgroundColor: '#FFE8DC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookCoverIcon: {
    fontSize: 64,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  author: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    marginBottom: 24,
  },
  inCartNotice: {
    backgroundColor: '#E6F4EA',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  inCartText: {
    color: '#137333',
    fontWeight: '600',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
