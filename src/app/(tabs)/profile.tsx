import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Dimensions, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';
import { TranslatedText } from '@/components/TranslatedText';
import { useAppContext } from '@/context/AppContext';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userName, phoneNumber, language, setLanguage, setUserName, setPhoneNumber } = useAppContext();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
             // Wipe context logic (mock wipe)
             await setUserName('Ankur Taneja');
             await setPhoneNumber('');
             setTimeout(() => {
               if (router.canDismiss()) {
                 router.dismissAll();
               }
               router.replace('/');
             }, 100);
          }
        }
      ]
    );
  };

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    await setLanguage(newLang);
  };

  const handleMockPress = (feature: string) => {
    Alert.alert(feature, `${feature} is not available in the prototype yet.`);
  };

  // Helper to get initials
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <View style={styles.container}>
      {/* Background Radial Gradient Mocks */}
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['rgba(0, 176, 255, 0.05)', 'transparent']}
          style={styles.radialTopRight}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top || Spacing.lg, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <TranslatedText style={styles.headerTitle}>Profile & Settings</TranslatedText>

        {/* User Profile Card */}
        <View style={styles.userCard}>
          <View style={styles.userCardInner}>
            <View style={styles.avatarWrapper}>
              <TranslatedText style={styles.avatarText}>{getInitials(userName)}</TranslatedText>
            </View>
            <View style={styles.userInfo}>
              <TranslatedText style={styles.userName}>{userName}</TranslatedText>
              <TranslatedText style={styles.userPhone}>{phoneNumber || "+91 XXXXX XXXXX"}</TranslatedText>
            </View>
            <Pressable style={styles.editButton} onPress={() => router.push('/edit-profile')}>
              <MaterialIcons name="edit" size={20} color={Colors.dark.primary} />
            </Pressable>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <TranslatedText style={styles.statNumber}>142</TranslatedText>
              <TranslatedText style={styles.statLabel}>Trips</TranslatedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <TranslatedText style={styles.statNumber}>3</TranslatedText>
              <TranslatedText style={styles.statLabel}>Passes</TranslatedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.levelBadge}>
                <MaterialIcons name="star" size={14} color="#FFD700" />
                <TranslatedText style={styles.levelText}>GOLD</TranslatedText>
              </View>
              <TranslatedText style={styles.statLabel}>Status</TranslatedText>
            </View>
          </View>
        </View>

        {/* Settings Group */}
        <View style={styles.section}>
          <TranslatedText style={styles.sectionTitle}>COMMUTE & PAYMENTS</TranslatedText>
          <View style={styles.menuGroup}>
            
            <Pressable style={styles.menuItem} onPress={() => router.push('/saved-locations')}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="bookmark" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>Saved Locations</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={() => router.push('/payment-methods')}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="payment" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>Payment Methods</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={() => router.push('/travel-history')}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="history" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>Travel History</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

          </View>
        </View>

        {/* App Settings Group */}
        <View style={styles.section}>
          <TranslatedText style={styles.sectionTitle}>APP SETTINGS</TranslatedText>
          <View style={styles.menuGroup}>
            
            <Pressable style={styles.menuItem} onPress={() => router.push('/notifications')}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="notifications" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>Notifications & Alerts</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={toggleLanguage}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="language" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>Language</TranslatedText>
              <TranslatedText style={styles.menuSubText}>{language === 'en' ? 'English' : 'Hindi'}</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={() => router.push('/safety-sos')}>
              <View style={styles.menuIconWrapperRed}>
                <MaterialIcons name="emergency" size={20} color={Colors.dark.error} />
              </View>
              <TranslatedText style={styles.menuText}>Safety & SOS Settings</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

          </View>
        </View>

        {/* General Group */}
        <View style={styles.section}>
          <TranslatedText style={styles.sectionTitle}>GENERAL</TranslatedText>
          <View style={styles.menuGroup}>
            
            <Pressable style={styles.menuItem} onPress={() => handleMockPress("Help & Support")}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="help-outline" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>Help & Support</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={() => handleMockPress("About TransitX")}>
              <View style={styles.menuIconWrapper}>
                <MaterialIcons name="info-outline" size={20} color={Colors.dark.textSecondary} />
              </View>
              <TranslatedText style={styles.menuText}>About TransitX</TranslatedText>
              <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
            </Pressable>

          </View>
        </View>

        {/* Log Out Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color={Colors.dark.error} />
          <TranslatedText style={styles.logoutButtonText}>Log Out</TranslatedText>
        </Pressable>

        <TranslatedText style={styles.versionText}>TransitX Beta v0.9.1</TranslatedText>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  radialTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width,
    height: width,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.xl,
  },
  userCard: {
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: Spacing.xl,
  },
  userCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 176, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 176, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Typography.family.sans,
    fontSize: 24,
    fontWeight: '700',
    color: '#00B0FF',
  },
  userInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    gap: 4,
  },
  userName: {
    fontFamily: Typography.family.sans,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  userPhone: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(117,255,158,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontFamily: Typography.family.sans,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  statLabel: {
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  levelText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  menuGroup: {
    backgroundColor: 'rgba(30, 38, 56, 0.4)',
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuIconWrapperRed: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuText: {
    flex: 1,
    fontFamily: Typography.family.sans,
    fontSize: 16,
    color: Colors.dark.text,
  },
  menuSubText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginRight: Spacing.xs,
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: 68,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.3)',
    borderRadius: Radii.md,
    paddingVertical: 16,
    marginTop: Spacing.md,
    gap: 8,
  },
  logoutButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.error,
  },
  versionText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xl,
    opacity: 0.5,
  }
});
