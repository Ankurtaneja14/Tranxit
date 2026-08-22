import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';
import { AuthAPI } from '@/api/auth';
import { useAppContext } from '@/context/AppContext';

const OTP_LENGTH = 4;

export default function VerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setPhoneNumber: savePhoneContext } = useAppContext();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Animations
  const progressAnim = useRef(new Animated.Value(0.5)).current;
  const otpOpacityAnim = useRef(new Animated.Value(0)).current;
  const otpTranslateY = useRef(new Animated.Value(20)).current;

  // Refs
  const otpInputRef = useRef<TextInput>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10 || isLoading) return;
    
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      await AuthAPI.sendOtp(phoneNumber);
      
      setStep(2);
      setTimer(30);
      setOtp('');
      
      // Animate Progress Bar
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      // Reveal OTP Section smoothly
      Animated.parallel([
        Animated.timing(otpOpacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(otpTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Focus the hidden OTP input after animation
        setTimeout(() => otpInputRef.current?.focus(), 100);
      });
    } catch (e: any) {
      setErrorMsg(e.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPhone = () => {
    if (isLoading) return;
    setStep(1);
    setErrorMsg('');
    
    Animated.timing(progressAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.parallel([
      Animated.timing(otpOpacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(otpTranslateY, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleVerify = async () => {
    if (otp.length === OTP_LENGTH && !isLoading) {
      setIsLoading(true);
      setErrorMsg('');
      
      try {
        await AuthAPI.verifyOtp(phoneNumber, otp);
        await savePhoneContext(phoneNumber);
        // Verification success -> City Selection
        router.replace('/city-selection');
      } catch (e: any) {
        setErrorMsg(e.message || 'Invalid OTP');
        // Shake animation could go here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderOtpBoxes = () => {
    return Array(OTP_LENGTH).fill(0).map((_, index) => {
      const isFocused = otp.length === index && step === 2;
      const isFilled = otp.length > index;
      const char = otp[index] || '';

      return (
        <View
          key={index}
          style={[
            styles.otpBox,
            isFocused && styles.otpBoxFocused,
            isFilled && styles.otpBoxFilled,
          ]}>
          <Text style={[styles.otpText, isFocused && styles.otpTextFocused]}>
            {isFilled ? char : isFocused ? '|' : '-'}
          </Text>
        </View>
      );
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      {/* Ambient Background Glow */}
      <View style={styles.ambientGlowPrimary} />
      <View style={styles.ambientGlowSecondary} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable 
          onPress={() => router.back()} 
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.dark.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Sign In or Register</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressTrack}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }) 
            }
          ]} 
        />
      </View>

      <View style={styles.content}>
        
        {/* Intro */}
        <View style={styles.introContainer}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="smartphone" size={24} color={Colors.dark.secondary} />
          </View>
          <Text style={styles.title}>Enter Mobile Number</Text>
          <Text style={styles.subtitle}>We'll send a 4-digit verification code to confirm your identity.</Text>
        </View>

        {/* Phone Input */}
        <View style={[styles.phoneInputContainer, step === 2 && styles.inputDisabled]}>
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>🇮🇳 +91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="98765 43210"
            placeholderTextColor={Colors.dark.textSecondary}
            keyboardType="number-pad"
            maxLength={10}
            editable={step === 1}
            autoFocus
          />
        </View>

        {/* OTP Section (Revealed in Step 2) */}
        <Animated.View 
          style={[
            styles.otpSection, 
            { 
              opacity: otpOpacityAnim, 
              transform: [{ translateY: otpTranslateY }],
              // Pointer events none when hidden so it doesn't block touches
              pointerEvents: step === 2 ? 'auto' : 'none' 
            }
          ]}>
          
          <View style={styles.otpHeaderRow}>
            <View>
              <Text style={styles.otpLabel}>VERIFICATION CODE</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.otpSentText}>Sent to +91 {phoneNumber}</Text>
                <Pressable onPress={handleEditPhone} hitSlop={10} disabled={isLoading}>
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
              </View>
            </View>
          </View>
          
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : null}

          <Pressable 
            onPress={() => otpInputRef.current?.focus()} 
            style={styles.otpBoxesContainer}>
            {renderOtpBoxes()}
            
            <TextInput
              ref={otpInputRef}
              style={styles.hiddenOtpInput}
              value={otp}
              onChangeText={(text) => {
                setOtp(text);
                if (errorMsg) setErrorMsg('');
              }}
              keyboardType="number-pad"
              maxLength={OTP_LENGTH}
              caretHidden={true}
            />
          </Pressable>

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.resendText}>Resend code in {timer}s</Text>
            ) : (
              <Pressable onPress={() => {
                if (!isLoading) {
                  AuthAPI.sendOtp(phoneNumber).then(() => setTimer(30));
                }
              }}>
                <Text style={styles.resendActionText}>Resend Code</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Action Button */}
        <Pressable
          disabled={isLoading}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && { transform: [{ scale: 0.98 }] },
            ((step === 1 && phoneNumber.length < 10) || (step === 2 && otp.length < OTP_LENGTH) || isLoading) 
              && styles.actionButtonDisabled
          ]}
          onPress={step === 1 ? handleSendOtp : handleVerify}>
          <Text style={styles.actionButtonText}>
            {isLoading ? 'Please wait...' : (step === 1 ? 'Send OTP' : 'Verify & Continue')}
          </Text>
          {!isLoading && (
            <MaterialIcons 
              name="arrow-forward" 
              size={20} 
              color={((step === 1 && phoneNumber.length < 10) || (step === 2 && otp.length < OTP_LENGTH)) ? 'rgba(0,33,11,0.5)' : '#00210b'} 
            />
          )}
        </Pressable>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  ambientGlowPrimary: {
    position: 'absolute',
    top: '20%',
    left: '-20%',
    width: 250,
    height: 250,
    borderRadius: Radii.full,
    backgroundColor: Colors.dark.primary,
    opacity: 0.15,
    transform: [{ scale: 1.5 }],
    filter: 'blur(50px)', // Experimental on web/new RN
  },
  ambientGlowSecondary: {
    position: 'absolute',
    bottom: '20%',
    right: '-20%',
    width: 250,
    height: 250,
    borderRadius: Radii.full,
    backgroundColor: Colors.dark.secondary,
    opacity: 0.15,
    transform: [{ scale: 1.5 }],
    filter: 'blur(50px)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingBottom: Spacing.sm,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
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
  },
  progressTrack: {
    height: 2,
    backgroundColor: Colors.dark.surface,
    width: '100%',
    marginTop: Spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    zIndex: 10,
  },
  introContainer: {
    marginBottom: Spacing.xl,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.headlineLg,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.bodySm,
    lineHeight: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(30, 38, 56, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    paddingRight: Spacing.md,
    marginRight: Spacing.md,
  },
  prefixText: {
    color: Colors.dark.text,
    fontFamily: Typography.family.sans,
    fontSize: 16,
    fontWeight: '700',
  },
  phoneInput: {
    flex: 1,
    color: Colors.dark.text,
    fontFamily: Typography.family.mono,
    fontSize: 17,
    letterSpacing: 2,
    height: '100%',
  },
  otpSection: {
    // Hidden initially by Animated opacity
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  otpLabel: {
    color: Colors.dark.primary,
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  otpSentText: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: 13,
  },
  errorText: {
    color: Colors.dark.error,
    fontFamily: Typography.family.sans,
    fontSize: 13,
    marginBottom: Spacing.sm,
    marginTop: -Spacing.sm,
  },
  editText: {
    color: Colors.dark.secondary,
    fontFamily: Typography.family.sans,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.surfaceHigh,
  },
  otpBoxFocused: {
    borderColor: Colors.dark.secondary,
    shadowColor: Colors.dark.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  otpText: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontFamily: Typography.family.sans,
    fontSize: 24,
    fontWeight: '600',
  },
  otpTextFocused: {
    color: Colors.dark.secondary,
  },
  hiddenOtpInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  resendContainer: {
    marginTop: Spacing.md,
  },
  resendText: {
    color: Colors.dark.textSecondary,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.bodySm,
  },
  resendActionText: {
    color: Colors.dark.primary,
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.bodySm,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.primary,
    height: 56,
    borderRadius: Radii.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  actionButtonDisabled: {
    backgroundColor: 'rgba(0, 230, 118, 0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButtonText: {
    color: '#00210b',
    fontFamily: Typography.family.sans,
    fontSize: Typography.sizes.titleMd,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
});
