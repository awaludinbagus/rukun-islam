import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export function OfflineIndicator({ compact = false }: { compact?: boolean }) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  if (compact) {
    return (
      <View
        style={[
          styles.badgeCompact,
          {
            backgroundColor: scheme === 'dark' ? '#064e3b' : '#ecfdf5',
            borderColor: scheme === 'dark' ? '#059669' : '#a7f3d0',
          },
        ]}>
        <View style={styles.dot} />
        <Text
          style={[
            styles.textCompact,
            { color: scheme === 'dark' ? '#a7f3d0' : '#047857' },
          ]}>
          100% Offline
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: scheme === 'dark' ? '#064e3b' : '#ecfdf5',
          borderColor: scheme === 'dark' ? '#047857' : '#a7f3d0',
        },
      ]}>
      <View style={styles.contentRow}>
        <View style={styles.dot} />
        <View style={styles.textColumn}>
          <Text
            style={[
              styles.title,
              { color: scheme === 'dark' ? '#a7f3d0' : '#047857' },
            ]}>
            Aplikasi Berjalan Penuh Secara Offline
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: scheme === 'dark' ? '#6ee7b7' : '#065f46' },
            ]}>
            Perhitungan hisab astronomi sholat, imsakiyah, hisab kalender puasa, dan zakat dihitung secara lokal tanpa membutuhkan kuota internet.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 8,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  badgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  textCompact: {
    fontSize: 11,
    fontWeight: '700',
  },
});
