import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Modal, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

type TabType = 'active' | 'available' | 'expired';

export default function TicketsScreen() {
  const insets = useSafeAreaInsets();
  
  // State
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [modalVisible, setModalVisible] = useState(false);

  // Animation for the modal pulsing dot
  const pulseDot = useSharedValue(0);

  useEffect(() => {
    pulseDot.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(pulseDot.value, [0, 0.7, 1], [0.95, 1, 0.95]) }],
      shadowOpacity: interpolate(pulseDot.value, [0, 0.7, 1], [0.7, 0, 0]),
      shadowRadius: interpolate(pulseDot.value, [0, 0.7], [0, 6]),
      borderColor: `rgba(0, 230, 118, ${interpolate(pulseDot.value, [0, 0.7, 1], [0, 1, 0])})`,
    };
  });

  const handleBuyPass = () => {
    Alert.alert("Success", "Mock payment successful! Pass added to your account.");
  };

  return (
    <View style={styles.container}>
      {/* Background Radial Gradient Mocks */}
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['rgba(0, 230, 118, 0.05)', 'transparent']}
          style={styles.radialTopRight}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
        <LinearGradient
          colors={['rgba(0, 176, 255, 0.05)', 'transparent']}
          style={styles.radialBottomLeft}
          start={{ x: 0, y: 1 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top || Spacing.lg, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Commuter Passes</Text>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="add" size={24} color={Colors.dark.primary} />
          </Pressable>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          <Pressable 
            style={[styles.tabChip, activeTab === 'active' && styles.tabChipActive]}
            onPress={() => setActiveTab('active')}
          >
            <Text style={[styles.tabChipText, activeTab === 'active' && { color: Colors.dark.primary }]}>Active Pass (1)</Text>
          </Pressable>
          <Pressable 
            style={[styles.tabChip, activeTab === 'available' && styles.tabChipActive]}
            onPress={() => setActiveTab('available')}
          >
            <Text style={[styles.tabChipText, activeTab === 'available' && { color: Colors.dark.primary }]}>Available Passes</Text>
          </Pressable>
          <Pressable 
            style={[styles.tabChip, activeTab === 'expired' && styles.tabChipActive]}
            onPress={() => setActiveTab('expired')}
          >
            <Text style={[styles.tabChipText, activeTab === 'expired' && { color: Colors.dark.primary }]}>Expired History</Text>
          </Pressable>
        </ScrollView>

        {/* Content Area Based on Tab State */}
        {activeTab === 'active' && (
          <View style={styles.heroCardWrapper}>
            <LinearGradient
              colors={['rgba(30, 38, 56, 0.9)', 'rgba(10, 46, 35, 0.9)']}
              style={styles.heroCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroCardInner}>
                <View style={styles.heroTopRow}>
                  <View style={styles.heroTextCol}>
                    <Text style={styles.heroBadgeText}>HARYANA E-BUS PASS</Text>
                    <Text style={styles.heroTitle}>ALL-CITY MONTHLY UNLIMITED</Text>
                  </View>
                  <View style={styles.nfcBadge}>
                    <MaterialIcons name="nfc" size={14} color={Colors.dark.secondary} />
                    <Text style={styles.nfcBadgeText}>NCMC ENABLED</Text>
                  </View>
                </View>
                
                <View style={styles.heroBottomRow}>
                  <View style={styles.heroUserInfo}>
                    <Text style={styles.userName}>Ankur Taneja</Text>
                    <Text style={styles.expDate}>EXP: 15-SEP-2026</Text>
                  </View>
                  <Pressable style={styles.qrButton} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="qr-code-2" size={32} color={Colors.dark.text} />
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {activeTab === 'available' && (
          <View style={styles.packagesSection}>
            <Text style={styles.sectionTitle}>EXPLORE COMMUTER SAVINGS PACKAGES</Text>

            {/* Package Card 1 */}
            <Pressable style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <View style={styles.packageTitleCol}>
                  <View style={styles.studentBadge}>
                    <Text style={styles.studentBadgeText}>STUDENT</Text>
                  </View>
                  <Text style={styles.packageTitle}>30-Day City Student Unlimited</Text>
                </View>
                <View style={styles.packagePriceCol}>
                  <Text style={styles.packagePrice}>₹299</Text>
                  <Text style={styles.packagePeriod}>/mo</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.packageFooter}>
                <View style={styles.packageRules}>
                  <MaterialIcons name="directions-bus" size={16} color={Colors.dark.textSecondary} />
                  <Text style={styles.packageRulesText}>Valid on all city routes</Text>
                </View>
                <Pressable style={styles.applyButton} onPress={handleBuyPass}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </Pressable>
              </View>
            </Pressable>

            {/* Package Card 2 */}
            <Pressable style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <View style={styles.packageTitleCol}>
                  <View style={styles.expressBadge}>
                    <Text style={styles.expressBadgeText}>WEEKLY 10-TRIP</Text>
                  </View>
                  <Text style={styles.packageTitle}>Panipat ➔ Gurugram Express Pass</Text>
                </View>
                <View style={styles.packagePriceCol}>
                  <Text style={styles.packagePrice}>₹120</Text>
                  <Text style={styles.packagePeriod}>/wk</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.packageFooter}>
                <View style={styles.packageRules}>
                  <MaterialIcons name="route" size={16} color={Colors.dark.textSecondary} />
                  <Text style={styles.packageRulesText}>Specific Route Only</Text>
                </View>
                <Pressable style={styles.buyButton} onPress={handleBuyPass}>
                  <Text style={styles.buyButtonText}>Buy Pass</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        )}

        {activeTab === 'expired' && (
          <View style={styles.packagesSection}>
             <View style={styles.emptyState}>
                <MaterialIcons name="history" size={48} color="rgba(255,255,255,0.1)" />
                <Text style={styles.emptyStateText}>No Expired Passes</Text>
             </View>
          </View>
        )}
      </ScrollView>

      {/* FULL SCREEN MODAL: Active Boarding Pass */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
           {/* Top Bar inside Modal */}
           <View style={[styles.modalTopNav, { paddingTop: insets.top || Spacing.md }]}>
              <Pressable style={styles.modalIconButton} onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={Colors.dark.textSecondary} />
              </Pressable>
              <Text style={styles.modalHeaderTitle}>Active Boarding Pass</Text>
              <Pressable style={styles.modalIconButton}>
                <MaterialIcons name="share" size={24} color={Colors.dark.textSecondary} />
              </Pressable>
           </View>

           <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
              {/* Status Banner */}
              <View style={styles.statusBannerWrapper}>
                <View style={styles.statusBanner}>
                  <Animated.View style={[styles.statusDot, animatedDotStyle]} />
                  <Text style={styles.statusText}>TICKET ACTIVE • EXPIRES IN 44:12</Text>
                </View>
              </View>

              {/* Huge Ticket Card */}
              <View style={styles.boardingTicketCard}>
                 <View style={styles.ticketNotchLeft} />
                 <View style={styles.ticketNotchRight} />
                 <View style={styles.ticketDividerDash} />

                 {/* Top Half */}
                 <View style={styles.ticketTopHalf}>
                    <Text style={styles.ticketAgencyText}>HARYANA CITY BUS SERVICE</Text>
                    <Text style={styles.ticketRouteText}>Route E-102: Panipat Stand ➔ Model Town</Text>
                    
                    <View style={styles.ticketInfoRow}>
                      <View style={styles.ticketBusInfo}>
                        <MaterialIcons name="directions-bus" size={14} color={Colors.dark.textSecondary} />
                        <Text style={styles.ticketBusId}>#HR-06-EB-101</Text>
                      </View>
                      <View style={styles.ticketPriceBadge}>
                         <Text style={styles.ticketPriceText}>₹15.00</Text>
                      </View>
                    </View>

                    {/* QR Code Graphic Mock */}
                    <View style={styles.qrMockWrapper}>
                        <View style={styles.qrCodeGrid}>
                           <View style={[styles.qrCorner, { top: 12, left: 12 }]} />
                           <View style={[styles.qrCorner, { top: 12, right: 12 }]} />
                           <View style={[styles.qrCorner, { bottom: 12, left: 12 }]} />
                        </View>
                        <View style={styles.qrLogo}>
                          <Text style={styles.qrLogoText}>TX</Text>
                        </View>
                    </View>

                    <View style={styles.hologramBar}>
                       <Text style={styles.hologramText}>21-AUG-2026 | 23:01:45 IST</Text>
                    </View>
                 </View>

                 {/* Bottom Half */}
                 <View style={styles.ticketBottomHalf}>
                    <View style={styles.metaDataGrid}>
                      <View style={styles.metaDataCell}>
                        <Text style={styles.metaLabel}>PASSENGER</Text>
                        <Text style={styles.metaValue}>1 Adult</Text>
                      </View>
                      <View style={styles.metaDataCell}>
                        <Text style={styles.metaLabel}>BOARDING STOP</Text>
                        <Text style={styles.metaValue} numberOfLines={1}>Model Town Jcn</Text>
                      </View>
                      <View style={styles.metaDataCell}>
                        <Text style={styles.metaLabel}>TICKET ID</Text>
                        <Text style={[styles.metaValue, { color: Colors.dark.primary, fontFamily: Typography.family.mono }]}>TX-HR-884920</Text>
                      </View>
                      <View style={styles.metaDataCell}>
                        <Text style={styles.metaLabel}>ISSUED AT</Text>
                        <Text style={styles.metaValue}>22:58 PM</Text>
                      </View>
                    </View>
                 </View>
              </View>

              <View style={styles.instructionRow}>
                 <MaterialIcons name="qr-code-scanner" size={20} color={Colors.dark.secondary} />
                 <Text style={styles.instructionText}>Show this QR code to the conductor or scan at the e-bus automated door reader.</Text>
              </View>
           </ScrollView>

           {/* Modal Bottom Action */}
           <View style={[styles.modalBottomAction, { paddingBottom: insets.bottom || 24 }]}>
              <Pressable style={styles.endTripButton} onPress={() => setModalVisible(false)}>
                 <MaterialIcons name="logout" size={20} color={Colors.dark.error} />
                 <Text style={styles.endTripText}>End Trip & Exit Bus</Text>
              </Pressable>
           </View>
        </View>
      </Modal>

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
  radialBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    flex: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tabChip: {
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  tabChipActive: {
    backgroundColor: 'rgba(117,255,158,0.2)',
    borderColor: Colors.dark.primary,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  tabChipText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
  },
  heroCardWrapper: {
    marginBottom: Spacing.xl,
    borderRadius: Radii.lg,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  heroCard: {
    height: 180,
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    borderColor: Colors.dark.primary,
    overflow: 'hidden',
  },
  heroCardInner: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTextCol: {
    flex: 1,
    marginRight: Spacing.md,
  },
  heroBadgeText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.primary,
    letterSpacing: 1,
    opacity: 0.9,
  },
  heroTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginTop: 4,
  },
  nfcBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(141, 205, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(141, 205, 255, 0.3)',
    borderRadius: Radii.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  nfcBadgeText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: '#8dcdff',
  },
  heroBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heroUserInfo: {
    flexDirection: 'column',
    gap: 4,
  },
  userName: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  expDate: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.text,
    opacity: 0.7,
  },
  qrButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: Radii.md,
  },
  packagesSection: {
    flexDirection: 'column',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  packageCard: {
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  packageTitleCol: {
    flex: 1,
    gap: 4,
    marginRight: Spacing.md,
  },
  studentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#00affe', // secondary-container
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  studentBadgeText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: '#003f5f', // on-secondary-container
    textTransform: 'uppercase',
  },
  expressBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffba79', // tertiary-container
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expressBadgeText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: '#794810', // on-tertiary-container
    textTransform: 'uppercase',
  },
  packageTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  packagePriceCol: {
    alignItems: 'flex-end',
  },
  packagePrice: {
    fontFamily: Typography.family.sans,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.primary,
  },
  packagePeriod: {
    fontFamily: Typography.family.sans,
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageRules: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  packageRulesText: {
    fontFamily: Typography.family.sans,
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  applyButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: Radii.full,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  applyButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    fontWeight: '700',
    color: '#003918',
  },
  buyButton: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: Radii.full,
  },
  buyButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  emptyStateText: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginTop: Spacing.md,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 13, 18, 0.98)',
  },
  modalTopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  modalIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  modalHeaderTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },
  statusBannerWrapper: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 55, 46, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(117,255,158,0.2)',
    borderRadius: Radii.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
    borderWidth: 2,
    borderColor: 'rgba(0, 230, 118, 0.4)',
  },
  statusText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.primary,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,230,118,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  boardingTicketCard: {
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.dark.primary,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
  ticketNotchLeft: {
    position: 'absolute',
    top: '55%',
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A0D12',
    borderRightWidth: 1.5,
    borderRightColor: Colors.dark.primary,
    transform: [{ translateY: -12 }],
    zIndex: 10,
  },
  ticketNotchRight: {
    position: 'absolute',
    top: '55%',
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A0D12',
    borderLeftWidth: 1.5,
    borderLeftColor: Colors.dark.primary,
    transform: [{ translateY: -12 }],
    zIndex: 10,
  },
  ticketDividerDash: {
    position: 'absolute',
    top: '55%',
    left: 20,
    right: 20,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    transform: [{ translateY: -0.5 }],
    zIndex: 5,
  },
  ticketTopHalf: {
    padding: Spacing.xl,
    paddingBottom: 40,
    alignItems: 'center',
  },
  ticketAgencyText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: '#00B0FF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  ticketRouteText: {
    fontFamily: Typography.family.sans,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
    textAlign: 'center',
  },
  ticketInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  ticketBusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketBusId: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  ticketPriceBadge: {
    backgroundColor: 'rgba(35, 44, 36, 1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  ticketPriceText: {
    fontFamily: Typography.family.sans,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  qrMockWrapper: {
    width: 210,
    height: 210,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginBottom: Spacing.lg,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeGrid: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 8,
    position: 'relative',
  },
  qrCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  qrLogo: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  qrLogoText: {
    fontFamily: Typography.family.sans,
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  hologramBar: {
    width: 240,
    height: 32,
    backgroundColor: 'rgba(35, 44, 36, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hologramText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.text,
    letterSpacing: 2,
  },
  ticketBottomHalf: {
    padding: Spacing.xl,
    paddingTop: 40,
    backgroundColor: 'rgba(8, 16, 9, 0.3)',
  },
  metaDataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaDataCell: {
    width: '45%',
    marginBottom: Spacing.md,
  },
  metaLabel: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(186, 203, 185, 0.7)',
    marginBottom: 4,
  },
  metaValue: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    color: Colors.dark.text,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  instructionText: {
    flex: 1,
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  modalBottomAction: {
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.md,
    backgroundColor: 'rgba(13, 21, 14, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  endTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(21, 30, 22, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.3)',
    borderRadius: 12,
    gap: 8,
  },
  endTripText: {
    fontFamily: Typography.family.sans,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.error,
  }
});
