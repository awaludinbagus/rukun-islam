import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Colors, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { useAppSettings } from '@/hooks/use-app-settings';
import {
  calculatePrayerTimes,
  getNextPrayer,
  calculateQiblaDirection,
  getMonthlyPrayerTimes,
  PrayerTimesResult,
  NextPrayerInfo,
} from '@/utils/prayerTimes';
import { gregorianToHijri } from '@/utils/hijriCalendar';
import { CitySelectorModal } from '@/components/city-selector-modal';
import { ArabicBlock } from '@/components/arabic-block';
import { RUKUN_ISLAM_DATA } from '@/data/rukunIslamData';

const sholatRukunData = RUKUN_ISLAM_DATA.find((r) => r.slug === 'sholat')!;

export default function SholatScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const { settings, setCity, setCustomCoordinates, togglePrayerChecklist } = useAppSettings();
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'jadwal' | 'tatacara' | 'wudhu' | 'dzikir'>('jadwal');
  const [show7Days, setShow7Days] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes: PrayerTimesResult = calculatePrayerTimes(
    currentTime,
    settings.selectedCity.coordinates,
    settings.selectedCity.timezone
  );

  const nextPrayer: NextPrayerInfo = getNextPrayer(prayerTimes, currentTime);
  const hijri = gregorianToHijri(currentTime);
  const qibla = calculateQiblaDirection(
    settings.selectedCity.coordinates.latitude,
    settings.selectedCity.coordinates.longitude
  );

  const upcoming7Days = show7Days
    ? getMonthlyPrayerTimes(
        currentTime,
        7,
        settings.selectedCity.coordinates,
        settings.selectedCity.timezone
      )
    : [];

  const todayKey = currentTime.toISOString().split('T')[0];
  const todayChecklist = settings.sholatChecklist[todayKey] || {};

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        {/* Header Tab */}
        <View
          style={[
            styles.headerBanner,
            { backgroundColor: scheme === 'dark' ? '#075985' : '#0284c7' },
          ]}>
          <Text style={styles.headerSubtitle}>Rukun Islam ke-2</Text>
          <Text style={styles.headerTitle}>Jadwal & Panduan Sholat</Text>
          <Text style={styles.headerDesc}>
            Perhitungan hisab astronomis Kemenag RI offline & tata cara sholat lengkap
          </Text>
        </View>

        {/* Tab Selector */}
        <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { key: 'jadwal', label: '🕒 Jadwal Sholat' },
            { key: 'tatacara', label: '📖 Tata Cara' },
            { key: 'wudhu', label: '💧 Wudhu' },
            { key: 'dzikir', label: '🤲 Dzikir & Doa' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              style={[
                styles.tabItem,
                activeTab === tab.key && {
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  styles.tabItemText,
                  { color: activeTab === tab.key ? '#ffffff' : colors.textSecondary },
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB 1: JADWAL SHOLAT OFFLINE */}
        {activeTab === 'jadwal' && (
          <View>
            {/* Lokasi & Kiblat Card */}
            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={styles.locHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTag, { color: colors.textSecondary }]}>LOKASI HISAB</Text>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    📍 {settings.selectedCity.name}
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                    {settings.selectedCity.province} ({settings.selectedCity.timezoneLabel}) • Koordinat: [
                    {settings.selectedCity.coordinates.latitude.toFixed(2)}°,{' '}
                    {settings.selectedCity.coordinates.longitude.toFixed(2)}°]
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setCityModalVisible(true)}
                  style={[styles.cityButton, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}>
                  <Text style={[styles.cityButtonText, { color: colors.primary }]}>Ganti Kota</Text>
                </TouchableOpacity>
              </View>

              {/* Arah Kiblat Box */}
              <View
                style={[
                  styles.qiblaBox,
                  { backgroundColor: scheme === 'dark' ? '#0c2338' : '#f0f9ff', borderColor: colors.info },
                ]}>
                <Text style={{ fontSize: 24 }}>🧭</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.qiblaTitle, { color: scheme === 'dark' ? '#38bdf8' : '#0369a1' }]}>
                    Arah Kiblat dari Lokasi Ini: {qibla.formatted} ({qibla.cardinal})
                  </Text>
                  <Text style={[styles.qiblaSubtitle, { color: colors.textSecondary }]}>
                    Dihitung menggunakan rumus lingkaran besar (Great-circle bearing) menuju Ka'bah di Makkah.
                  </Text>
                </View>
              </View>
            </View>

            {/* Countdown Banner */}
            <View
              style={[
                styles.countdownCard,
                {
                  backgroundColor: scheme === 'dark' ? '#064e3b' : '#ecfdf5',
                  borderColor: colors.primary,
                },
              ]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.countdownPre, { color: colors.primary }]}>
                  WAKTU SHOLAT SELANJUTNYA
                </Text>
                <Text style={[styles.countdownPrayerName, { color: colors.text }]}>
                  {nextPrayer.displayName}
                </Text>
                <Text style={[styles.countdownPrayerClock, { color: colors.primary }]}>
                  Pukul {nextPrayer.timeStr} {settings.selectedCity.timezoneLabel}
                </Text>
              </View>
              <View style={styles.countdownTimeBox}>
                <Text style={styles.countdownTimeSub}>Sisa Waktu</Text>
                <Text style={styles.countdownTimeMain}>{nextPrayer.remainingFormatted}</Text>
              </View>
            </View>

            {/* Tabel Jadwal Sholat Lengkap Hari Ini */}
            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={styles.prayerTableHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  Waktu Sholat Hari Ini
                </Text>
                <Text style={[styles.dateSmall, { color: colors.textSecondary }]}>
                  {prayerTimes.dateFormatted} • {hijri.formatted}
                </Text>
              </View>

              <View style={styles.prayerRowsList}>
                {[
                  { key: 'imsak', name: 'Imsak', time: prayerTimes.imsak, icon: '🌘', note: 'Batas sahur' },
                  { key: 'subuh', name: 'Subuh', time: prayerTimes.subuh, icon: '🌅', note: '2 Rakaat (Fardhu)' },
                  { key: 'terbit', name: 'Terbit (Syuruq)', time: prayerTimes.terbit, icon: '🌤️', note: 'Matahari terbit' },
                  { key: 'dhuha', name: 'Dhuha', time: prayerTimes.dhuha, icon: '✨', note: 'Sholat Dhuha' },
                  { key: 'dzuhur', name: 'Dzuhur', time: prayerTimes.dzuhur, icon: '☀️', note: '4 Rakaat (Fardhu)' },
                  { key: 'ashar', name: 'Ashar', time: prayerTimes.ashar, icon: '🌤️', note: '4 Rakaat (Fardhu)' },
                  { key: 'maghrib', name: 'Maghrib', time: prayerTimes.maghrib, icon: '🌇', note: '3 Rakaat (Fardhu) & Buka' },
                  { key: 'isya', name: 'Isya', time: prayerTimes.isya, icon: '🌙', note: '4 Rakaat (Fardhu)' },
                ].map((item) => {
                  const isNext = nextPrayer.displayName.toLowerCase().includes(item.name.toLowerCase());
                  const isChecked = !!todayChecklist[item.key];
                  const isFardhu = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].includes(item.key);

                  return (
                    <View
                      key={item.key}
                      style={[
                        styles.prayerTableRow,
                        { borderBottomColor: colors.border },
                        isNext && {
                          backgroundColor: scheme === 'dark' ? '#0f291e' : '#f0fdf4',
                        },
                      ]}>
                      <View style={styles.prayerRowLeft}>
                        <Text style={{ fontSize: 18, marginRight: 8 }}>{item.icon}</Text>
                        <View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text
                              style={[
                                styles.prayerRowName,
                                { color: isNext ? colors.primary : colors.text },
                              ]}>
                              {item.name}
                            </Text>
                            {isNext && (
                              <View style={[styles.nextBadge, { backgroundColor: colors.primary }]}>
                                <Text style={styles.nextBadgeText}>Berikutnya</Text>
                              </View>
                            )}
                          </View>
                          <Text style={[styles.prayerRowNote, { color: colors.textSecondary }]}>
                            {item.note}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.prayerRowRight}>
                        <Text
                          style={[
                            styles.prayerRowTime,
                            { color: isNext ? colors.primary : colors.text },
                          ]}>
                          {item.time}
                        </Text>
                        {isFardhu && (
                          <TouchableOpacity
                            onPress={() => togglePrayerChecklist(todayKey, item.key)}
                            style={[
                              styles.checkCircle,
                              { borderColor: colors.border, backgroundColor: colors.cardAlt },
                              isChecked && {
                                backgroundColor: colors.primary,
                                borderColor: colors.primary,
                              },
                            ]}>
                            <Text style={{ color: isChecked ? '#ffffff' : 'transparent', fontSize: 12, fontWeight: '800' }}>
                              ✓
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>

              <Text style={[styles.checkHint, { color: colors.textSecondary }]}>
                💡 Ketuk lingkaran di samping kanan waktu sholat fardhu untuk mencatat sholat yang sudah ditunaikan hari ini.
              </Text>
            </View>

            {/* Toggle Jadwal 7 Hari */}
            <TouchableOpacity
              onPress={() => setShow7Days(!show7Days)}
              style={[styles.toggle7DaysBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.toggle7DaysText, { color: colors.primary }]}>
                {show7Days ? '▲ Sembunyikan Jadwal 7 Hari' : '▼ Tampilkan Jadwal Sholat 7 Hari Kedepan'}
              </Text>
            </TouchableOpacity>

            {show7Days && (
              <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 10 }]}>
                  Jadwal Sholat 7 Hari ke Depan (Offline)
                </Text>
                {upcoming7Days.map((dayItem, idx) => (
                  <View
                    key={idx}
                    style={[styles.multiDayRow, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.multiDayDate, { color: colors.text }]}>
                      {dayItem.dateFormatted}
                    </Text>
                    <View style={styles.multiDayTimes}>
                      <Text style={[styles.multiDayTimeItem, { color: colors.textSecondary }]}>
                        Subuh: <Text style={{ color: colors.text, fontWeight: '700' }}>{dayItem.subuh}</Text>
                      </Text>
                      <Text style={[styles.multiDayTimeItem, { color: colors.textSecondary }]}>
                        Dzuhur: <Text style={{ color: colors.text, fontWeight: '700' }}>{dayItem.dzuhur}</Text>
                      </Text>
                      <Text style={[styles.multiDayTimeItem, { color: colors.textSecondary }]}>
                        Ashar: <Text style={{ color: colors.text, fontWeight: '700' }}>{dayItem.ashar}</Text>
                      </Text>
                      <Text style={[styles.multiDayTimeItem, { color: colors.textSecondary }]}>
                        Maghrib: <Text style={{ color: colors.text, fontWeight: '700' }}>{dayItem.maghrib}</Text>
                      </Text>
                      <Text style={[styles.multiDayTimeItem, { color: colors.textSecondary }]}>
                        Isya: <Text style={{ color: colors.text, fontWeight: '700' }}>{dayItem.isya}</Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* TAB 2: TATA CARA SHOLAT LENGKAP */}
        {activeTab === 'tatacara' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                13 Rukun Sholat (Mazhab Syafi'i)
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary, marginBottom: 10 }]}>
                Rukun sholat adalah bagian inti sholat yang wajib dikerjakan dan tidak boleh ditinggalkan.
              </Text>
              {sholatRukunData.rukun.map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={[styles.bulletNum, { color: colors.primary }]}>{idx + 1}.</Text>
                  <Text style={[styles.bulletText, { color: colors.text }]}>{item.replace(/^\d+\.\s*/, '')}</Text>
                </View>
              ))}
            </View>

            {/* Gerakan dan Bacaan Sholat Step-by-Step */}
            <Text style={[styles.sectionHeaderTitle, { color: colors.text }]}>
              Gerakan & Bacaan Sholat Step-by-Step
            </Text>

            {sholatRukunData.tataCara[1]?.steps.map((step) => (
              <View
                key={step.stepNumber}
                style={[styles.stepCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.stepHeader}>
                  <View style={[styles.stepNumBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.stepNumText}>{step.stepNumber}</Text>
                  </View>
                  <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
                </View>

                <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
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

            {/* Hal yang membatalkan sholat */}
            {sholatRukunData.pembatalAtauLarangan && (
              <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 14 }]}>
                <Text style={[styles.cardTitle, { color: '#dc2626' }]}>
                  ⚠️ {sholatRukunData.pembatalAtauLarangan.title}
                </Text>
                {sholatRukunData.pembatalAtauLarangan.items.map((item, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={{ color: '#dc2626', marginRight: 6 }}>•</Text>
                    <Text style={[styles.bulletText, { color: colors.text }]}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* TAB 3: PANDUAN WUDHU */}
        {activeTab === 'wudhu' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Tata Cara Wudhu yang Sempurna
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Wudhu adalah syarat sah sholat untuk menyucikan hadats kecil sesuai sunnah Rasulullah ﷺ.
              </Text>
            </View>

            {sholatRukunData.tataCara[0]?.steps.map((step) => (
              <View
                key={step.stepNumber}
                style={[styles.stepCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.stepHeader}>
                  <View style={[styles.stepNumBadge, { backgroundColor: colors.info }]}>
                    <Text style={styles.stepNumText}>{step.stepNumber}</Text>
                  </View>
                  <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
                </View>

                <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
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
        )}

        {/* TAB 4: DZIKIR & DOA SESUDAH SHOLAT */}
        {activeTab === 'dzikir' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Dzikir & Doa Setelah Sholat Fardhu
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Disunnahkan tidak langsung beranjak setelah sholat, melainkan berdzikir dan memanjatkan doa memohon ampunan serta keselamatan.
              </Text>
            </View>

            {sholatRukunData.doaDoa?.map((doa, idx) => (
              <ArabicBlock
                key={idx}
                title={doa.title}
                arabic={doa.arabic}
                latin={doa.latin}
                translation={doa.translation}
              />
            ))}
          </View>
        )}

        <View style={{ height: BottomTabInset + 60 }} />
      </View>

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
  headerBanner: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
  },
  headerSubtitle: {
    color: '#bae6fd',
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
    color: '#e0f2fe',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    marginBottom: 14,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  locHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  cardSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  cityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  cityButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  qiblaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  qiblaTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  qiblaSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  countdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  countdownPre: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  countdownPrayerName: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 2,
  },
  countdownPrayerClock: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  countdownTimeBox: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  countdownTimeSub: {
    color: '#d1fae5',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  countdownTimeMain: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  prayerTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  dateSmall: {
    fontSize: 11,
  },
  prayerRowsList: {
    gap: 2,
  },
  prayerTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  prayerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerRowName: {
    fontSize: 15,
    fontWeight: '700',
  },
  prayerRowNote: {
    fontSize: 11,
    marginTop: 1,
  },
  nextBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  nextBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  prayerRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerRowTime: {
    fontSize: 16,
    fontWeight: '800',
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkHint: {
    fontSize: 11,
    marginTop: 10,
    fontStyle: 'italic',
  },
  toggle7DaysBtn: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggle7DaysText: {
    fontSize: 13,
    fontWeight: '700',
  },
  multiDayRow: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  multiDayDate: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  multiDayTimes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  multiDayTimeItem: {
    fontSize: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  bulletNum: {
    fontWeight: '700',
    width: 24,
    fontSize: 13,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 10,
  },
  stepCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  stepNumBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 8,
  },
});
