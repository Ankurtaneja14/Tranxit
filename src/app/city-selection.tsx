import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';

const CITIES = [
  { id: 'ambala', name: 'Ambala', routes: '8 E-Bus Routes' },
  { id: 'faridabad', name: 'Faridabad', routes: '30 E-Bus Routes' },
  { id: 'gurugram', name: 'Gurugram', routes: '45 E-Bus Routes' },
  { id: 'hisar', name: 'Hisar', routes: '15 E-Bus Routes' },
  { id: 'karnal', name: 'Karnal', routes: '14 E-Bus Routes' },
  { id: 'kurukshetra', name: 'Kurukshetra', routes: '9 E-Bus Routes' },
  { id: 'panipat', name: 'Panipat', routes: '12 E-Bus Routes' },
  { id: 'panchkula', name: 'Panchkula', routes: '20 E-Bus Routes' },
  { id: 'rewari', name: 'Rewari', routes: '6 E-Bus Routes' },
  { id: 'rohtak', name: 'Rohtak', routes: '10 E-Bus Routes' },
  { id: 'sonipat', name: 'Sonipat', routes: '18 E-Bus Routes' },
  { id: 'yamunanagar', name: 'Yamunanagar', routes: '11 E-Bus Routes' },
];

export default function CitySelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [selectedCity, setSelectedCity] = useState<string | null>('panipat');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState('Tap to locate...');
  const [isLocating, setIsLocating] = useState(false);

  // Radar Pulse Animation
  const pulseAnim = useSharedValue(0);

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.out(Easing.ease),
      }),
      -1, // infinite
      false
    );
  }, []);

  const animatedPulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 0.7, 1], [1, 1.05, 1]);
    const opacity = interpolate(pulseAnim.value, [0, 0.7, 1], [0.4, 0, 0]);
    
    return {
      transform: [{ scale }],
      shadowOpacity: opacity,
      shadowRadius: interpolate(pulseAnim.value, [0, 0.7], [0, 20]),
    };
  });

  const handleLaunch = () => {
    // Proceed to tabs
    router.replace('/(tabs)');
  };

  const handleUseCurrentLocation = async () => {
    setUseCurrentLocation(true);
    setSelectedCity(null);
    setIsLocating(true);
    setDetectedLocation('Requesting permission...');

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setDetectedLocation('Permission denied');
        setIsLocating(false);
        return;
      }

      setDetectedLocation('Locating GPS...');
      const location = await Location.getCurrentPositionAsync({});
      
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        const place = geocode[0];
        const city = place.city || place.subregion || place.region || 'Unknown City';
        const region = place.region || '';
        setDetectedLocation(region ? `${city}, ${region}` : city);
      } else {
        setDetectedLocation('Location found, city unknown');
      }
    } catch (e) {
      setDetectedLocation('Failed to get location');
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Neo-Gradient Background */}
      <View style={styles.gradientTopRight} />
      <View style={styles.gradientBottomLeft} />

      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View style={styles.headerRow}>
          <Pressable 
            onPress={() => router.back()} 
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.dark.textSecondary} />
          </Pressable>
          <Text style={styles.headerTitle}>Location Setup</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}>
        
        {/* Header Text */}
        <View style={styles.headerSection}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>STEP 2 OF 2 • LOCATION</Text>
          </View>
          <Text style={styles.title}>Select Your City</Text>
          <Text style={styles.subtitle}>
            Choose your primary commuting hub to personalize real-time route data and smart card settings.
          </Text>
        </View>

        {/* GPS Card */}
        <Pressable 
          disabled={isLocating}
          style={({ pressed }) => [
            styles.gpsCard,
            useCurrentLocation && styles.selectedCard,
            pressed && { transform: [{ scale: 0.98 }] }
          ]}
          onPress={handleUseCurrentLocation}>
          
          <Animated.View style={[styles.radarIconWrapper, (useCurrentLocation || isLocating) && animatedPulseStyle]}>
            <MaterialIcons name={isLocating ? "hourglass-empty" : "my-location"} size={20} color={Colors.dark.primary} />
          </Animated.View>

          <View style={styles.gpsTextContainer}>
            <Text style={styles.gpsTitle}>Use Current Location</Text>
            <Text style={styles.gpsSubtitle}>
              {useCurrentLocation ? `Detected: ${detectedLocation}` : 'Tap to locate...'}
            </Text>
          </View>

          {useCurrentLocation && !isLocating && (
            <View style={styles.checkIcon}>
              <MaterialIcons name="check" size={16} color="#00210b" />
            </View>
          )}
        </Pressable>

        {/* City Grid */}
        <View style={styles.gridSection}>
          <Text style={styles.orLabel}>OR CHOOSE FROM SUPPORTED CITIES</Text>
          
          <View style={styles.grid}>
            {CITIES.map((city) => {
              const isSelected = selectedCity === city.id;
              
              return (
                <Pressable
                  key={city.id}
                  style={({ pressed }) => [
                    styles.cityCard,
                    isSelected && styles.selectedCard,
                    pressed && { transform: [{ scale: 0.98 }] }
                  ]}
                  onPress={() => {
                    setSelectedCity(city.id);
                    setUseCurrentLocation(false);
                  }}>
                  <Text style={[styles.cityName, isSelected && { color: Colors.dark.text }]}>
                    {city.name}
                  </Text>
                  <Text style={[styles.cityRoutes, isSelected && { color: 'rgba(117,255,158,0.7)' }]}>
                    {city.routes}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Bottom Fixed Area */}
      <LinearGradient
        colors={['transparent', 'rgba(10,13,18,0.9)', '#0A0D12']}
        locations={[0, 0.4, 1]}
        style={[styles.bottomFixedArea, { paddingBottom: insets.bottom || Spacing.lg }]}>
        
        <Pressable
          style={({ pressed }) => [
            styles.launchButton,
            pressed && { transform: [{ scale: 0.98 }] }
          ]}
          onPress={handleLaunch}>
          <Text style={styles.launchButtonText}>Confirm & Launch TransitX</Text>
          <MaterialIcons name="rocket-launch" size={20} color="#00210b" />
        </Pressable>
        
        <Text style={styles.disclaimerText}>
          Location data is used strictly for routing and real-time ETAs.
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradientTopRight: {
    position: 'absolute',
    top: '-20%',
    right: '-20%',
    width: '60%',
    height: '40%',
    borderRadius: Radii.full,
    backgroundColor: 'rgba(0, 228, 117, 0.05)',
    filter: 'blur(50px)',
  },
  gradientBottomLeft: {
    position: 'absolute',
    bottom: '-20%',
    left: '-20%',
    width: '60%',
    height: '40%',
    borderRadius: Radii.full,
    backgroundColor: 'rgba(0, 175, 254, 0.05)',
    filter: 'blur(50px)',
  },
  header: {
    backgroundColor: 'rgba(10,13,18,0.9)',
    zIndex: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.marginMobile,
    height: 64,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(30, 38, 56, 1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.titleMd,
    fontWeight: '600',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  content: {
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.xl,
  },
  headerSection: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(30, 38, 56, 1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 175, 254, 0.5)',
  },
  stepBadgeText: {
    color: Colors.dark.secondary,
    fontFamily: Typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.headlineLg,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.bodySm,
    lineHeight: 20,
  },
  gpsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  radarIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(117,255,158,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(117,255,158,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    shadowColor: Colors.dark.primary,
  },
  gpsTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  gpsTitle: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gpsSubtitle: {
    color: Colors.dark.primary,
    fontFamily: Typography.family.sans,
    fontSize: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: Radii.full,
    backgroundColor: Colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridSection: {
    gap: Spacing.md,
  },
  orLabel: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  cityCard: {
    width: '47.5%',
    height: 80,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
  },
  selectedCard: {
    backgroundColor: 'rgba(117,255,158,0.05)',
    borderColor: Colors.dark.primary,
  },
  cityName: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cityRoutes: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: 12,
  },
  bottomFixedArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.lg,
    alignItems: 'center',
    zIndex: 10,
  },
  launchButton: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    borderRadius: Radii.full,
    backgroundColor: Colors.dark.primary, // We could use expo-linear-gradient here too, but flat is ok
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: Spacing.sm,
  },
  launchButtonText: {
    color: '#00210b',
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.titleMd,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  disclaimerText: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 280,
  },
});
