/**
 * Algoritma Perhitungan Waktu Sholat Astronomis Offline (Hisab Kemenag RI / Standar Astronomi)
 * 100% Offline tanpa membutuhkan koneksi internet atau API eksternal.
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
  elevation?: number;
}

export interface CityInfo {
  id: string;
  name: string;
  province: string;
  coordinates: Coordinates;
  timezone: number; // UTC offset in hours (7, 8, or 9)
  timezoneLabel: 'WIB' | 'WITA' | 'WIT';
}

export interface PrayerTimesResult {
  date: Date;
  dateFormatted: string;
  hijriFormatted: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  // Raw date objects for countdown and comparison
  rawTimes: {
    imsak: Date;
    subuh: Date;
    terbit: Date;
    dhuha: Date;
    dzuhur: Date;
    ashar: Date;
    maghrib: Date;
    isya: Date;
  };
}

export interface NextPrayerInfo {
  name: string;
  displayName: string;
  timeStr: string;
  time: Date;
  remainingSeconds: number;
  remainingFormatted: string;
  isToday: boolean;
}

// Database Kota-Kota Besar di Indonesia
export const INDONESIA_CITIES: CityInfo[] = [
  {
    id: 'bandung',
    name: 'Kota Bandung',
    province: 'Jawa Barat',
    coordinates: { latitude: -6.9175, longitude: 107.6191 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'jakarta',
    name: 'DKI Jakarta',
    province: 'DKI Jakarta',
    coordinates: { latitude: -6.2088, longitude: 106.8456 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'surabaya',
    name: 'Kota Surabaya',
    province: 'Jawa Timur',
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'semarang',
    name: 'Kota Semarang',
    province: 'Jawa Tengah',
    coordinates: { latitude: -6.9667, longitude: 110.4167 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'yogyakarta',
    name: 'Kota Yogyakarta',
    province: 'D.I. Yogyakarta',
    coordinates: { latitude: -7.7956, longitude: 110.3695 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'serang',
    name: 'Kota Serang',
    province: 'Banten',
    coordinates: { latitude: -6.1104, longitude: 106.1639 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'bogor',
    name: 'Kota Bogor',
    province: 'Jawa Barat',
    coordinates: { latitude: -6.5971, longitude: 106.8060 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'cirebon',
    name: 'Kota Cirebon',
    province: 'Jawa Barat',
    coordinates: { latitude: -6.7320, longitude: 108.5523 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'solo',
    name: 'Kota Surakarta (Solo)',
    province: 'Jawa Tengah',
    coordinates: { latitude: -7.5666, longitude: 110.8167 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'malang',
    name: 'Kota Malang',
    province: 'Jawa Timur',
    coordinates: { latitude: -7.9797, longitude: 112.6304 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'medan',
    name: 'Kota Medan',
    province: 'Sumatera Utara',
    coordinates: { latitude: 3.5952, longitude: 98.6722 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'banda-aceh',
    name: 'Kota Banda Aceh',
    province: 'Aceh',
    coordinates: { latitude: 5.5483, longitude: 95.3238 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'padang',
    name: 'Kota Padang',
    province: 'Sumatera Barat',
    coordinates: { latitude: -0.9471, longitude: 100.4172 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'pekanbaru',
    name: 'Kota Pekanbaru',
    province: 'Riau',
    coordinates: { latitude: 0.5071, longitude: 101.4478 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'palembang',
    name: 'Kota Palembang',
    province: 'Sumatera Selatan',
    coordinates: { latitude: -2.9761, longitude: 104.7754 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'bandar-lampung',
    name: 'Kota Bandar Lampung',
    province: 'Lampung',
    coordinates: { latitude: -5.4297, longitude: 105.2625 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'pontianak',
    name: 'Kota Pontianak',
    province: 'Kalimantan Barat',
    coordinates: { latitude: -0.0263, longitude: 109.3425 },
    timezone: 7,
    timezoneLabel: 'WIB',
  },
  {
    id: 'banjarmasin',
    name: 'Kota Banjarmasin',
    province: 'Kalimantan Selatan',
    coordinates: { latitude: -3.3194, longitude: 114.5908 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'balikpapan',
    name: 'Kota Balikpapan',
    province: 'Kalimantan Timur',
    coordinates: { latitude: -1.2379, longitude: 116.8289 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'samarinda',
    name: 'Kota Samarinda',
    province: 'Kalimantan Timur',
    coordinates: { latitude: -0.5022, longitude: 117.1536 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'denpasar',
    name: 'Kota Denpasar',
    province: 'Bali',
    coordinates: { latitude: -8.6705, longitude: 115.2126 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'mataram',
    name: 'Kota Mataram (Lombok)',
    province: 'Nusa Tenggara Barat',
    coordinates: { latitude: -8.5833, longitude: 116.1167 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'kupang',
    name: 'Kota Kupang',
    province: 'Nusa Tenggara Timur',
    coordinates: { latitude: -10.1772, longitude: 123.6070 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'makassar',
    name: 'Kota Makassar',
    province: 'Sulawesi Selatan',
    coordinates: { latitude: -5.1477, longitude: 119.4327 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'manado',
    name: 'Kota Manado',
    province: 'Sulawesi Utara',
    coordinates: { latitude: 1.4748, longitude: 124.8421 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'palu',
    name: 'Kota Palu',
    province: 'Sulawesi Tengah',
    coordinates: { latitude: -0.9003, longitude: 119.8779 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'kendari',
    name: 'Kota Kendari',
    province: 'Sulawesi Tenggara',
    coordinates: { latitude: -3.9985, longitude: 122.5126 },
    timezone: 8,
    timezoneLabel: 'WITA',
  },
  {
    id: 'ambon',
    name: 'Kota Ambon',
    province: 'Maluku',
    coordinates: { latitude: -3.6547, longitude: 128.1906 },
    timezone: 9,
    timezoneLabel: 'WIT',
  },
  {
    id: 'ternate',
    name: 'Kota Ternate',
    province: 'Maluku Utara',
    coordinates: { latitude: 0.7833, longitude: 127.3667 },
    timezone: 9,
    timezoneLabel: 'WIT',
  },
  {
    id: 'jayapura',
    name: 'Kota Jayapura',
    province: 'Papua',
    coordinates: { latitude: -2.5337, longitude: 140.7181 },
    timezone: 9,
    timezoneLabel: 'WIT',
  },
  {
    id: 'sorong',
    name: 'Kota Sorong',
    province: 'Papua Barat Daya',
    coordinates: { latitude: -0.8762, longitude: 131.2558 },
    timezone: 9,
    timezoneLabel: 'WIT',
  },
  {
    id: 'makkah',
    name: 'Makkah Al-Mukarramah',
    province: 'Arab Saudi',
    coordinates: { latitude: 21.4225, longitude: 39.8262 },
    timezone: 3,
    timezoneLabel: 'WIB',
  },
  {
    id: 'madinah',
    name: 'Madinah Al-Munawwarah',
    province: 'Arab Saudi',
    coordinates: { latitude: 24.4672, longitude: 39.6111 },
    timezone: 3,
    timezoneLabel: 'WIB',
  },
];

export const DEFAULT_CITY: CityInfo = INDONESIA_CITIES[0]; // Bandung

// Parameter Hisab Kemenag RI
const FAJR_ANGLE = 20.0; // Standar Kemenag RI
const ISHA_ANGLE = 18.0; // Standar Kemenag RI
const SUNRISE_ANGLE = 0.8333; // Refraksi atmosfer + semi-diameter matahari
const DHUHA_ANGLE = 4.5; // Sudut matahari saat masuk waktu dhuha
const IKHTIYAT_MINUTES = 2; // Pengaman / ikhtiyat hisab Kemenag (+2 menit)

// Matematika Trigonometri Derajat
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180.0;
}

function radToDeg(rad: number): number {
  return (rad * 180.0) / Math.PI;
}

function normalizeHours(hour: number): number {
  let h = hour - 24.0 * Math.floor(hour / 24.0);
  if (h < 0) h += 24.0;
  return h;
}

function normalizeDegrees(deg: number): number {
  let d = deg - 360.0 * Math.floor(deg / 360.0);
  if (d < 0) d += 360.0;
  return d;
}

// Menghitung Julian Day dari Tanggal Masehi
function getJulianDate(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    B -
    1524.5
  );
}

// Menghitung Posisi Matahari (Deklinasi & Equation of Time)
function getSunPosition(julianDate: number): { declination: number; equationOfTime: number } {
  const d = julianDate - 2451545.0; // Hari sejak J2000.0
  const g = normalizeDegrees(357.529 + 0.98560028 * d);
  const q = normalizeDegrees(280.459 + 0.98564736 * d);
  const L = normalizeDegrees(
    q + 1.915 * Math.sin(degToRad(g)) + 0.02 * Math.sin(degToRad(2 * g))
  );

  const e = 23.439 - 0.00000036 * d; // Obliquitas ekliptika
  const sinDeclination = Math.sin(degToRad(e)) * Math.sin(degToRad(L));
  const declination = radToDeg(Math.asin(sinDeclination));

  // Right Ascension
  let RA = radToDeg(
    Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))
  ) / 15.0;
  RA = normalizeHours(RA);

  // Equation of Time (dalam jam)
  const equationOfTime = q / 15.0 - RA;

  return { declination, equationOfTime };
}

// Menghitung Sudut Waktu (Hour Angle) untuk sudut matahari tertentu
function getHourAngle(lat: number, dec: number, angle: number, direction: 'morning' | 'evening'): number {
  const latRad = degToRad(lat);
  const decRad = degToRad(dec);
  const angleRad = degToRad(angle);

  const cosH =
    (Math.sin(-angleRad) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  // Jika matahari tidak pernah mencapai ketinggian tersebut (ekstrem)
  if (cosH > 1) return direction === 'morning' ? 0 : 0;
  if (cosH < -1) return direction === 'morning' ? 12 : 12;

  const H = radToDeg(Math.acos(cosH)) / 15.0;
  return direction === 'morning' ? -H : H;
}

// Menghitung Sudut Waktu untuk Ashar (Metode Syafi'i: bayangan benda = panjang benda)
function getAsrHourAngle(lat: number, dec: number): number {
  const latRad = degToRad(lat);
  const decRad = degToRad(dec);
  // Sudut ketinggian matahari saat Ashar: acot(1 + tan|lat - dec|)
  const diff = Math.abs(latRad - decRad);
  const altRad = Math.atan(1.0 / (1.0 + Math.tan(diff)));

  const cosH =
    (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  if (cosH > 1) return 0;
  if (cosH < -1) return 12;

  return radToDeg(Math.acos(cosH)) / 15.0;
}

// Mengubah desimal jam menjadi Date object pada hari bersangkutan
function decimalHoursToDate(baseDate: Date, decHours: number): Date {
  const d = new Date(baseDate);
  const totalSeconds = Math.round(decHours * 3600);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

// Format Date menjadi HH:mm
function formatTime(d: Date): string {
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Menghitung Jadwal Sholat Lengkap untuk Tanggal dan Koordinat yang Diberikan
 */
