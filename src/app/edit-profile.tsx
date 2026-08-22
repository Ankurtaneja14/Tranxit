import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';
import { TranslatedText } from '@/components/TranslatedText';
import { useAppContext } from '@/context/AppContext';

const { width } = Dimensions.get('window');

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userName, phoneNumber, setUserName, setPhoneNumber } = useAppContext();

  const [nameInput, setNameInput] = useState(userName);
  const [phoneInput, setPhoneInput] = useState(phoneNumber);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (nameInput.trim() === '' || phoneInput.trim() === '') {
      Alert.alert("Error", "Fields cannot be empty.");
      return;
    }
    
    setIsSaving(true);
    await setUserName(nameInput);
    await setPhoneNumber(phoneInput);
    setIsSaving(false);
    
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['rgba(0, 176, 255, 0.1)', 'transparent']}
          style={styles.radialTopRight}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </View>

      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.dark.textSecondary} />
        </Pressable>
        <TranslatedText style={styles.headerTitle}>Edit Profile</TranslatedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        
        <View style={styles.inputGroup}>
          <TranslatedText style={styles.label}>Full Name</TranslatedText>
          <View style={styles.inputRow}>
            <MaterialIcons name="person" size={20} color={Colors.dark.primary} />
            <TextInput
              style={styles.textInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Enter your name"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <TranslatedText style={styles.label}>Phone Number</TranslatedText>
          <View style={styles.inputRow}>
            <MaterialIcons name="phone" size={20} color={Colors.dark.primary} />
            <TextInput
              style={styles.textInput}
              value={phoneInput}
              onChangeText={setPhoneInput}
              placeholder="Enter your phone number"
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
          <TranslatedText style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save Profile'}</TranslatedText>
        </Pressable>

      </View>
    </KeyboardAvoidingView>
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
  inputGroup: { marginBottom: Spacing.xl },
  label: { fontFamily: Typography.family.mono, fontSize: 12, fontWeight: '700', color: Colors.dark.textSecondary, marginBottom: Spacing.sm },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 38, 56, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  textInput: { flex: 1, marginLeft: Spacing.sm, fontFamily: Typography.family.sans, fontSize: 16, color: Colors.dark.text },
  saveButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: Radii.md,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  saveButtonText: { fontFamily: Typography.family.sans, fontSize: 16, fontWeight: '700', color: '#003918' },
});
