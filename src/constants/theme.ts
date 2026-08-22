/**
 * TransitX Design System
 * 
 * Centralized design tokens based on the frontend UI mockups.
 */

import '@/global.css';

import { Platform } from 'react-native';

const TransitXPalette = {
  primary: '#00e676',
  primaryDim: '#00e475',
  secondary: '#00affe',
  background: '#0d150e',
  surface: '#151e16',
  surfaceHigh: '#19221a',
  onSurface: '#dbe5d9',
  onSurfaceMuted: '#bacbb9',
  outline: '#3b4a3d',
  error: '#ffb4ab',
};

export const Colors = {
  light: {
    text: TransitXPalette.onSurface,
    textSecondary: TransitXPalette.onSurfaceMuted,
    background: TransitXPalette.background,
    backgroundElement: TransitXPalette.surface,
    backgroundSelected: TransitXPalette.surfaceHigh,
    primary: TransitXPalette.primary,
    secondary: TransitXPalette.secondary,
    outline: TransitXPalette.outline,
    error: TransitXPalette.error,
  },
  dark: {
    text: TransitXPalette.onSurface,
    textSecondary: TransitXPalette.onSurfaceMuted,
    background: TransitXPalette.background,
    backgroundElement: TransitXPalette.surface,
    backgroundSelected: TransitXPalette.surfaceHigh,
    primary: TransitXPalette.primary,
    secondary: TransitXPalette.secondary,
    outline: TransitXPalette.outline,
    error: TransitXPalette.error,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Typography = {
  family: Platform.select({
    ios: {
      sans: 'Inter, system-ui',
      mono: 'JetBrains Mono, ui-monospace',
    },
    android: {
      sans: 'Inter, normal',
      mono: 'JetBrains Mono, monospace',
    },
    default: {
      sans: 'Inter, normal',
      mono: 'JetBrains Mono, monospace',
    },
  }),
  sizes: {
    displayLg: 48,
    headlineLg: 32,
    titleMd: 20,
    bodyLg: 16,
    bodySm: 14,
    labelCaps: 12,
  },
};

// Kept for backward compatibility with default expo boilerplate
export const Fonts = Typography.family;

export const Spacing = {
  unit: 4,
  sm: 8,
  md: 16,
  gutter: 16,
  lg: 24,
  xl: 32,
  marginMobile: 20,
  
  // Backward compat for expo boilerplate
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radii = {
  sm: 8,
  md: 16,
  lg: 32,
  xl: 48,
  full: 9999,
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
