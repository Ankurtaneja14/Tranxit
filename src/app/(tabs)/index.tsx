import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Platform, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Svg, { Path } from 'react-native-svg';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function LiveMapRadarScreen() {
  const insets = useSafeAreaInsets();
  const [locationName, setLocationName] = useState('Locating...');

  // Animations
  const pulseCyan = useSharedValue(0);
  const pulseEmerald = useSharedValue(0);

  useEffect(() => {
    pulseCyan.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    pulseEmerald.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );

    // Mock getting the previously selected location
    setTimeout(() => setLocationName('Panipat Sector 11'), 1500);
  }, []);

  const animatedCyanStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(pulseCyan.value, [0, 0.7, 1], [1, 1.5, 1]) }],
      shadowOpacity: interpolate(pulseCyan.value, [0, 0.7, 1], [0.4, 0, 0]),
      shadowRadius: interpolate(pulseCyan.value, [0, 0.7], [0, 15]),
      borderColor: `rgba(0, 176, 255, ${interpolate(pulseCyan.value, [0, 0.7, 1], [0, 1, 0])})`,
    };
  });

  const animatedEmeraldStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(pulseEmerald.value, [0, 0.7, 1], [1, 1.2, 1]) }],
      shadowOpacity: interpolate(pulseEmerald.value, [0, 0.7, 1], [0.4, 0, 0]),
      shadowRadius: interpolate(pulseEmerald.value, [0, 0.7], [0, 20]),
      borderColor: `rgba(0, 230, 118, ${interpolate(pulseEmerald.value, [0, 0.7, 1], [0, 1, 0])})`,
    };
  });

  return (
    <View style={styles.container}>
      {/* Background Map Image (Mock) */}
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5p9WqSVEbwMTw34wsKahf8jywRGdVNqa6EWIJDbfV0rk9rdIgQ1_I_RIXk-ZGooK9qQeoKuZLztLrgd9XOq1ttZrOwRH9U91NMt89x6U5j2BTXJTojIhVoFf3CROizf_LOAFt6ylkZtxWfPh_B-2ZFghQljSf49qrk7wdlmTCWIUYitOEVo_huLGYjj0rwPYgQUoR4JfkBIHVFyqjuvSgGuGDkKTYY_MsmkiVChI76fDMDoz8gRjR' }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />

      {/* SVG Route Overlay */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <Path
            d={`M50,${height - 100} C150,${height - 300} 50,400 200,300 C300,200 250,100 350,50`}
            fill="none"
            stroke={Colors.dark.primary}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </Svg>
      </View>

      {/* User Location Marker */}
      <Animated.View style={[styles.userMarkerContainer, animatedCyanStyle]}>
        <View style={styles.userMarkerDot} />
      </Animated.View>

      {/* Bus Marker */}
      <View style={styles.busMarkerWrapper}>
        <View style={styles.busMarkerBadge}>
          <Text style={styles.busMarkerBadgeText}>E-102 • 3 MINS</Text>
        </View>
        <Animated.View style={[styles.busMarkerIconContainer, animatedEmeraldStyle]}>
          <MaterialIcons name="directions-bus" size={18} color="#003918" />
        </Animated.View>
      </View>

      {/* Top UI Overlays */}
      <View style={[styles.topUiContainer, { paddingTop: insets.top || Spacing.lg }]}>
        
        {/* Row A: Location Chip & Actions */}
        <View style={styles.topRow}>
          <Pressable style={styles.glassChip}>
            <MaterialIcons name="my-location" size={20} color={Colors.dark.primary} />
            <Text style={styles.chipText}>{locationName}</Text>
            <MaterialIcons name="expand-more" size={20} color={Colors.dark.textSecondary} />
          </Pressable>
          <View style={styles.actionsRow}>
            <Pressable style={styles.circleButton}>
              <MaterialIcons name="notifications" size={20} color={Colors.dark.text} />
            </Pressable>
            <Pressable style={styles.avatarButton}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzHd7ycKPhViGUNYlGPi99eh6eU0lBo5U_hUmQYjwO-IZ1vRnRm4cIJe-0JyHkXxhSoTSN_vcsQhHKg6VVYxHeUGWgvU86AEFg-p7TfqgNimKjKrXH07ISIIOC2lM2fgsBjff_q7bZ588DkDNEoqLqIG1COe_OZTBAPtdgGuFGMBBoDXtnNsDFQ91DwAYax4vA13uAF3xYOUnSm7SVCmAHOpvNNKwDayX9RITirgHaV3_cl9PMa_Zl' }}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
              />
            </Pressable>
          </View>
        </View>

        {/* Row B: Search Bar */}
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color={Colors.dark.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor="rgba(186, 203, 185, 0.7)"
          />
          <MaterialIcons name="mic" size={24} color={Colors.dark.textSecondary} />
        </View>

        {/* Row C: Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipsContainer}>
          <Pressable style={[styles.filterChip, styles.filterChipActive]}>
            <MaterialIcons name="bolt" size={16} color={Colors.dark.primary} />
            <Text style={[styles.filterChipText, { color: Colors.dark.primary }]}>All E-Buses</Text>
          </Pressable>
          <Pressable style={styles.filterChip}>
            <MaterialIcons name="directions-bus" size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.filterChipText}>Standard</Text>
          </Pressable>
          <Pressable style={styles.filterChip}>
            <MaterialIcons name="train" size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.filterChipText}>Metro Link</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Map FABs */}
      <View style={styles.fabsContainer}>
        <Pressable style={styles.circleButton}>
          <MaterialIcons name="layers" size={20} color={Colors.dark.textSecondary} />
        </Pressable>
        <Pressable style={[styles.circleButton, { shadowColor: Colors.dark.secondary, shadowOpacity: 0.2, shadowRadius: 10 }]}>
          <MaterialIcons name="my-location" size={20} color={Colors.dark.secondary} />
        </Pressable>
      </View>

      {/* Bottom Sheet Card */}
      <View style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetContent}>
          {/* Visual Handle */}
          <View style={styles.bottomSheetHandle} />
          
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Approaching E-Buses</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveBadgeDot} />
              <Text style={styles.liveBadgeText}>LIVE GPS</Text>
            </View>
          </View>

          <View style={styles.etaCard}>
            <View style={styles.etaCardHeader}>
              <View style={styles.etaCardLeft}>
                <View style={styles.etaBusIcon}>
                  <MaterialIcons name="directions-bus" size={20} color={Colors.dark.primary} />
                </View>
                <View>
                  <Text style={styles.etaRouteName}>Route E-102</Text>
                  <View style={styles.distanceRow}>
                    <MaterialIcons name="linear-scale" size={14} color={Colors.dark.textSecondary} />
                    <Text style={styles.distanceText}>1.2km away</Text>
                  </View>
                </View>
              </View>
              <View style={styles.etaTimeContainer}>
                <Text style={styles.etaNumber}>3</Text>
                <Text style={styles.etaUnit}>MINS</Text>
              </View>
            </View>

            <View style={styles.divider} />
            
            <View style={styles.crowdStatusRow}>
              <MaterialIcons name="group" size={16} color={Colors.dark.primary} />
              <Text style={styles.crowdStatusText}>Low Crowd Expected</Text>
            </View>
          </View>

          <View style={styles.actionButtonsRow}>
            <Pressable style={styles.trackButton}>
              <MaterialIcons name="near-me" size={20} color="#003918" />
              <Text style={styles.trackButtonText}>Track Live Route</Text>
            </Pressable>
            <Pressable style={styles.bookButton}>
              <MaterialIcons name="qr-code-scanner" size={20} color={Colors.dark.secondary} />
              <Text style={styles.bookButtonText}>Book QR</Text>
            </Pressable>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  userMarkerContainer: {
    position: 'absolute',
    top: 400,
    left: 150,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.dark.secondary,
    borderWidth: 2,
    borderColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.dark.secondary,
  },
  userMarkerDot: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  busMarkerWrapper: {
    position: 'absolute',
    top: 280,
    left: 190,
    alignItems: 'center',
    transform: [{ translateX: -40 }, { translateY: -40 }],
  },
  busMarkerBadge: {
    backgroundColor: 'rgba(13, 21, 14, 0.9)',
    borderColor: 'rgba(117,255,158,0.3)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radii.full,
    marginBottom: 8,
  },
  busMarkerBadgeText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    color: Colors.dark.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  busMarkerIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: Colors.dark.primary,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.dark.primary,
  },
  topUiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.marginMobile,
    zIndex: 20,
    gap: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  glassChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chipText: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(117,255,158,0.2)',
    overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(117,255,158,0.3)',
    borderRadius: Radii.full,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  searchInput: {
    flex: 1,
    fontFamily: Typography.family.sans,
    fontSize: 16,
    color: Colors.dark.text,
    marginLeft: 12,
    padding: 0,
  },
  filterChipsContainer: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
  filterChipActive: {
    backgroundColor: 'rgba(117,255,158,0.15)',
    borderColor: Colors.dark.primary,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  filterChipText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: Colors.dark.textSecondary,
    textTransform: 'uppercase',
  },
  fabsContainer: {
    position: 'absolute',
    right: Spacing.marginMobile,
    bottom: 340,
    gap: Spacing.sm,
    zIndex: 20,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 90, // Above tab bar
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.sm,
    zIndex: 30,
  },
  bottomSheetContent: {
    backgroundColor: 'rgba(30, 38, 56, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: Spacing.md,
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  bottomSheetHandle: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  bottomSheetTitle: {
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.titleMd,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(147, 0, 10, 0.3)',
    borderColor: 'rgba(255, 180, 171, 0.5)',
    borderWidth: 1,
    borderRadius: Radii.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  liveBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.error,
  },
  liveBadgeText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.dark.error,
    letterSpacing: 1,
  },
  etaCard: {
    backgroundColor: 'rgba(35, 44, 36, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  etaCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  etaCardLeft: {
    flexDirection: 'row',
    gap: 12,
  },
  etaBusIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(117,255,158,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(117,255,158,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaRouteName: {
    fontFamily: Typography.family.sans,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  distanceText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  etaTimeContainer: {
    alignItems: 'flex-end',
  },
  etaNumber: {
    fontFamily: Typography.family.sans,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark.primary,
    letterSpacing: -1,
    lineHeight: 28,
  },
  etaUnit: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(117,255,158,0.8)',
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  crowdStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  crowdStatusText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.primary,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    borderRadius: Radii.full,
    gap: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  trackButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    color: '#003918',
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(0,175,254,0.5)',
    paddingVertical: 12,
    borderRadius: Radii.full,
    gap: 8,
  },
  bookButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.secondary,
  }
});
