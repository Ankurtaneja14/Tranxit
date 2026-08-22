import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';
import { TranslatedText } from '@/components/TranslatedText';

const { width, height } = Dimensions.get('window');

export default function LiveBusTrackerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dest } = useLocalSearchParams<{ dest?: string }>();
  const destinationName = dest || 'Model Town';

  return (
    <View style={styles.container}>
      {/* Map Background Mock */}
      <View style={StyleSheet.absoluteFillObject}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800' }} 
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(13, 21, 14, 0.7)' }]} />
        
        {/* Mock Route Path on Map */}
        <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
          <Path
            d="M 100 300 Q 200 150 300 400 T 350 200"
            fill="none"
            stroke={Colors.dark.primary}
            strokeWidth="4"
            strokeDasharray="8 8"
          />
          <Circle cx="100" cy="300" r="8" fill={Colors.dark.primary} />
          <Circle cx="350" cy="200" r="8" fill="#ffba79" />
        </Svg>
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.dark.text} />
        </Pressable>
        <TranslatedText style={styles.headerTitle}>Live Tracking</TranslatedText>
        <Pressable style={styles.backBtn}>
          <MaterialIcons name="share-location" size={24} color={Colors.dark.text} />
        </Pressable>
      </View>

      {/* Floating Alerts */}
      <View style={styles.alertContainer}>
        <View style={styles.alertBox}>
          <MaterialIcons name="warning" size={16} color="#ffba79" />
          <TranslatedText style={styles.alertText}>Slight delay due to traffic at Sector 14</TranslatedText>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.sheetContainer}>
        <BlurView intensity={80} tint="dark" style={styles.sheetBlur}>
          <LinearGradient
            colors={['rgba(30,38,56,0.8)', 'rgba(13,21,14,0.95)']}
            style={StyleSheet.absoluteFillObject}
          />
          
          {/* Drag Handle */}
          <View style={styles.dragHandleWrapper}>
            <View style={styles.dragHandle} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom || Spacing.xl }}>
            {/* Bus Info Header */}
            <View style={styles.busInfoHeader}>
              <View style={styles.busInfoLeft}>
                <View style={styles.busBadge}>
                  <MaterialIcons name="directions-bus" size={16} color="#003918" />
                  <Text style={styles.busBadgeText}>E-102</Text>
                </View>
                <View style={styles.etaBox}>
                  <TranslatedText style={styles.etaNumber}>4</TranslatedText>
                  <TranslatedText style={styles.etaText}>mins away</TranslatedText>
                </View>
              </View>
              
              <View style={styles.capacityBox}>
                <TranslatedText style={styles.capacityLabel}>CAPACITY</TranslatedText>
                <TranslatedText style={styles.capacityValue}>40% Full</TranslatedText>
                <View style={styles.capacityBarBg}>
                  <View style={[styles.capacityBarFill, { width: '40%' }]} />
                </View>
              </View>
            </View>

            {/* Destination Info */}
            <View style={styles.destInfo}>
              <TranslatedText style={styles.destSub}>Towards</TranslatedText>
              <TranslatedText style={styles.destTitle}>{destinationName}</TranslatedText>
            </View>

            {/* Timeline */}
            <View style={styles.timeline}>
              <TranslatedText style={styles.timelineHeader}>UPCOMING STOPS</TranslatedText>
              
              <View style={styles.timelineItem}>
                <View style={styles.timelineLine} />
                <View style={styles.timelineDotActive}>
                  <View style={styles.timelineDotInner} />
                </View>
                <View style={styles.timelineContent}>
                  <View>
                    <TranslatedText style={styles.stopNameActive}>Sector 11 Market</TranslatedText>
                    <TranslatedText style={styles.stopSubActive}>Boarding Stop</TranslatedText>
                  </View>
                  <TranslatedText style={styles.stopTimeActive}>10:31 AM</TranslatedText>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={styles.timelineLine} />
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <View>
                    <TranslatedText style={styles.stopName}>Sector 14 Cross</TranslatedText>
                  </View>
                  <TranslatedText style={styles.stopTime}>10:38 AM</TranslatedText>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={styles.timelineDotDest} />
                <View style={styles.timelineContent}>
                  <View>
                    <TranslatedText style={styles.stopNameDest}>{destinationName}</TranslatedText>
                    <TranslatedText style={styles.stopSub}>Drop-off</TranslatedText>
                  </View>
                  <TranslatedText style={styles.stopTime}>10:45 AM</TranslatedText>
                </View>
              </View>
            </View>
          </ScrollView>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile, paddingBottom: Spacing.md,
  },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30, 38, 56, 0.5)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  headerTitle: { fontFamily: Typography.family.sans, fontSize: 18, fontWeight: '700', color: Colors.dark.text, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },
  alertContainer: { position: 'absolute', top: 100, left: Spacing.marginMobile, right: Spacing.marginMobile, zIndex: 10, alignItems: 'center' },
  alertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(45, 22, 0, 0.8)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radii.full, gap: 8, borderWidth: 1, borderColor: 'rgba(255, 186, 121, 0.3)' },
  alertText: { fontFamily: Typography.family.sans, fontSize: 12, fontWeight: '600', color: '#ffba79' },
  sheetContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: height * 0.65, borderTopLeftRadius: Radii.xl, borderTopRightRadius: Radii.xl, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sheetBlur: { flex: 1 },
  dragHandleWrapper: { alignItems: 'center', paddingTop: Spacing.md, paddingBottom: Spacing.md },
  dragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)' },
  busInfoHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.marginMobile, marginBottom: Spacing.lg },
  busInfoLeft: { gap: 8 },
  busBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.dark.primary, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radii.sm, gap: 6, shadowColor: Colors.dark.primary, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  busBadgeText: { fontFamily: Typography.family.mono, fontSize: 14, fontWeight: '800', color: '#003918' },
  etaBox: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  etaNumber: { fontFamily: Typography.family.sans, fontSize: 32, fontWeight: '800', color: Colors.dark.text, letterSpacing: -1 },
  etaText: { fontFamily: Typography.family.sans, fontSize: 14, color: Colors.dark.textSecondary, fontWeight: '600' },
  capacityBox: { backgroundColor: 'rgba(255,255,255,0.05)', padding: Spacing.sm, borderRadius: Radii.md, minWidth: 100 },
  capacityLabel: { fontFamily: Typography.family.mono, fontSize: 10, color: Colors.dark.textSecondary, marginBottom: 2 },
  capacityValue: { fontFamily: Typography.family.sans, fontSize: 14, fontWeight: '700', color: Colors.dark.text, marginBottom: 8 },
  capacityBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 },
  capacityBarFill: { height: 4, backgroundColor: Colors.dark.primary, borderRadius: 2 },
  destInfo: { paddingHorizontal: Spacing.marginMobile, paddingBottom: Spacing.xl, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  destSub: { fontFamily: Typography.family.sans, fontSize: 12, color: Colors.dark.textSecondary, marginBottom: 4 },
  destTitle: { fontFamily: Typography.family.sans, fontSize: 24, fontWeight: '700', color: Colors.dark.text },
  timeline: { paddingHorizontal: Spacing.marginMobile, paddingTop: Spacing.xl },
  timelineHeader: { fontFamily: Typography.family.mono, fontSize: 12, fontWeight: '700', color: Colors.dark.textSecondary, letterSpacing: 1, marginBottom: Spacing.xl },
  timelineItem: { flexDirection: 'row', marginBottom: Spacing.xl, position: 'relative' },
  timelineLine: { position: 'absolute', left: 11, top: 24, bottom: -40, width: 2, backgroundColor: 'rgba(255,255,255,0.1)' },
  timelineDotActive: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0, 230, 118, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  timelineDotInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.dark.primary, shadowColor: Colors.dark.primary, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 6, marginTop: 6, marginRight: Spacing.md + 6 },
  timelineDotDest: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.dark.text, marginHorizontal: 4, marginTop: 4, marginRight: Spacing.md + 4 },
  timelineContent: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  stopNameActive: { fontFamily: Typography.family.sans, fontSize: 16, fontWeight: '700', color: Colors.dark.text },
  stopSubActive: { fontFamily: Typography.family.sans, fontSize: 12, color: Colors.dark.primary, marginTop: 2 },
  stopTimeActive: { fontFamily: Typography.family.sans, fontSize: 14, fontWeight: '600', color: Colors.dark.text },
  stopName: { fontFamily: Typography.family.sans, fontSize: 16, color: Colors.dark.textSecondary, marginTop: 2 },
  stopTime: { fontFamily: Typography.family.sans, fontSize: 14, color: Colors.dark.textSecondary, marginTop: 2 },
  stopNameDest: { fontFamily: Typography.family.sans, fontSize: 16, fontWeight: '700', color: Colors.dark.text },
  stopSub: { fontFamily: Typography.family.sans, fontSize: 12, color: Colors.dark.textSecondary, marginTop: 2 },
});
