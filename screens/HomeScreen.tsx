import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { HomeStackParamList } from '../navigation/HomeStack';
import type { MainTabParamList } from '../navigation/MainTabNavigator';
import { useCart } from '../store/useCart';
import FloatingCartButton from '../components/FloatingCartButton';
import { BOOKS, Book } from '../data/books';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeMain'>,
  BottomTabScreenProps<MainTabParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { addToCart, getItemQuantity } = useCart();

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
    const qtyInCart = getItemQuantity(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleBookPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.price}>
            {item.price.toLocaleString('vi-VN')}đ
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>
              + Giỏ hàng {qtyInCart > 0 ? `(${qtyInCart})` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sách nổi bật</Text>

      <FlatList
        data={BOOKS}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <FloatingCartButton onPress={() => navigation.navigate('Cart')} />
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
    color: '#222',
  },
  list: {
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
  },
  author: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
