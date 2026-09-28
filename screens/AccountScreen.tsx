import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import { useAuth } from '../store/useAuth';

export default function AccountScreen() {
  const { isLoggedIn, userInfo, token, login, logout, defaultMockUser } =
    useAuth();

  const [customName, setCustomName] = useState(defaultMockUser.name);
  const [customEmail, setCustomEmail] = useState(defaultMockUser.email);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleQuickLogin = () => {
    login();
    Alert.alert('Thành công', 'Đã đăng nhập với tài khoản thử nghiệm!');
  };

  const handleCustomLogin = () => {
    if (!customName.trim() || !customEmail.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ tên và email');
      return;
    }

    login({
      userInfo: {
        ...defaultMockUser,
        name: customName.trim(),
        email: customEmail.trim(),
      },
      token: `token-${Date.now()}-mock-auth`,
    });
    Alert.alert('Thành công', `Chào mừng ${customName.trim()}!`);
  };

  const handleLogout = () => {
    Alert.alert('Xác nhận đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
        <View
          style={[
            styles.statusBadge,
            isLoggedIn ? styles.statusBadgeOnline : styles.statusBadgeOffline,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isLoggedIn ? styles.statusTextOnline : styles.statusTextOffline,
            ]}
          >
            {isLoggedIn ? '● Đã đăng nhập' : '○ Chưa đăng nhập'}
          </Text>
        </View>
      </View>

      {/* CHƯA ĐĂNG NHẬP (isLoggedIn === false) */}
      {!isLoggedIn ? (
        <View style={styles.guestContainer}>
          <View style={styles.guestAvatarBox}>
            <Text style={styles.guestAvatar}>👤</Text>
          </View>

          <Text style={styles.guestTitle}>Chào mừng bạn đến với BookStore</Text>
          <Text style={styles.guestSubtitle}>
            Đăng nhập để lưu đơn hàng, nhận ưu đãi thành viên và đồng bộ giỏ
            hàng trên mọi thiết bị.
          </Text>

          {/* DEMO ACCOUNT PREVIEW CARD */}
          <View style={styles.demoCard}>
            <View style={styles.demoCardHeader}>
              <Text style={styles.demoCardTitle}>
                🧪 Dữ liệu thử nghiệm (Tuần 6)
              </Text>
            </View>
            <View style={styles.demoRow}>
              <Text style={styles.demoLabel}>Họ tên:</Text>
              <Text style={styles.demoValue}>{defaultMockUser.name}</Text>
            </View>
            <View style={styles.demoRow}>
              <Text style={styles.demoLabel}>Email:</Text>
              <Text style={styles.demoValue}>{defaultMockUser.email}</Text>
            </View>
            <View style={styles.demoRow}>
              <Text style={styles.demoLabel}>Hạng:</Text>
              <Text style={styles.demoValue}>{defaultMockUser.memberRank}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleQuickLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Đăng nhập nhanh (Dữ liệu mẫu)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowCustomForm(!showCustomForm)}
          >
            <Text style={styles.secondaryButtonText}>
              {showCustomForm
                ? 'Ẩn tùy chỉnh thông tin'
                : 'Tùy chỉnh thông tin đăng nhập'}
            </Text>
          </TouchableOpacity>

          {showCustomForm && (
            <View style={styles.customForm}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
              <TextInput
                style={styles.input}
                value={customName}
                onChangeText={setCustomName}
                placeholder="Nhập họ tên"
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={customEmail}
                onChangeText={setCustomEmail}
                placeholder="Nhập email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.customLoginBtn}
                onPress={handleCustomLogin}
              >
                <Text style={styles.customLoginBtnText}>
                  Đăng nhập với thông tin này
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        /* ĐÃ ĐĂNG NHẬP (isLoggedIn === true) */
        <View style={styles.userContainer}>
          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarIcon}>
                {userInfo?.avatar || '👨‍💻'}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userInfo?.name}</Text>
              <Text style={styles.userEmail}>{userInfo?.email}</Text>

              {userInfo?.memberRank && (
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>
                    ⭐️ {userInfo.memberRank}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* CONTACT & SYSTEM INFO */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số điện thoại:</Text>
              <Text style={styles.infoValue}>
                {userInfo?.phone || 'Chưa cập nhật'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Địa chỉ:</Text>
              <Text style={styles.infoValue}>
                {userInfo?.address || 'Chưa cập nhật'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Token xác thực:</Text>
              <Text
                style={styles.tokenValue}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {token ?? 'Không có'}
              </Text>
            </View>
          </View>

          {/* MENU ITEMS */}
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>📦</Text>
              <Text style={styles.menuText}>Đơn hàng đã mua</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>🔖</Text>
              <Text style={styles.menuText}>Sách đã lưu</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuText}>Cài đặt tài khoản</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* LOGOUT BUTTON */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeOnline: {
    backgroundColor: '#E6F4EA',
  },
  statusBadgeOffline: {
    backgroundColor: '#F1F3F4',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: '#137333',
  },
  statusTextOffline: {
    color: '#5F6368',
  },

  // Guest view styles
  guestContainer: {
    alignItems: 'center',
  },
  guestAvatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  guestAvatar: {
    fontSize: 40,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  demoCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  demoCardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
    marginBottom: 10,
  },
  demoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  demoLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  demoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  customForm: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  customLoginBtn: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  customLoginBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Logged-in user styles
  userContainer: {
    width: '100%',
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFE8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarIcon: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  rankBadge: {
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: '#FFE082',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  rankText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B78103',
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#777',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tokenValue: {
    fontSize: 12,
    color: '#FF6B35',
    maxWidth: 180,
    fontFamily: 'monospace',
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 18,
    color: '#BBB',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F3F5',
  },
  logoutButton: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 15,
    fontWeight: '700',
  },
});
