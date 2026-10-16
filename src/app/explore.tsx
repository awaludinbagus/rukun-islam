import React from 'react';
import { ScrollView, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { OfflineIndicator } from '@/components/offline-indicator';

export default function ExploreScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        <View
          style={[
            styles.headerBanner,
            { backgroundColor: scheme === 'dark' ? '#064e3b' : '#059669' },
          ]}>
          <Text style={styles.headerSubtitle}>Informasi & Referensi</Text>
          <Text style={styles.headerTitle}>Tentang Aplikasi Rukun Islam</Text>
          <Text style={styles.headerDesc}>
            Aplikasi mandiri 100% offline untuk tata cara 5 rukun Islam, hisab astronomi sholat, kalender puasa, dan zakat
          </Text>
        </View>

        <OfflineIndicator />

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Fitur Utama Aplikasi</Text>
          <View style={styles.featureItem}>
            <Text style={{ fontSize: 20 }}>🕌</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Jadwal Sholat Astronomis Offline</Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Dihitung secara matematis menggunakan rumus hisab Kementerian Agama RI (Fajr 20°, Isha 18°, ikhtiyat 2 menit) untuk 38+ kota besar di Indonesia atau koordinat GPS kustom tanpa perlu koneksi internet.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={{ fontSize: 20 }}>🌙</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Jadwal Imsakiyah & Puasa Sunnah</Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Waktu imsak harian, countdown menuju buka puasa & imsak, kalender puasa sunnah (Senin-Kamis, Ayyamul Bidh 13, 14, 15 Hijriah, Ramadhan, Syawwal, Arafah), niat dan doa berbuka.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={{ fontSize: 20 }}>🪙</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Kalkulator Zakat Komprehensif</Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Perhitungan otomatis untuk Zakat Fitrah (beras/uang), Zakat Maal (nisab 85g emas), Zakat Profesi/Penghasilan bulanan, Zakat Perniagaan, dan Pertanian.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={{ fontSize: 20 }}>📖</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Tata Cara 5 Rukun Islam Lengkap</Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Penjelasan fiqih mendalam mengenai Syahadat, Sholat (termasuk Wudhu & bacaan rukun sholat), Zakat, Puasa, hingga Manasik Haji & Umrah dari hari ke hari.
              </Text>
            </View>
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
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});