export function calculatePrayerTimes(
  date: Date,
  coordinates: Coordinates,
  timezone: number
): PrayerTimesResult {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const jd = getJulianDate(year, month, day);
  const { declination, equationOfTime } = getSunPosition(jd);

  // Waktu Tengah Hari (Matahari tepat di atas kepala / Solar Noon)
  // Noon = 12 + Timezone - Longitude/15 - EoT
  const midDay = 12.0 + timezone - coordinates.longitude / 15.0 - equationOfTime;

  // Sudut Waktu
  const sunriseH = getHourAngle(coordinates.latitude, declination, SUNRISE_ANGLE, 'morning');
  const sunsetH = getHourAngle(coordinates.latitude, declination, SUNRISE_ANGLE, 'evening');
  const fajrH = getHourAngle(coordinates.latitude, declination, FAJR_ANGLE, 'morning');
  const ishaH = getHourAngle(coordinates.latitude, declination, ISHA_ANGLE, 'evening');
  const asrH = getAsrHourAngle(coordinates.latitude, declination);
  const dhuhaH = getHourAngle(coordinates.latitude, declination, -DHUHA_ANGLE, 'morning');

  // Waktu-waktu dalam desimal jam (ditambah ikhtiyat pengaman 2 menit untuk fardhu)
  const ikhtiyatHours = IKHTIYAT_MINUTES / 60.0;

  const rawSubuhDec = normalizeHours(midDay + fajrH + ikhtiyatHours);
  const rawTerbitDec = normalizeHours(midDay + sunriseH);
  const rawDhuhaDec = normalizeHours(midDay + dhuhaH + ikhtiyatHours);
  const rawDzuhurDec = normalizeHours(midDay + ikhtiyatHours);
  const rawAsharDec = normalizeHours(midDay + asrH + ikhtiyatHours);
  const rawMaghribDec = normalizeHours(midDay + sunsetH + ikhtiyatHours);
  const rawIsyaDec = normalizeHours(midDay + ishaH + ikhtiyatHours);

  // Waktu Imsak = Subuh - 10 Menit (standar Indonesia)
  const rawImsakDec = normalizeHours(rawSubuhDec - 10 / 60.0);

  const subuhDate = decimalHoursToDate(date, rawSubuhDec);
  const terbitDate = decimalHoursToDate(date, rawTerbitDec);
  const dhuhaDate = decimalHoursToDate(date, rawDhuhaDec);
  const dzuhurDate = decimalHoursToDate(date, rawDzuhurDec);
  const asharDate = decimalHoursToDate(date, rawAsharDec);
  const maghribDate = decimalHoursToDate(date, rawMaghribDec);
  const isyaDate = decimalHoursToDate(date, rawIsyaDec);
  const imsakDate = decimalHoursToDate(date, rawImsakDec);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const dateFormatted = new Intl.DateTimeFormat('id-ID', options).format(date);

  return {
    date,
    dateFormatted,
    hijriFormatted: '', // Diisi oleh hijriCalendar utilitas
    imsak: formatTime(imsakDate),
    subuh: formatTime(subuhDate),
    terbit: formatTime(terbitDate),
    dhuha: formatTime(dhuhaDate),
    dzuhur: formatTime(dzuhurDate),
    ashar: formatTime(asharDate),
    maghrib: formatTime(maghribDate),
    isya: formatTime(isyaDate),
    rawTimes: {
      imsak: imsakDate,
      subuh: subuhDate,
      terbit: terbitDate,
      dhuha: dhuhaDate,
      dzuhur: dzuhurDate,
      ashar: asharDate,
      maghrib: maghribDate,
      isya: isyaDate,
    },
  };
}

