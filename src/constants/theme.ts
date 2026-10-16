/**
 * Tema dan Warna Aplikasi Rukun Islam
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0f172a',
    background: '#f8fafc',
    backgroundElement: '#ffffff',
    backgroundSelected: '#e2e8f0',
    textSecondary: '#64748b',
    primary: '#059669', // Emerald
    primaryDark: '#047857',
    primaryLight: '#ecfdf5',
    accent: '#d97706', // Amber Gold
    accentLight: '#fffbeb',
    border: '#e2e8f0',
    card: '#ffffff',
    cardAlt: '#f1f5f9',
    success: '#10b981',
    info: '#0284c7',
  },
  dark: {
    text: '#f8fafc',
    background: '#090d16',
    backgroundElement: '#131b2e',
    backgroundSelected: '#1e293b',
    textSecondary: '#94a3b8',
    primary: '#10b981',
    primaryDark: '#059669',
    primaryLight: '#064e3b',
    accent: '#f59e0b',
    accentLight: '#78350f',
    border: '#1e293b',
    card: '#131b2e',
    cardAlt: '#1c2640',
    success: '#34d399',
    info: '#38bdf8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 60, android: 80 }) ?? 60;
export const MaxContentWidth = 900;
