import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Colors, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { RUKUN_ISLAM_DATA, RukunItem } from '@/data/rukunIslamData';
import { ArabicBlock } from '@/components/arabic-block';

export default function RukunIslamScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const [selectedRukunId, setSelectedRukunId] = useState<number>(1);
  const selectedItem: RukunItem =
    RUKUN_ISLAM_DATA.find((r) => r.id === selectedRukunId) || RUKUN_ISLAM_DATA[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        {/* Header */}
        <View
          style={[
            styles.headerBanner,
            { backgroundColor: scheme === 'dark' ? '#064e3b' : '#059669' },
          ]}>
          <Text style={styles.headerSubtitle}>Fondasi Utama Agama Islam</Text>
          <Text style={styles.headerTitle}>Panduan Lengkap 5 Rukun Islam</Text>
          <Text style={styles.headerDesc}>
            Pelajari makna, dalil, syarat sah, rukun, tata cara, dan doa setiap rukun secara komprehensif
          </Text>
        </View>

        {/* 5 Rukun Tab Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rukunSelectorScroll}>
          <View style={styles.rukunSelectorRow}>
            {RUKUN_ISLAM_DATA.map((item) => {
              const isSelected = item.id === selectedRukunId;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedRukunId(item.id)}
                  style={[
                    styles.rukunTabBtn,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    isSelected && {
                      backgroundColor: item.color,
                      borderColor: item.color,
                    },
                  ]}>
                  <View
                    style={[
                      styles.numCircle,
                      {
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : item.color,
                      },
                    ]}>
                    <Text style={styles.numCircleText}>{item.id}</Text>
                  </View>
                  <Text
                    style={[
                      styles.rukunTabBtnText,
                      { color: isSelected ? '#ffffff' : colors.text },
                    ]}>
                    {item.title.split('. ')[1]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Detail Rukun Terpilih */}
        <View
          style={[
            styles.mainCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.cardTop}>
            <View style={[styles.badgeLarge, { backgroundColor: selectedItem.color }]}>
              <Text style={styles.badgeLargeText}>RUKUN KE-{selectedItem.id}</Text>
            </View>
            <Text style={[styles.itemTitle, { color: colors.text }]}>{selectedItem.title}</Text>
            <Text style={[styles.itemSubtitle, { color: colors.textSecondary }]}>
              {selectedItem.subtitle}
            </Text>
          </View>

          {/* Dalil Ayat */}
          <ArabicBlock
            title="Dalil Al-Qur'an"
            source={selectedItem.dalil.source}
            arabic={selectedItem.dalil.arabic}
            latin={selectedItem.dalil.latin}
            translation={selectedItem.dalil.translation}
          />

          {/* Ringkasan */}
          <View style={[styles.summaryBox, { backgroundColor: colors.cardAlt }]}>
            <Text style={[styles.summaryTitle, { color: selectedItem.color }]}>Penjelasan & Hakikat:</Text>
            <Text style={[styles.summaryText, { color: colors.text }]}>{selectedItem.summary}</Text>
          </View>

          {/* Syarat-Syarat */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.blockTitle, { color: colors.text }]}>Syarat Sah & Wajib</Text>
            {selectedItem.syarat.map((syarat, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={[styles.bulletDot, { color: selectedItem.color }]}>✓</Text>
                <Text style={[styles.bulletText, { color: colors.text }]}>{syarat}</Text>
              </View>
            ))}
          </View>

          {/* Rukun-Rukun */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.blockTitle, { color: colors.text }]}>Rukun-Rukun Utama</Text>
            {selectedItem.rukun.map((r, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={[styles.bulletDot, { color: selectedItem.color }]}>✦</Text>
                <Text style={[styles.bulletText, { color: colors.text }]}>{r}</Text>
              </View>
            ))}
          </View>

          {/* Tata Cara Step-by-Step */}
          {selectedItem.tataCara.map((section, sIdx) => (
            <View key={sIdx} style={styles.sectionBlock}>
              <Text style={[styles.blockTitle, { color: colors.text }]}>{section.sectionTitle}</Text>
              {section.steps.map((step) => (
                <View
                  key={step.stepNumber}
                  style={[styles.stepItem, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}>
                  <View style={styles.stepItemHeader}>
                    <View style={[styles.stepNumberBadge, { backgroundColor: selectedItem.color }]}>
                      <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                    </View>
                    <Text style={[styles.stepItemTitle, { color: colors.text }]}>{step.title}</Text>
                  </View>
                  <Text style={[styles.stepItemDesc, { color: colors.textSecondary }]}>
                    {step.description}
                  </Text>
                  {step.arabic ? (
                    <ArabicBlock
                      arabic={step.arabic}
                      latin={step.latin}
                      translation={step.translation}
                    />
                  ) : null}
                </View>
              ))}
            </View>
          ))}

          {/* Doa-Doa Spesifik */}
          {selectedItem.doaDoa && selectedItem.doaDoa.length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={[styles.blockTitle, { color: colors.text }]}>Doa & Dzikir Terkait</Text>
              {selectedItem.doaDoa.map((doa, dIdx) => (
                <ArabicBlock
                  key={dIdx}
                  title={doa.title}
                  arabic={doa.arabic}
                  latin={doa.latin}
                  translation={doa.translation}
                />
              ))}
            </View>
          )}

          {/* Hal yang Membatalkan / Larangan */}
          {selectedItem.pembatalAtauLarangan && (
            <View style={[styles.warningBox, { backgroundColor: scheme === 'dark' ? '#450a0a' : '#fef2f2', borderColor: '#f87171' }]}>
              <Text style={styles.warningTitle}>⚠️ {selectedItem.pembatalAtauLarangan.title}</Text>
              {selectedItem.pembatalAtauLarangan.items.map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={{ color: '#dc2626', marginRight: 6 }}>•</Text>
                  <Text style={[styles.bulletText, { color: colors.text }]}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Hikmah & Keutamaan */}
          <View style={[styles.hikmahBox, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}>
            <Text style={[styles.hikmahTitle, { color: selectedItem.color }]}>
              🌟 Hikmah & Keutamaan Ibadah Ini:
            </Text>
            {selectedItem.faedahDanHikmah.map((f, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={[styles.bulletDot, { color: selectedItem.color }]}>★</Text>
                <Text style={[styles.bulletText, { color: colors.text }]}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: BottomTabInset + 60 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    alignItems: 'center',
  },
  innerWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  headerBanner: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
  },
  headerSubtitle: {
    color: '#a7f3d0',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  headerDesc: {
    color: '#d1fae5',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  rukunSelectorScroll: {
    marginBottom: 12,
  },
  rukunSelectorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  rukunTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  numCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numCircleText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  rukunTabBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  mainCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  cardTop: {
    marginBottom: 14,
  },
  badgeLarge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeLargeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  itemSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  summaryBox: {
    padding: 14,
    borderRadius: 12,
    marginVertical: 12,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionBlock: {
    marginVertical: 10,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  bulletDot: {
    width: 20,
    fontWeight: '800',
    fontSize: 13,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  stepItem: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
  },
  stepItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  stepItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  stepItemDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  warningBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginVertical: 12,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#dc2626',
    marginBottom: 6,
  },
  hikmahBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 8,
  },
  hikmahTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
});
