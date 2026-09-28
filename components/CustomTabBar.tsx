import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../store/useCart';

const TAB_CONFIG = {
  Home: {
    label: 'Trang chủ',
    icon: '⌂',
  },
  Categories: {
    label: 'Danh mục',
    icon: '☰',
  },
  Cart: {
    label: 'Giỏ hàng',
    icon: '🛒',
  },
  Account: {
    label: 'Tài khoản',
    icon: '👤',
  },
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { totalQuantity } = useCart();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        // Tab đang được chọn
        const isFocused = state.index === index;
        const isCart = route.name === 'Cart';

        // Lấy config của tab
        const config =
          TAB_CONFIG[
            route.name as keyof typeof TAB_CONFIG
          ];

        // Label luôn là string
        const label = config?.label ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {/* ICON */}
            <View
              style={[
                styles.iconBox,
                isFocused && styles.activeIconBox,
              ]}
            >
              <Text
                style={[
                  styles.icon,
                  isFocused && styles.activeIcon,
                ]}
              >
                {config?.icon}
              </Text>

              {isCart && totalQuantity > 0 && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </Text>
                </View>
              )}
            </View>

            {/* LABEL */}
            <Text
              style={[
                styles.label,
                isFocused && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIconBox: {
    backgroundColor: '#FFF0E6',
    borderRadius: 10,
  },
  icon: {
    fontSize: 20,
    color: '#777777',
  },
  activeIcon: {
    color: '#FF6B35',
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  label: {
    marginTop: 3,
    fontSize: 11,
    color: '#777777',
  },
  activeLabel: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});
