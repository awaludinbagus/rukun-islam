import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { useAppSettings } from '@/hooks/use-app-settings';
import {
  calculatePrayerTimes,
  getNextPrayer,
  calculateQiblaDirection,
  PrayerTimesResult,
  NextPrayerInfo,
} from '@/utils/prayerTimes';
import { gregorianToHijri, getFastingInfo } from '@/utils/hijriCalendar';
import { OfflineIndicator } from '@/components/offline-indicator';
import { CitySelectorModal } from '@/components/city-selector-modal';
import { RUKUN_ISLAM_DATA } from '@/data/rukunIslamData';

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const { settings, setCity, setCustomCoordinates } = useAppSettings();
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time ticking every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Astronomical calculations (100% offline)
  const prayerTimes: PrayerTimesResult = calculatePrayerTimes(
    currentTime,
    settings.selectedCity.coordinates,
    settings.selectedCity.timezone
  );

  const nextPrayer: NextPrayerInfo = getNextPrayer(prayerTimes, currentTime);
  const hijriDate = gregorianToHijri(currentTime);
  const todayFasting = getFastingInfo(currentTime);
  const qibla = calculateQiblaDirection(
    settings.selectedCity.coordinates.latitude,
    settings.selectedCity.coordinates.longitude
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        {/* Header Islami */}
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: scheme === 'dark' ? '#064e3b' : '#047857',
            },
          ]}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.arabicBasmalah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
              <Text style={styles.appTitle}>Panduan 5 Rukun Islam</Text>
              <Text style={styles.appSubtitle}>Jadwal Sholat, Puasa & Kalkulator Zakat Offline</Text>
            </View>
            <View style={styles.offlinePill}>
              <View style={styles.greenPulse} />
              <Text style={styles.offlinePillText}>100% Offline</Text>
            </View>
          </View>

          <View style={styles.dateBar}>
            <Text style={styles.dateText}>
              📅 {prayerTimes.dateFormatted} • {hijriDate.formatted}
            </Text>
          </View>
        </View>

        {/* Offline Notice */}
        <OfflineIndicator />

        {/* Kartu Sholat Terkini & Countdown */}
        <View
          style={[
            styles.mainCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.locationRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>LOKASI HISAB ASTRONOMI</Text>
              <Text style={[styles.cityName, { color: colors.text }]}>
                📍 {settings.selectedCity.name}
              </Text>
              <Text style={[styles.citySub, { color: colors.textSecondary }]}>
                {settings.selectedCity.province} ({settings.selectedCity.timezoneLabel}) • Kiblat: {qibla.formatted} {qibla.cardinal}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setCityModalVisible(true)}
              style={[styles.changeCityBtn, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}>
              <Text style={[styles.changeCityText, { color: colors.primary }]}>Ubah Kota</Text>
            </TouchableOpacity>
          </View>

          {/* Next Prayer Spotlight */}
          <View
            style={[
              styles.nextPrayerBanner,
              { backgroundColor: scheme === 'dark' ? '#0f291e' : '#ecfdf5', borderColor: colors.primary },
            ]}>
            <View style={styles.nextPrayerInfo}>
              <Text style={[styles.nextPrayerLabel, { color: colors.primary }]}>
                WAKTU BERIKUTNYA: {nextPrayer.displayName.toUpperCase()}
              </Text>
              <Text style={[styles.nextPrayerTime, { color: colors.text }]}>
                {nextPrayer.timeStr}
              </Text>
            </View>
            <View style={styles.countdownBadge}>
              <Text style={styles.countdownTitle}>Hitung Mundur</Text>
              <Text style={styles.countdownValue}>{nextPrayer.remainingFormatted}</Text>
            </View>
          </View>

          {/* 5 Waktu Sholat Row */}
          <View style={styles.prayerGrid}>
            {[
              { label: 'Subuh', time: prayerTimes.subuh, icon: '🌅' },
              { label: 'Dzuhur', time: prayerTimes.dzuhur, icon: '☀️' },
              { label: 'Ashar', time: prayerTimes.ashar, icon: '🌤️' },
              { label: 'Maghrib', time: prayerTimes.maghrib, icon: '🌇' },
              { label: 'Isya', time: prayerTimes.isya, icon: '🌙' },
            ].map((p) => {
              const isActive = nextPrayer.displayName.toLowerCase().includes(p.label.toLowerCase());
              return (
                <View
                  key={p.label}
                  style={[
                    styles.prayerItem,
                    { backgroundColor: colors.cardAlt, borderColor: colors.border },
                    isActive && {
                      borderColor: colors.primary,
                      backgroundColor: scheme === 'dark' ? '#064e3b' : '#dcfce7',
                    },
                  ]}>
                  <Text style={styles.prayerIcon}>{p.icon}</Text>
                  <Text
                    style={[
                      styles.prayerLabel,
                      { color: isActive ? colors.primary : colors.textSecondary },
                    ]}>
                    {p.label}
                  </Text>
                  <Text
                    style={[
                      styles.prayerTimeText,
                      { color: isActive ? colors.primary : colors.text },
                    ]}>
                    {p.time}
                  </Text>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => router.push('/sholat')}
            style={[styles.fullScheduleLink, { borderTopColor: colors.border }]}>
            <Text style={[styles.linkText, { color: colors.primary }]}>
              Buka Jadwal Lengkap & Panduan Sholat →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Kartu Jadwal Puasa & Imsakiyah Hari Ini */}
        <View
          style={[
            styles.fastingCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.fastingHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                JADWAL IMSAKIYAH & PUASA HARI INI
              </Text>
              <Text style={[styles.fastingTitle, { color: colors.text }]}>
                {todayFasting.isFastingDay ? `✨ ${todayFasting.title}` : '🌙 Jadwal Imsak & Buka Puasa'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/puasa')}
              style={[styles.miniBtn, { backgroundColor: colors.cardAlt }]}>
              <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>
                Kalender Puasa →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imsakiyahRow}>
            <View style={[styles.imsakBox, { backgroundColor: colors.cardAlt }]}>
              <Text style={[styles.imsakLabel, { color: colors.textSecondary }]}>Waktu Imsak</Text>
              <Text style={[styles.imsakTime, { color: colors.accent }]}>{prayerTimes.imsak}</Text>
              <Text style={[styles.imsakHint, { color: colors.textSecondary }]}>Mulai Berpuasa</Text>
            </View>
            <View style={[styles.imsakBox, { backgroundColor: colors.cardAlt }]}>
              <Text style={[styles.imsakLabel, { color: colors.textSecondary }]}>Buka Puasa (Maghrib)</Text>
              <Text style={[styles.imsakTime, { color: colors.primary }]}>{prayerTimes.maghrib}</Text>
              <Text style={[styles.imsakHint, { color: colors.textSecondary }]}>Saat Berbuka</Text>
            </View>
          </View>

          {todayFasting.isFastingDay && todayFasting.niatTextLatin ? (
            <View style={[styles.quickNiat, { backgroundColor: colors.cardAlt }]}>
              <Text style={[styles.quickNiatTitle, { color: colors.primary }]}>Niat Puasa Hari Ini:</Text>
              <Text style={[styles.quickNiatText, { color: colors.text }]}>
                {todayFasting.niatTextArabic}
              </Text>
              <Text style={[styles.quickNiatLatin, { color: colors.textSecondary }]}>
                "{todayFasting.niatTextLatin}"
              </Text>
            </View>
          ) : null}
        </View>

        {/* 5 RUKUN ISLAM - MENU UTAMA */}
        <View style={styles.sectionHeading}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Tata Cara 5 Rukun Islam</Text>
          <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
            Panduan lengkap, syarat sah, rukun, gerakan, dan doa berbahasa Arab & Indonesia
          </Text>
        </View>

        <View style={styles.rukunGrid}>
          {RUKUN_ISLAM_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => {
                if (item.slug === 'sholat') router.push('/sholat');
                else if (item.slug === 'puasa') router.push('/puasa');
                else if (item.slug === 'zakat') router.push('/zakat');
                else router.push('/rukun');
              }}
              style={[
                styles.rukunCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={[styles.rukunNumberBadge, { backgroundColor: item.color }]}>
                <Text style={styles.rukunNumberText}>{item.id}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rukunCardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.rukunCardSub, { color: colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              </View>
              <Text style={[styles.arrowIcon, { color: item.color }]}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pintasan Kalkulator Zakat */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/zakat')}
          style={[
            styles.zakatBanner,
            {
              backgroundColor: scheme === 'dark' ? '#451a03' : '#fffbeb',
              borderColor: colors.accent,
            },
          ]}>
          <View style={styles.zakatIconWrapper}>
            <Text style={{ fontSize: 32 }}>🪙</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.zakatBannerTitle, { color: scheme === 'dark' ? '#fcd34d' : '#92400e' }]}>
              Kalkulator Zakat Offline Interaktif
            </Text>
            <Text style={[styles.zakatBannerDesc, { color: scheme === 'dark' ? '#fef3c7' : '#78350f' }]}>
              Hitung Zakat Fitrah (jiwa/beras), Zakat Maal (tabungan/emas nisab 85g), Zakat Profesi, dan Dagang secara otomatis.
            </Text>
          </View>
          <Text style={[styles.bannerArrow, { color: colors.accent }]}>Buka →</Text>
        </TouchableOpacity>

        {/* Footer Ruang Bawah untuk Tab Bar */}
        <View style={{ height: BottomTabInset + 60 }} />
      </View>

      {/* Modal Pemilih Kota */}
      <CitySelectorModal
        visible={cityModalVisible}
        currentCity={settings.selectedCity}
        onSelectCity={setCity}
        onSelectCustomCoordinates={setCustomCoordinates}
        onClose={() => setCityModalVisible(false)}
      />
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
  headerCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  arabicBasmalah: {
    fontSize: 18,
    color: '#d1fae5',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#a7f3d0',
    marginTop: 2,
    lineHeight: 16,
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  greenPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34d399',
  },
  offlinePillText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  dateBar: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.25)',
  },
  dateText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  mainCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginVertical: 8,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cityName: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },
  citySub: {
    fontSize: 11,
    marginTop: 2,
  },
  changeCityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  changeCityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  nextPrayerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
  },
  nextPrayerInfo: {
    flex: 1,
  },
  nextPrayerLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  nextPrayerTime: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 2,
  },
  countdownBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  countdownTitle: {
    color: '#d1fae5',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  countdownValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  prayerGrid: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  prayerItem: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  prayerIcon: {
    fontSize: 14,
    marginBottom: 2,
  },
  prayerLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  prayerTimeText: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  fullScheduleLink: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '700',
  },
  fastingCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginVertical: 6,
  },
  fastingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  fastingTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  miniBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  imsakiyahRow: {
    flexDirection: 'row',
    gap: 10,
  },
  imsakBox: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  imsakLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  imsakTime: {
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 2,
  },
  imsakHint: {
    fontSize: 10,
  },
  quickNiat: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  quickNiatTitle: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  quickNiatText: {
    fontSize: 15,
    fontFamily: 'serif',
    textAlign: 'right',
    lineHeight: 24,
  },
  quickNiatLatin: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  sectionHeading: {
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  sectionDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  rukunGrid: {
    gap: 10,
  },
  rukunCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
  },
  rukunNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rukunNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  rukunCardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  rukunCardSub: {
    fontSize: 12,
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  zakatBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginTop: 14,
    gap: 12,
  },
  zakatIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(217, 119, 6, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zakatBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  zakatBannerDesc: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  bannerArrow: {
    fontSize: 13,
    fontWeight: '800',
  },
});