/**
 * Menghitung Sholat Berikutnya dan Hitung Mundur Real-Time
 */
export function getNextPrayer(prayerTimes: PrayerTimesResult, now: Date = new Date()): NextPrayerInfo {
  const prayers: Array<{ name: string; displayName: string; time: Date; timeStr: string }> = [
    { name: 'imsak', displayName: 'Imsak', time: prayerTimes.rawTimes.imsak, timeStr: prayerTimes.imsak },
    { name: 'subuh', displayName: 'Subuh', time: prayerTimes.rawTimes.subuh, timeStr: prayerTimes.subuh },
    { name: 'terbit', displayName: 'Terbit (Syuruq)', time: prayerTimes.rawTimes.terbit, timeStr: prayerTimes.terbit },
    { name: 'dhuha', displayName: 'Dhuha', time: prayerTimes.rawTimes.dhuha, timeStr: prayerTimes.dhuha },
    { name: 'dzuhur', displayName: 'Dzuhur', time: prayerTimes.rawTimes.dzuhur, timeStr: prayerTimes.dzuhur },
    { name: 'ashar', displayName: 'Ashar', time: prayerTimes.rawTimes.ashar, timeStr: prayerTimes.ashar },
    { name: 'maghrib', displayName: 'Maghrib', time: prayerTimes.rawTimes.maghrib, timeStr: prayerTimes.maghrib },
    { name: 'isya', displayName: 'Isya', time: prayerTimes.rawTimes.isya, timeStr: prayerTimes.isya },
  ];

  // Cari waktu sholat hari ini yang masih di masa depan
  for (const prayer of prayers) {
    if (prayer.time.getTime() > now.getTime()) {
      const remainingSeconds = Math.max(0, Math.floor((prayer.time.getTime() - now.getTime()) / 1000));
      return {
        name: prayer.name,
        displayName: prayer.displayName,
        timeStr: prayer.timeStr,
        time: prayer.time,
        remainingSeconds,
        remainingFormatted: formatDuration(remainingSeconds),
        isToday: true,
      };
    }
  }

  // Jika semua sudah lewat (setelah Isya), maka sholat berikutnya adalah Imsak/Subuh besok
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowImsak = new Date(prayerTimes.rawTimes.imsak);
  tomorrowImsak.setDate(tomorrowImsak.getDate() + 1);

  const remainingSeconds = Math.max(0, Math.floor((tomorrowImsak.getTime() - now.getTime()) / 1000));
  return {
    name: 'imsak',
    displayName: 'Imsak (Besok)',
    timeStr: prayerTimes.imsak,
    time: tomorrowImsak,
    remainingSeconds,
    remainingFormatted: formatDuration(remainingSeconds),
    isToday: false,
  };
}

