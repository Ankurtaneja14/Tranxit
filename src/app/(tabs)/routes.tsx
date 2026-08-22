import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Platform, Dimensions } from 'react-native';
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
import { useRouter } from 'expo-router';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function RoutePlannerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [destination, setDestination] = useState('');

  // Pulse animation for the top origin dot
  const pulseScale = useSharedValue(0);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(pulseScale.value, [0, 0.7, 1], [1, 1.5, 1]) }],
      shadowOpacity: interpolate(pulseScale.value, [0, 0.7, 1], [0.4, 0, 0]),
      shadowRadius: interpolate(pulseScale.value, [0, 0.7], [0, 10]),
      borderColor: `rgba(0, 230, 118, ${interpolate(pulseScale.value, [0, 0.7, 1], [0, 1, 0])})`,
    };
  });

  return (
    <View style={styles.container}>
      {/* Background Radial Gradient Mock */}
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['rgba(0, 230, 118, 0.05)', 'transparent']}
          style={styles.radialMock}
          start={{ x: 0.5, y: 0 }}
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
          <Text style={styles.headerTitle}>Plan Your Journey</Text>
          <Pressable>
            <Text style={styles.clearButton}>Clear</Text>
          </Pressable>
        </View>

        {/* Dual-Input Card */}
        <View style={styles.inputCard}>
          {/* Visual Connection Line */}
          <View style={styles.visualConnection}>
            <Animated.View style={[styles.originDot, animatedDotStyle]} />
            <View style={styles.dashedLine} />
            <View style={styles.destinationDot} />
          </View>

          {/* Input Fields */}
          <View style={styles.inputsWrapper}>
            {/* Origin Input */}
            <View style={styles.inputRow}>
              <MaterialIcons name="my-location" size={20} color={Colors.dark.primary} />
              <TextInput
                style={styles.textInput}
                value="Current Location (Panipat)"
                editable={false}
                placeholderTextColor="rgba(186, 203, 185, 0.5)"
              />
            </View>

            <View style={styles.inputDivider} />

            {/* Destination Input (Active) */}
            <View style={[styles.inputRow, styles.activeInputRow]}>
              <MaterialIcons name="location-on" size={20} color="#00B0FF" />
              <TextInput
                style={styles.textInput}
                value={destination}
                onChangeText={setDestination}
                placeholder="Where to?"
                placeholderTextColor="rgba(186, 203, 185, 0.5)"
              />
              {destination.length > 0 && (
                <Pressable style={styles.closeCircle} onPress={() => setDestination('')}>
                  <MaterialIcons name="close" size={14} color={Colors.dark.background} />
                </Pressable>
              )}
            </View>
          </View>

          {/* Swap Button */}
          <View style={styles.swapButtonWrapper}>
            <Pressable style={styles.swapButton}>
              <MaterialIcons name="swap-vert" size={20} color={Colors.dark.textSecondary} />
            </Pressable>
          </View>
        </View>

        {/* Find Routes Button */}
        <Pressable 
          style={[styles.findButton, !destination && styles.findButtonDisabled]}
          disabled={!destination}
          onPress={() => {
            if (destination) {
              router.push(`/route-comparison?dest=${encodeURIComponent(destination)}`);
            }
          }}
        >
          <Text style={styles.findButtonText}>Find Routes</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#003918" />
        </Pressable>

        {/* Quick Action Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          <Pressable style={[styles.chip, styles.chipPrimary]}>
            <MaterialIcons name="schedule" size={16} color={Colors.dark.primary} />
            <Text style={[styles.chipText, { color: Colors.dark.primary }]}>LEAVE NOW</Text>
            <MaterialIcons name="arrow-drop-down" size={16} color={Colors.dark.primary} />
          </Pressable>
          <Pressable style={styles.chip}>
            <MaterialIcons name="home" size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.chipText}>HOME</Text>
          </Pressable>
          <Pressable style={styles.chip}>
            <MaterialIcons name="work" size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.chipText}>WORK</Text>
          </Pressable>
        </ScrollView>

        {/* Recent Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENT DESTINATIONS</Text>
          
          <Pressable style={styles.recentItem}>
            <View style={styles.historyIconCircle}>
              <MaterialIcons name="history" size={20} color={Colors.dark.textSecondary} />
            </View>
            <View style={styles.recentTextWrapper}>
              <Text style={styles.recentTitle}>New Sabji Mandi, Panipat</Text>
              <Text style={styles.recentSubtitle}>Haryana</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.dark.textSecondary} />
          </Pressable>

          <View style={styles.itemDivider} />

          <Pressable style={styles.recentItem}>
            <View style={styles.historyIconCircle}>
              <MaterialIcons name="history" size={20} color={Colors.dark.textSecondary} />
            </View>
            <View style={styles.recentTextWrapper}>
              <Text style={styles.recentTitle}>Karnal Bus Stand</Text>
              <Text style={styles.recentSubtitle}>Karnal</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.dark.textSecondary} />
          </Pressable>
        </View>

        {/* Search Results (Recommended Routes) */}
        <View style={[styles.section, { marginTop: Spacing.lg }]}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>RECOMMENDED E-BUS ROUTES</Text>
            <Pressable style={styles.sortButton}>
              <Text style={styles.sortButtonText}>Fastest First</Text>
              <MaterialIcons name="expand-more" size={16} color="#00B0FF" />
            </Pressable>
          </View>

          {/* Route Card 1 (Fastest) */}
          <Pressable style={[styles.routeCard, styles.routeCardPrimary]}>
            <LinearGradient
              colors={['rgba(0, 230, 118, 0.1)', 'transparent']}
              style={styles.cardGlowMock}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            
            <View style={styles.cardRowBetween}>
              <View style={styles.badgeFastest}>
                <MaterialIcons name="bolt" size={12} color={Colors.dark.primary} />
                <Text style={styles.badgeFastestText}>FASTEST • E-102 DIRECT</Text>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.priceTagText}>₹15</Text>
              </View>
            </View>

            <View style={styles.cardRowBetweenEnd}>
              <View style={styles.timeWrapper}>
                <View style={styles.timeInner}>
                  <Text style={styles.timeBigNumber}>14</Text>
                  <Text style={styles.timeUnit}>Mins</Text>
                </View>
                <Text style={styles.departText}>
                  <Text style={{ color: Colors.dark.primary }}>●</Text> (Departs in 3 mins)
                </Text>
              </View>
              <View style={styles.seatsBadge}>
                <View style={styles.seatsDot} />
                <Text style={styles.seatsText}>SEATS AVAILABLE</Text>
              </View>
            </View>

            <View style={styles.visualStream}>
              <View style={styles.streamItem}>
                <MaterialIcons name="directions-walk" size={16} color={Colors.dark.textSecondary} />
                <Text style={styles.streamText}>2m</Text>
              </View>
              <MaterialIcons name="chevron-right" size={16} color="rgba(255,255,255,0.2)" />
              <View style={styles.streamItemPrimary}>
                <MaterialIcons name="directions-bus" size={16} color={Colors.dark.primary} />
                <Text style={styles.streamTextPrimary}>E-102</Text>
              </View>
              <MaterialIcons name="chevron-right" size={16} color="rgba(255,255,255,0.2)" />
              <View style={styles.streamItem}>
                <MaterialIcons name="directions-walk" size={16} color={Colors.dark.textSecondary} />
                <Text style={styles.streamText}>1m</Text>
              </View>
            </View>
          </Pressable>

          {/* Route Card 2 (Metro Connect) */}
          <Pressable 
            style={styles.routeCard}
            onPress={() => router.push(`/route-comparison?dest=Model Town`)}
          >
            <View style={styles.cardRowBetween}>
              <View style={styles.badgeMetro}>
                <MaterialIcons name="train" size={12} color="#00B0FF" />
                <Text style={styles.badgeMetroText}>METRO TRANSFER ROUTE</Text>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.priceTagText}>₹25</Text>
              </View>
            </View>

            <View style={styles.cardRowBetweenEnd}>
              <View style={styles.timeWrapper}>
                <View style={styles.timeInner}>
                  <Text style={styles.timeBigNumber}>19</Text>
                  <Text style={styles.timeUnit}>Mins</Text>
                </View>
                <Text style={styles.subtext}>1 Transfer • E-105 + Rapid Metro</Text>
              </View>
            </View>

            <View style={styles.visualStreamMetro}>
              <View style={styles.streamItemPrimary}>
                <MaterialIcons name="directions-bus" size={16} color={Colors.dark.primary} />
                <Text style={styles.streamTextPrimary}>E-105</Text>
              </View>
              <MaterialIcons name="chevron-right" size={16} color="rgba(255,255,255,0.2)" />
              <View style={styles.streamItem}>
                <MaterialIcons name="swap-horiz" size={16} color="#ffba79" />
              </View>
              <MaterialIcons name="chevron-right" size={16} color="rgba(255,255,255,0.2)" />
              <View style={styles.streamItemMetro}>
                <MaterialIcons name="train" size={16} color="#00B0FF" />
                <Text style={styles.streamTextPrimary}>L1</Text>
              </View>
              <MaterialIcons name="chevron-right" size={16} color="rgba(255,255,255,0.2)" />
              <View style={styles.streamItem}>
                <MaterialIcons name="location-on" size={16} color={Colors.dark.error} />
              </View>
            </View>
          </Pressable>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  radialMock: {
    width: '100%',
    height: '100%',
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
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    letterSpacing: -0.5,
  },
  clearButton: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.secondary,
  },
  inputCard: {
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: Spacing.md,
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  visualConnection: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  originDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
    borderWidth: 2,
    borderColor: 'rgba(0, 230, 118, 0.4)',
  },
  dashedLine: {
    flex: 1,
    width: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginVertical: 4,
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00B0FF',
  },
  inputsWrapper: {
    flex: 1,
    marginLeft: Spacing.xs,
  },
  inputRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
  },
  activeInputRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: '#00B0FF',
    shadowColor: '#00B0FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.text,
    marginLeft: Spacing.sm,
  },
  closeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: Spacing.sm,
    marginVertical: 4,
  },
  swapButtonWrapper: {
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    borderRadius: Radii.md,
    height: 56,
    marginBottom: Spacing.xl,
    gap: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  findButtonDisabled: {
    backgroundColor: 'rgba(117, 255, 158, 0.3)',
    shadowOpacity: 0,
  },
  findButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 18,
    fontWeight: '700',
    color: '#003918',
  },
  chipsContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  chip: {
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
  chipPrimary: {
    backgroundColor: 'rgba(117,255,158,0.1)',
    borderColor: 'rgba(117,255,158,0.3)',
  },
  chipText: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: Colors.dark.textSecondary,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#94A3B8',
    marginBottom: Spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  historyIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(50, 60, 51, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTextWrapper: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  recentTitle: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  recentSubtitle: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginTop: 2,
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: 56,
    marginVertical: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sortButtonText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    fontWeight: '600',
    color: '#00B0FF',
  },
  routeCard: {
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  routeCardPrimary: {
    backgroundColor: 'rgba(18, 24, 36, 0.9)',
    borderColor: Colors.dark.primary,
  },
  cardGlowMock: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cardRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  badgeFastest: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(117,255,158,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(117,255,158,0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  badgeFastestText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.dark.primary,
  },
  badgeMetro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,176,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,176,255,0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  badgeMetroText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: '#00B0FF',
  },
  priceTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  priceTagText: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  cardRowBetweenEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.sm,
  },
  timeWrapper: {
    flexDirection: 'column',
  },
  timeInner: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  timeBigNumber: {
    fontFamily: Typography.family.sans,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
    color: Colors.dark.text,
    lineHeight: 48,
  },
  timeUnit: {
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.textSecondary,
  },
  departText: {
    fontFamily: Typography.family.sans,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.primary,
    marginTop: 4,
  },
  subtext: {
    fontFamily: Typography.family.sans,
    fontSize: 13,
    color: Colors.dark.textSecondary,
    marginTop: 4,
  },
  seatsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 6,
  },
  seatsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.primary,
  },
  seatsText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.dark.textSecondary,
  },
  visualStream: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(25, 34, 26, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  visualStreamMetro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 38, 56, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  streamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streamText: {
    fontFamily: Typography.family.sans,
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  streamItemPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  streamItemMetro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  streamTextPrimary: {
    fontFamily: Typography.family.sans,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.text,
  }
});
