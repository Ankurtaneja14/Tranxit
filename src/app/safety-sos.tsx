import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';
import { TranslatedText } from '@/components/TranslatedText';

const { width } = Dimensions.get('window');

export default function SafetySosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [isPressing, setIsPressing] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setIsPressing(true);
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressing(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['rgba(255, 82, 82, 0.1)', 'transparent']}
          style={styles.radialTopRight}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </View>

      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.dark.textSecondary} />
        </Pressable>
        <TranslatedText style={styles.headerTitle}>Emergency SOS</TranslatedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.sosContainer}>
          <Animated.View style={[styles.sosOuterRing, { transform: [{ scale: scaleAnim }] }]}>
            <Animated.View style={styles.sosInnerRing}>
              <Pressable
                style={styles.sosButton}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onLongPress={() => alert('Emergency SOS Activated!')}
                delayLongPress={2000}
              >
                <MaterialIcons name="emergency" size={64} color="#FFF" />
                <TranslatedText style={styles.sosText}>SOS</TranslatedText>
              </Pressable>
            </Animated.View>
          </Animated.View>
          
          <TranslatedText style={styles.sosInstruction}>Press and hold for 3 seconds to alert authorities</TranslatedText>
        </View>

        <View style={styles.quickActions}>
          <TranslatedText style={styles.sectionTitle}>QUICK ACTIONS</TranslatedText>
          
          <Pressable style={styles.actionCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 176, 255, 0.1)' }]}>
              <MaterialIcons name="local-police" size={24} color="#00B0FF" />
            </View>
            <View style={styles.actionTextCol}>
              <TranslatedText style={styles.actionTitle}>Call Police 112</TranslatedText>
              <TranslatedText style={styles.actionSub}>Connect to emergency services immediately</TranslatedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
          </Pressable>

          <Pressable style={styles.actionCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(117, 255, 158, 0.1)' }]}>
              <MaterialIcons name="share-location" size={24} color={Colors.dark.primary} />
            </View>
            <View style={styles.actionTextCol}>
              <TranslatedText style={styles.actionTitle}>Share Live Location</TranslatedText>
              <TranslatedText style={styles.actionSub}>Send real-time bus tracking to contacts</TranslatedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
          </Pressable>

          <Pressable style={styles.actionCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 186, 121, 0.1)' }]}>
              <MaterialIcons name="report-problem" size={24} color="#ffba79" />
            </View>
            <View style={styles.actionTextCol}>
              <TranslatedText style={styles.actionTitle}>Report Incident</TranslatedText>
              <TranslatedText style={styles.actionSub}>Log a non-emergency safety issue anonymously</TranslatedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.dark.textSecondary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  radialTopRight: { position: 'absolute', top: 0, right: 0, width: width, height: width },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingBottom: Spacing.md,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontFamily: Typography.family.sans, fontSize: 20, fontWeight: '700', color: Colors.dark.text },
  content: { flex: 1, paddingHorizontal: Spacing.marginMobile, paddingTop: Spacing.xl },
  sosContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  sosOuterRing: {
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255, 82, 82, 0.2)',
  },
  sosInnerRing: {
    width: 190, height: 190, borderRadius: 95,
    backgroundColor: 'rgba(255, 82, 82, 0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  sosButton: {
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: Colors.dark.error,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.dark.error, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30,
  },
  sosText: { fontFamily: Typography.family.sans, fontSize: 24, fontWeight: '800', color: '#FFF', marginTop: 4 },
  sosInstruction: { fontFamily: Typography.family.sans, fontSize: 14, color: Colors.dark.textSecondary, marginTop: Spacing.xl, textAlign: 'center' },
  quickActions: { flex: 1, marginTop: Spacing.xl },
  sectionTitle: { fontFamily: Typography.family.mono, fontSize: 12, fontWeight: '700', color: Colors.dark.textSecondary, letterSpacing: 1, marginBottom: Spacing.md },
  actionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30, 38, 56, 0.5)', padding: Spacing.md, borderRadius: Radii.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  actionTextCol: { flex: 1 },
  actionTitle: { fontFamily: Typography.family.sans, fontSize: 16, fontWeight: '600', color: Colors.dark.text },
  actionSub: { fontFamily: Typography.family.sans, fontSize: 12, color: Colors.dark.textSecondary, marginTop: 2 },
});
