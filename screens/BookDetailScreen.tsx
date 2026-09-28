import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../navigation/HomeStack';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'BookDetail'
>;

export default function BookDetailScreen({
  route,
}: Props) {
  const { bookId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chi tiết sách
      </Text>

      <Text style={styles.bookId}>
        Book ID: {bookId}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',

    marginBottom: 16,
  },

  bookId: {
    fontSize: 16,
    color: '#555',
  },
});