/**
 * Format durasi detik menjadi string "02 jam 15 menit 30 detik"
 */
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours} jam ${minutes} menit ${seconds} detik`;
  }
  if (minutes > 0) {
    return `${minutes} menit ${seconds} detik`;
  }
  return `${seconds} detik`;
}

/**
 * Menghitung Arah Kiblat (Azimuth Derajat dari Utara)
 * Ka'bah: 21.422487° N, 39.826206° E
 */
export function calculateQiblaDirection(latitude: number, longitude: number): {
  degrees: number;
  formatted: string;
  cardinal: string;
} {
  const kaabaLat = 21.422487;
  const kaabaLng = 39.826206;

  const phi1 = degToRad(latitude);
  const phi2 = degToRad(kaabaLat);
  const deltaLambda = degToRad(kaabaLng - longitude);

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = radToDeg(qiblaRad);
  qiblaDeg = (qiblaDeg + 360) % 360;

  let cardinal = 'Barat Laut';
  if (qiblaDeg >= 337.5 || qiblaDeg < 22.5) cardinal = 'Utara';
  else if (qiblaDeg >= 22.5 && qiblaDeg < 67.5) cardinal = 'Timur Laut';
  else if (qiblaDeg >= 67.5 && qiblaDeg < 112.5) cardinal = 'Timur';
  else if (qiblaDeg >= 112.5 && qiblaDeg < 157.5) cardinal = 'Tenggara';
  else if (qiblaDeg >= 157.5 && qiblaDeg < 202.5) cardinal = 'Selatan';
  else if (qiblaDeg >= 202.5 && qiblaDeg < 247.5) cardinal = 'Barat Daya';
  else if (qiblaDeg >= 247.5 && qiblaDeg < 292.5) cardinal = 'Barat';
  else cardinal = 'Barat Laut';

  return {
    degrees: Math.round(qiblaDeg * 10) / 10,
    formatted: `${Math.round(qiblaDeg * 10) / 10}°`,
    cardinal,
  };
}

/**
 * Menghasilkan Jadwal Sholat untuk N Hari ke Depan (Offline)
 */
export function getMonthlyPrayerTimes(
  startDate: Date,
  daysCount: number,
  coordinates: Coordinates,
  timezone: number
): PrayerTimesResult[] {
  const list: PrayerTimesResult[] = [];
  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    list.push(calculatePrayerTimes(d, coordinates, timezone));
  }
  return list;
}
