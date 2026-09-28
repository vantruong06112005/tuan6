import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../navigation/HomeStack';
import { useCart } from '../store/cartStore';
import FloatingCartButton from '../components/FloatingCartButton';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'HomeMain'
>;

type Book = {
  id: string;
  title: string;
  price: number;
};

const books: Book[] = [
  {
    id: 'book-001',
    title: 'Đắc Nhân Tâm',
    price: 86000,
  },
  {
    id: 'book-002',
    title: 'Nhà Giả Kim',
    price: 79000,
  },
  {
    id: 'book-003',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    price: 90000,
  },
];

export default function HomeScreen({
  navigation,
}: Props) {
  const { addToCart } = useCart();

  const handleBookPress = (bookId: string) => {
    navigation.navigate('BookDetail', {
      bookId,
    });
  };

  const handleAddToCart = (book: Book) => {
    addToCart({
      bookId: book.id,
      title: book.title,
      price: book.price,
    });
  };

  const renderBook = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleBookPress(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.price}>
          {item.price.toLocaleString('vi-VN')}đ
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>+ Giỏ hàng</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sách nổi bật</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={styles.list}
      />

      <FloatingCartButton onPress={() => navigation.navigate('CartMain')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },

  list: {
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
  },

  price: {
    marginTop: 8,
    color: '#FF6B35',
    fontWeight: '700',
  },

  addButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
