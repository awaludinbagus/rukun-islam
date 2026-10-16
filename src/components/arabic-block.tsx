import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

interface ArabicBlockProps {
  arabic?: string;
  latin?: string;
  translation?: string;
  title?: string;
  source?: string;
}

export function ArabicBlock({ arabic, latin, translation, title, source }: ArabicBlockProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}>
      {title ? (
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>
          {source ? (
            <Text style={[styles.sourceBadge, { color: colors.textSecondary }]}>{source}</Text>
          ) : null}
        </View>
      ) : null}

      {arabic ? (
        <View style={[styles.arabicBox, { backgroundColor: scheme === 'dark' ? '#0b1325' : '#f8fafc' }]}>
          <Text style={[styles.arabicText, { color: colors.text }]}>{arabic}</Text>
        </View>
      ) : null}

      {latin ? (
        <View style={styles.latinBox}>
          <Text style={[styles.latinText, { color: scheme === 'dark' ? '#38bdf8' : '#0369a1' }]}>
            {latin}
          </Text>
        </View>
      ) : null}

      {translation ? (
        <View style={[styles.translationBox, { borderTopColor: colors.border }]}>
          <Text style={[styles.translationLabel, { color: colors.textSecondary }]}>Artinya:</Text>
          <Text style={[styles.translationText, { color: colors.text }]}>"{translation}"</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  sourceBadge: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  arabicBox: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'right',
    fontFamily: 'serif',
    fontWeight: '500',
  },
  latinBox: {
    marginBottom: 8,
  },
  latinText: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
    fontWeight: '500',
  },
  translationBox: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    marginTop: 4,
  },
  translationLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  translationText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
