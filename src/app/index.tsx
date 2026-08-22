import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'The Metro on Road\nfor Haryana',
    description: 'Track real-time e-buses, predict zero-wait ETAs, and scan-to-board cashlessly across Panipat, Gurugram, and 7+ major cities.',
  },
  {
    id: '2',
    title: 'Live Radar\nTracking',
    description: 'Never miss a bus again. Watch your ride approach on the live interactive map and set alarms.',
  },
  {
    id: '3',
    title: 'Cashless &\nContactless',
    description: 'Buy passes and tickets instantly using UPI. Just scan and board securely without any hassle.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted = () => {
    router.push('/verification');
  };

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      {/* Background Radial Gradient Effect (simulated with nested views and opacity) */}
      <View style={styles.backgroundGlow} />

      {/* Skip Button */}
      <View style={[styles.header, { top: insets.top + Spacing.md }]}>
        <Pressable
          hitSlop={20}
          onPress={handleGetStarted}
          style={({ pressed }) => [styles.skipButton, pressed && styles.skipButtonPressed]}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Hero Image Section */}
      <View style={styles.heroContainer}>
        {/* Subtle glow behind image */}
        <View style={styles.heroGlow} />
        <Image
          source={require('@/assets/images/onboarding-bus.png')}
          style={styles.heroImage}
          contentFit="contain"
          transition={500}
        />
      </View>

      {/* Content Section (Glassmorphism card + Carousel) */}
      <View style={[styles.contentSection, { paddingBottom: insets.bottom + Spacing.xl }]}>
        
        {/* Pill Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeEmoji}>⚡</Text>
          <Text style={styles.badgeText}>HARYANA CITY BUS SERVICE</Text>
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={SLIDES}
            ref={flatListRef}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />
        </View>

        {/* Indicators */}
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [6, 28, 6],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity },
                ]}
              />
            );
          })}
        </View>

        {/* CTA Button */}
        <Pressable
          style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
          onPress={handleGetStarted}>
          <Text style={styles.ctaText}>Get Started</Text>
          <Text style={styles.ctaIcon}>→</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  backgroundGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark.surface,
    opacity: 0.3,
  },
  header: {
    position: 'absolute',
    right: Spacing.marginMobile,
    zIndex: 50,
  },
  skipButton: {
    padding: Spacing.sm,
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
  skipText: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.bodySm,
    fontWeight: '500',
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl * 2,
  },
  heroGlow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: Radii.full,
    backgroundColor: Colors.dark.primary,
    opacity: 0.15,
    transform: [{ scaleX: 1.5 }],
  },
  heroImage: {
    width: 320,
    height: 280,
    zIndex: 10,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.xl,
    // Glassmorphism effect via semi-transparent background
    backgroundColor: 'rgba(30, 38, 56, 0.4)',
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.dark.primary,
    marginBottom: Spacing.lg,
  },
  badgeEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  badgeText: {
    color: Colors.dark.primary,
    fontFamily: Typography.family.mono,
    fontSize: Typography.sizes.labelCaps,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  carouselContainer: {
    height: 160,
  },
  slide: {
    width: width - (Spacing.marginMobile * 2), // accounts for container padding
    paddingRight: Spacing.lg,
  },
  title: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.headlineLg,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: Spacing.md,
  },
  description: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.bodyLg,
    lineHeight: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginBottom: Spacing.lg,
  },
  dot: {
    height: 6,
    borderRadius: Radii.full,
    backgroundColor: Colors.dark.primary,
    marginRight: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    color: '#00210b', // Deep green/black for high contrast
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.titleMd,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  ctaIcon: {
    color: '#00210b',
    fontSize: 22,
    fontWeight: '700',
  },
});
