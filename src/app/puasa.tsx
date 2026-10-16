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
import { calculatePrayerTimes, PrayerTimesResult } from '@/utils/prayerTimes';
import {
  gregorianToHijri,
  getFastingInfo,
  getUpcomingFasts,
  DOA_BERBUKA_PUASA,
} from '@/utils/hijriCalendar';
import { ArabicBlock } from '@/components/arabic-block';
import { CitySelectorModal } from '@/components/city-selector-modal';
import { RUKUN_ISLAM_DATA } from '@/data/rukunIslamData';

const puasaRukunData = RUKUN_ISLAM_DATA.find((r) => r.slug === 'puasa')!;

export default function PuasaScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const { settings, setCity, setCustomCoordinates, toggleFastComplete } = useAppSettings();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'jadwal' | 'kalender' | 'niat' | 'fiqih'>('jadwal');

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

  const hijri = gregorianToHijri(currentTime);
  const todayFasting = getFastingInfo(currentTime);
  const upcomingFasts = getUpcomingFasts(currentTime, 45);

  const todayKey = currentTime.toISOString().split('T')[0];
  const isFastCompletedToday = settings.completedFasts.includes(todayKey);

  // Menghitung status puasa saat ini & countdown (Imsak vs Buka Puasa)
  const nowMs = currentTime.getTime();
  const imsakMs = prayerTimes.rawTimes.imsak.getTime();
  const subuhMs = prayerTimes.rawTimes.subuh.getTime();
  const maghribMs = prayerTimes.rawTimes.maghrib.getTime();

  let countdownType: 'toImsak' | 'toMaghrib' | 'afterMaghrib' = 'toMaghrib';
  let countdownSec = 0;

  if (nowMs < imsakMs) {
    countdownType = 'toImsak';
    countdownSec = Math.floor((imsakMs - nowMs) / 1000);
  } else if (nowMs >= subuhMs && nowMs < maghribMs) {
    countdownType = 'toMaghrib';
    countdownSec = Math.floor((maghribMs - nowMs) / 1000);
  } else {
    countdownType = 'afterMaghrib';
  }

  const formatCountdown = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        {/* Header */}
        <View
          style={[
            styles.headerBanner,
            { backgroundColor: scheme === 'dark' ? '#5b21b6' : '#7c3aed' },
          ]}>
          <Text style={styles.headerSubtitle}>Rukun Islam ke-4</Text>
          <Text style={styles.headerTitle}>Jadwal Imsakiyah & Puasa</Text>
          <Text style={styles.headerDesc}>
            Jadwal Imsak & Buka Puasa offline, kalender puasa sunnah, niat & doa berbuka
          </Text>
        </View>

        {/* Tab Bar */}
        <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { key: 'jadwal', label: '🌙 Imsakiyah' },
            { key: 'kalender', label: '📅 Kalender Puasa' },
            { key: 'niat', label: '🤲 Niat & Doa' },
            { key: 'fiqih', label: '📖 Fiqih Puasa' },
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

        {/* TAB 1: IMSAKIYAH HARI INI */}
        {activeTab === 'jadwal' && (
          <View>
            {/* Countdown Buka / Imsak */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: scheme === 'dark' ? '#2e1065' : '#f5f3ff',
                  borderColor: '#8b5cf6',
                },
              ]}>
              <View style={styles.locRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTag, { color: '#8b5cf6' }]}>JADWAL IMSAKIYAH OFFLINE</Text>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    📍 {settings.selectedCity.name}
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                    {prayerTimes.dateFormatted} • {hijri.formatted}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setCityModalVisible(true)}
                  style={[styles.cityBtn, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}>
                  <Text style={[styles.cityBtnText, { color: colors.primary }]}>Ubah Kota</Text>
                </TouchableOpacity>
              </View>

              {/* Countdown Box */}
              <View style={styles.countdownCenter}>
                {countdownType === 'toImsak' && (
                  <>
                    <Text style={[styles.cdTitle, { color: '#d97706' }]}>
                      MENUJU WAKTU IMSAK (SAHUR)
                    </Text>
                    <Text style={[styles.cdTimer, { color: colors.text }]}>
                      {formatCountdown(countdownSec)}
                    </Text>
                    <Text style={[styles.cdHint, { color: colors.textSecondary }]}>
                      Imsak pukul {prayerTimes.imsak} {settings.selectedCity.timezoneLabel}
                    </Text>
                  </>
                )}

                {countdownType === 'toMaghrib' && (
                  <>
                    <Text style={[styles.cdTitle, { color: colors.primary }]}>
                      MENUJU WAKTU BUKA PUASA (MAGHRIB)
                    </Text>
                    <Text style={[styles.cdTimer, { color: colors.text }]}>
                      {formatCountdown(countdownSec)}
                    </Text>
                    <Text style={[styles.cdHint, { color: colors.textSecondary }]}>
                      Buka puasa pukul {prayerTimes.maghrib} {settings.selectedCity.timezoneLabel}
                    </Text>
                  </>
                )}

                {countdownType === 'afterMaghrib' && (
                  <>
                    <Text style={[styles.cdTitle, { color: colors.primary }]}>
                      WAKTU BERBUKA TELAH TIBA! 🎉
                    </Text>
                    <Text style={[styles.cdDoneText, { color: colors.text }]}>
                      Selamat Berbuka Puasa
                    </Text>
                    <Text style={[styles.cdHint, { color: colors.textSecondary }]}>
                      Jangan lupa membaca doa berbuka puasa dan bersyukur atas nikmat rezeki.
                    </Text>
                  </>
                )}
              </View>

              {/* Kartu Imsak vs Buka Puasa Row */}
              <View style={styles.imsakGrid}>
                <View style={[styles.imsakCol, { backgroundColor: colors.cardAlt }]}>
                  <Text style={styles.colIcon}>🌘</Text>
                  <Text style={[styles.colLabel, { color: colors.textSecondary }]}>Waktu Imsak</Text>
                  <Text style={[styles.colTime, { color: '#d97706' }]}>{prayerTimes.imsak}</Text>
                  <Text style={[styles.colSub, { color: colors.textSecondary }]}>10 mnt sebelum Subuh</Text>
                </View>

                <View style={[styles.imsakCol, { backgroundColor: colors.cardAlt }]}>
                  <Text style={styles.colIcon}>🌅</Text>
                  <Text style={[styles.colLabel, { color: colors.textSecondary }]}>Subuh (Mulai)</Text>
                  <Text style={[styles.colTime, { color: colors.text }]}>{prayerTimes.subuh}</Text>
                  <Text style={[styles.colSub, { color: colors.textSecondary }]}>Terbit Fajar Shadiq</Text>
                </View>

                <View style={[styles.imsakCol, { backgroundColor: colors.cardAlt }]}>
                  <Text style={styles.colIcon}>🌇</Text>
                  <Text style={[styles.colLabel, { color: colors.textSecondary }]}>Buka (Maghrib)</Text>
                  <Text style={[styles.colTime, { color: colors.primary }]}>{prayerTimes.maghrib}</Text>
                  <Text style={[styles.colSub, { color: colors.textSecondary }]}>Matahari Terbenam</Text>
                </View>
              </View>
            </View>

            {/* Tracker Puasa Hari Ini */}
            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={styles.trackerHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    Jurnal & Tracker Puasa Hari Ini
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                    {todayFasting.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleFastComplete(todayKey)}
                  style={[
                    styles.trackerBtn,
                    {
                      backgroundColor: isFastCompletedToday ? colors.primary : colors.cardAlt,
                      borderColor: isFastCompletedToday ? colors.primary : colors.border,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.trackerBtnText,
                      { color: isFastCompletedToday ? '#ffffff' : colors.text },
                    ]}>
                    {isFastCompletedToday ? '✓ Puasa Selesai' : '○ Tandai Puasa'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.trackerDesc, { color: colors.textSecondary }]}>
                {todayFasting.description}
              </Text>
            </View>

            {/* Doa Berbuka Puasa Card */}
            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 8 }]}>
                Doa Berbuka Puasa Shahih
              </Text>
              {DOA_BERBUKA_PUASA.map((doa, idx) => (
                <ArabicBlock
                  key={idx}
                  title={doa.title}
                  arabic={doa.arabic}
                  latin={doa.latin}
                  translation={doa.translation}
                  source={doa.source}
                />
              ))}
            </View>
          </View>
        )}

        {/* TAB 2: KALENDER PUASA SUNNAH */}
        {activeTab === 'kalender' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kalender Puasa Sunnah (45 Hari ke Depan)
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Perhitungan hisab astronomis kalender Hijriah offline untuk Puasa Senin-Kamis, Ayyamul Bidh (13, 14, 15 Hijriah), Ramadhan, dan puasa sunnah lainnya.
              </Text>
            </View>

            <View style={styles.fastList}>
              {upcomingFasts.map((fast, idx) => {
                const dateKey = fast.date.toISOString().split('T')[0];
                const isDone = settings.completedFasts.includes(dateKey);
                const isToday = dateKey === todayKey;

                return (
                  <View
                    key={idx}
                    style={[
                      styles.fastCard,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      isToday && { borderColor: colors.primary, borderWidth: 1.5 },
                    ]}>
                    <View style={styles.fastDateBadge}>
                      <Text style={styles.fastDayName}>{fast.dayName}</Text>
                      <Text style={styles.fastDateNum}>{fast.date.getDate()}</Text>
                      <Text style={styles.fastMonthName}>
                        {new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(fast.date)}
                      </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={[styles.fastTitle, { color: colors.text }]}>{fast.name}</Text>
                        {isToday && (
                          <View style={[styles.todayBadge, { backgroundColor: colors.primary }]}>
                            <Text style={styles.todayBadgeText}>Hari Ini</Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.fastHijri, { color: colors.primary }]}>
                        {fast.hijriFormatted}
                      </Text>
                      <Text style={[styles.fastDesc, { color: colors.textSecondary }]}>
                        {fast.fadhilah}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => toggleFastComplete(dateKey)}
                      style={[
                        styles.checkFastBtn,
                        {
                          backgroundColor: isDone ? colors.primary : colors.cardAlt,
                          borderColor: isDone ? colors.primary : colors.border,
                        },
                      ]}>
                      <Text style={{ color: isDone ? '#ffffff' : colors.textSecondary, fontWeight: '800' }}>
                        {isDone ? '✓' : '○'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* TAB 3: KUMPULAN NIAT PUASA & DOA */}
        {activeTab === 'niat' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kumpulan Niat Puasa Wajib & Sunnah
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Lafadz niat puasa lengkap dengan teks Arab, Latin, dan terjemahan bahasa Indonesia.
              </Text>
            </View>

            {/* Niat Ramadhan */}
            <ArabicBlock
              title="1. Niat Puasa Ramadhan (Harian)"
              arabic="نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillaahi ta'aalaa."
              translation="Aku berniat puasa esok hari untuk menunaikan fardhu bulan Ramadhan tahun ini karena Allah Ta'ala."
            />

            <ArabicBlock
              title="2. Niat Puasa Ramadhan Sebulan Penuh (Mazhab Maliki)"
              arabic="نَوَيْتُ صَوْمَ جَمِيعِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ فَرْضًا لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma jamii'i syahri ramadhaana haadzihis sanati fardhan lillaahi ta'aalaa."
              translation="Aku berniat puasa sebulan penuh di bulan Ramadhan tahun ini, fardhu karena Allah Ta'ala."
            />

            <ArabicBlock
              title="3. Niat Puasa Sunnah Hari Senin"
              arabic="نَوَيْتُ صَوْمَ يَوْمِ الِاثْنَيْنِ سُنَّةً لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma yaumil itsnaini sunnatan lillaahi ta'aalaa."
              translation="Aku berniat puasa sunnah hari Senin karena Allah Ta'ala."
            />

            <ArabicBlock
              title="4. Niat Puasa Sunnah Hari Kamis"
              arabic="نَوَيْتُ صَوْمَ يَوْمِ الْخَمِيسِ سُنَّةً لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma yaumil khamiisi sunnatan lillaahi ta'aalaa."
              translation="Aku berniat puasa sunnah hari Kamis karena Allah Ta'ala."
            />

            <ArabicBlock
              title="5. Niat Puasa Ayyamul Bidh (13, 14, 15 Hijriah)"
              arabic="نَوَيْتُ صَوْمَ أَيَّامِ الْبِيضِ سُنَّةً لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma ayyaamil biidhi sunnatan lillaahi ta'aalaa."
              translation="Aku berniat puasa sunnah hari-hari putih (Ayyamul Bidh) karena Allah Ta'ala."
            />

            <ArabicBlock
              title="6. Niat Puasa Daud (Sehari Puasa, Sehari Berbuka)"
              arabic="نَوَيْتُ صَوْمَ دَاوُدَ سُنَّةً لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma daawuda sunnatan lillaahi ta'aalaa."
              translation="Aku berniat puasa sunnah Nabi Daud karena Allah Ta'ala."
            />

            <ArabicBlock
              title="7. Niat Puasa Arafah (9 Dzulhijjah)"
              arabic="نَوَيْتُ صَوْمَ عَرَفَةَ سُنَّةً لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma 'arafata sunnatan lillaahi ta'aalaa."
              translation="Aku berniat puasa sunnah Arafah karena Allah Ta'ala."
            />

            <ArabicBlock
              title="8. Niat Puasa Qadha Ramadhan (Mengganti Puasa)"
              arabic="نَوَيْتُ صَوْمَ غَدٍ عَنْ قَضَاءِ فَرْضِ شَهْرِ رَمَضَانَ لِلَّهِ تَعَالَى"
              latin="Nawaitu shauma ghadin 'an qadhaa'i fardhi syahri ramadhaana lillaahi ta'aalaa."
              translation="Aku berniat puasa esok hari untuk mengqadha fardhu bulan Ramadhan karena Allah Ta'ala."
            />
          </View>
        )}

        {/* TAB 4: FIQIH PUASA LENGKAP */}
        {activeTab === 'fiqih' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Rukun & Syarat Sah Puasa
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary, marginBottom: 10 }]}>
                Ketentuan fiqih agar ibadah puasa sah dan diterima di sisi Allah Ta'ala.
              </Text>
              <Text style={[styles.subHeading, { color: colors.primary }]}>Rukun Puasa (2 Perkara):</Text>
              {puasaRukunData.rukun.map((r, i) => (
                <Text key={i} style={[styles.bodyText, { color: colors.text }]}>• {r}</Text>
              ))}

              <Text style={[styles.subHeading, { color: colors.primary, marginTop: 12 }]}>Syarat Wajib & Sah Puasa:</Text>
              {puasaRukunData.syarat.map((s, i) => (
                <Text key={i} style={[styles.bodyText, { color: colors.text }]}>• {s}</Text>
              ))}
            </View>

            {/* Hal yang membatalkan puasa */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: '#dc2626' }]}>
                ⚠️ Hal-Hal yang Membatalkan Puasa
              </Text>
              {puasaRukunData.pembatalAtauLarangan?.items.map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={{ color: '#dc2626', marginRight: 6 }}>•</Text>
                  <Text style={[styles.bulletText, { color: colors.text }]}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Ketentuan Fidyah & Qadha */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Ketentuan Qadha, Fidyah, dan Kifarat
              </Text>
              <Text style={[styles.bodyText, { color: colors.text, marginTop: 6 }]}>
                1. <Text style={{ fontWeight: '700' }}>Wajib Qadha Saja:</Text> Orang yang sakit sementara, musafir dalam perjalanan jauh, wanita yang haid atau nifas.
              </Text>
              <Text style={[styles.bodyText, { color: colors.text, marginTop: 6 }]}>
                2. <Text style={{ fontWeight: '700' }}>Wajib Fidyah Saja:</Text> Lansia renta yang sudah tidak mampu berpuasa, dan orang yang sakit menahun yang tidak ada harapan sembuh. Fidyah dibayarkan sebesar 1 mud (± 675 gram atau 0,75 kg) beras per hari ditinggalkan kepada fakir miskin.
              </Text>
              <Text style={[styles.bodyText, { color: colors.text, marginTop: 6 }]}>
                3. <Text style={{ fontWeight: '700' }}>Wajib Qadha dan Fidyah:</Text> Wanita hamil atau menyusui yang tidak berpuasa karena mengkhawatirkan keselamatan bayinya (menurut pendapat mayoritas ulama Syafi'i).
              </Text>
              <Text style={[styles.bodyText, { color: colors.text, marginTop: 6 }]}>
                4. <Text style={{ fontWeight: '700' }}>Wajib Kifarat Berat:</Text> Melakukan hubungan suami-istri (jima') pada siang hari bulan Ramadhan: memerdekakan budak, atau puasa 2 bulan berturut-turut, atau memberi makan 60 orang miskin.
              </Text>
            </View>
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
    color: '#ddd6fe',
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
    color: '#ede9fe',
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
  locRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
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
  cityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  cityBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  countdownCenter: {
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  cdTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  cdTimer: {
    fontSize: 36,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    marginVertical: 4,
  },
  cdHint: {
    fontSize: 12,
  },
  cdDoneText: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 4,
  },
  imsakGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  imsakCol: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  colIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  colLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  colTime: {
    fontSize: 18,
    fontWeight: '900',
    marginVertical: 2,
  },
  colSub: {
    fontSize: 9,
    textAlign: 'center',
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  trackerBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  trackerDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  fastList: {
    gap: 8,
  },
  fastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 12,
  },
  fastDateBadge: {
    width: 54,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  fastDayName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7c3aed',
  },
  fastDateNum: {
    fontSize: 20,
    fontWeight: '900',
    color: '#7c3aed',
  },
  fastMonthName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7c3aed',
  },
  fastTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  todayBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  todayBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  fastHijri: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  fastDesc: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  checkFastBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeading: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 18,
    marginVertical: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
});
