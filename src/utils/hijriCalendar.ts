/**
 * Algoritma Kalender Hijriah & Penentuan Jadwal Puasa Offline
 * 100% Berjalan Lokal tanpa koneksi internet.
 */

export interface HijriDate {
  day: number;
  month: number; // 1 - 12
  year: number;
  monthName: string;
  formatted: string;
}

export interface FastingInfo {
  isFastingDay: boolean;
  isForbiddenDay: boolean;
  type: 'wajib' | 'sunnah' | 'haram' | 'none';
  title: string;
  description: string;
  niatTextArabic: string;
  niatTextLatin: string;
  niatTranslation: string;
}

export interface UpcomingFast {
  date: Date;
  dateFormatted: string;
  hijriFormatted: string;
  dayName: string;
  name: string;
  type: 'wajib' | 'sunnah';
  fadhilah: string;
}

export const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  'Rabi\'ul Awwal',
  'Rabi\'ul Akhir',
  'Jumadil Awwal',
  'Jumadil Akhir',
  'Rajab',
  'Sya\'ban',
  'Ramadhan',
  'Syawwal',
  'Dzulqa\'dah',
  'Dzulhijjah',
];

/**
 * Konversi Tanggal Masehi (Gregorian) ke Tanggal Hijriah secara Offline
 * Menggunakan algoritma Tabular Islamic / Umm al-Qura approximation
 */
export function gregorianToHijri(date: Date, adjustmentDays: number = 0): HijriDate {
  const adjustedDate = new Date(date);
  if (adjustmentDays !== 0) {
    adjustedDate.setDate(adjustedDate.getDate() + adjustmentDays);
  }

  const y = adjustedDate.getFullYear();
  const m = adjustedDate.getMonth();
  const d = adjustedDate.getDate();

  // Julian Day
  let a = Math.floor((14 - (m + 1)) / 12);
  let y_adj = y + 4800 - a;
  let m_adj = m + 1 + 12 * a - 3;

  let jd =
    d +
    Math.floor((153 * m_adj + 2) / 5) +
    365 * y_adj +
    Math.floor(y_adj / 4) -
    Math.floor(y_adj / 100) +
    Math.floor(y_adj / 400) -
    32045;

  // Islamic epoch (16 Juli 622 CE)
  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  let hMonth = Math.floor((24 * l) / 709);
  let hDay = l - Math.floor((709 * hMonth) / 24);
  let hYear = 30 * n + j - 30;

  // Sesuaikan batas bulan 1 - 12
  if (hMonth < 1) hMonth = 1;
  if (hMonth > 12) hMonth = 12;

  const monthName = HIJRI_MONTHS[hMonth - 1] || 'Ramadhan';

  return {
    day: hDay,
    month: hMonth,
    year: hYear,
    monthName,
    formatted: `${hDay} ${monthName} ${hYear} H`,
  };
}

/**
 * Evaluasi status puasa untuk tanggal tertentu
 */
export function getFastingInfo(date: Date, adjustmentDays: number = 0): FastingInfo {
  const hijri = gregorianToHijri(date, adjustmentDays);
  const dayOfWeek = date.getDay(); // 0 = Minggu, 1 = Senin, 4 = Kamis

  // Hari-hari yang Diharamkan Berpuasa
  // 1 Syawwal (Idul Fitri)
  if (hijri.month === 10 && hijri.day === 1) {
    return {
      isFastingDay: false,
      isForbiddenDay: true,
      type: 'haram',
      title: 'Hari Raya Idul Fitri (1 Syawwal)',
      description: 'Diharamkan berpuasa pada hari raya Idul Fitri.',
      niatTextArabic: '',
      niatTextLatin: '',
      niatTranslation: '',
    };
  }

  // 10 Dzulhijjah (Idul Adha)
  if (hijri.month === 12 && hijri.day === 10) {
    return {
      isFastingDay: false,
      isForbiddenDay: true,
      type: 'haram',
      title: 'Hari Raya Idul Adha (10 Dzulhijjah)',
      description: 'Diharamkan berpuasa pada hari raya Idul Adha (Hari Nahar).',
      niatTextArabic: '',
      niatTextLatin: '',
      niatTranslation: '',
    };
  }

  // 11, 12, 13 Dzulhijjah (Hari Tasyrik)
  if (hijri.month === 12 && [11, 12, 13].includes(hijri.day)) {
    return {
      isFastingDay: false,
      isForbiddenDay: true,
      type: 'haram',
      title: `Hari Tasyrik (${hijri.day} Dzulhijjah)`,
      description: 'Diharamkan berpuasa pada hari tasyrik. Hari ini adalah hari makan dan minum serta berdzikir kepada Allah.',
      niatTextArabic: '',
      niatTextLatin: '',
      niatTranslation: '',
    };
  }

  // Puasa Wajib Ramadhan
  if (hijri.month === 9) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'wajib',
      title: `Puasa Ramadhan Hari ke-${hijri.day}`,
      description: 'Puasa fardhu bulan Ramadhan, salah satu dari lima Rukun Islam yang wajib ditunaikan.',
      niatTextArabic: 'نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillaahi ta'aalaa.",
      niatTranslation: 'Aku berniat puasa esok hari untuk menunaikan fardhu bulan Ramadhan tahun ini karena Allah Ta\'ala.',
    };
  }

  // Puasa Arafah (9 Dzulhijjah)
  if (hijri.month === 12 && hijri.day === 9) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: 'Puasa Sunnah Hari Arafah',
      description: 'Puasa sunnah bagi yang tidak berhaji pada hari wukuf di Arafah. Menghapus dosa setahun yang lalu dan setahun yang akan datang.',
      niatTextArabic: 'نَوَيْتُ صَوْمَ عَرَفَةَ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma 'arafata sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah Arafah karena Allah Ta'ala.",
    };
  }

  // Puasa Tarwiyah (8 Dzulhijjah)
  if (hijri.month === 12 && hijri.day === 8) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: 'Puasa Sunnah Hari Tarwiyah',
      description: 'Puasa sunnah hari Tarwiyah pada tanggal 8 Dzulhijjah.',
      niatTextArabic: 'نَوَيْتُ صَوْمَ تَرْوِيَةَ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma tarwiyata sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah Tarwiyah karena Allah Ta'ala.",
    };
  }

  // Puasa Asyura (10 Muharram)
  if (hijri.month === 1 && hijri.day === 10) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: 'Puasa Sunnah Hari Asyura (10 Muharram)',
      description: 'Puasa sunnah pada 10 Muharram. Menghapus dosa setahun yang telah lalu (HR. Muslim).',
      niatTextArabic: 'نَوَيْتُ صَوْمَ عَاشُورَاءَ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma 'aasyuuraa'a sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah Asyura karena Allah Ta'ala.",
    };
  }

  // Puasa Tasu'a (9 Muharram)
  if (hijri.month === 1 && hijri.day === 9) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: 'Puasa Sunnah Hari Tasu\'a (9 Muharram)',
      description: 'Puasa sunnah pendamping Asyura untuk menyelisihi kebiasaan kaum Yahudi (HR. Muslim).',
      niatTextArabic: 'نَوَيْتُ صَوْمَ تَاسُوعَاءَ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma taasu'aa'a sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah Tasu'a karena Allah Ta'ala.",
    };
  }

  // Puasa Ayyamul Bidh (13, 14, 15 tiap bulan, selain Dzulhijjah karena hari tasyrik)
  if ([13, 14, 15].includes(hijri.day) && hijri.month !== 12) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: `Puasa Sunnah Ayyamul Bidh (${hijri.day} ${hijri.monthName})`,
      description: 'Puasa hari-hari putih (saat bulan purnama). Pahalanya bagaikan berpuasa sepanjang tahun jika rutin dikerjakan (HR. Bukhari & Muslim).',
      niatTextArabic: 'نَوَيْتُ صَوْمَ أَيَّامِ الْبِيضِ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma ayyaamil biidhi sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah Ayyamul Bidh karena Allah Ta'ala.",
    };
  }

  // Puasa 6 Hari Syawwal (antara 2 - 30 Syawwal)
  if (hijri.month === 10 && hijri.day >= 2) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: `Puasa Sunnah 6 Hari Syawwal (${hijri.day} Syawwal)`,
      description: 'Barangsiapa berpuasa Ramadhan kemudian mengikutinya dengan 6 hari puasa Syawwal, bagaikan berpuasa setahun penuh (HR. Muslim).',
      niatTextArabic: 'نَوَيْتُ صَوْمَ سِتَّةٍ مِنْ شَوَّالٍ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma sittatin min syawwaalin sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah enam hari di bulan Syawwal karena Allah Ta'ala.",
    };
  }

  // Puasa Senin & Kamis
  if (dayOfWeek === 1) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: 'Puasa Sunnah Hari Senin',
      description: 'Amal perbuatan diperlihatkan kepada Allah pada hari Senin dan Kamis, dan Rasulullah ﷺ senang saat amalnya diperlihatkan dalam keadaan berpuasa (HR. Tirmidzi).',
      niatTextArabic: 'نَوَيْتُ صَوْمَ يَوْمِ الِاثْنَيْنِ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma yaumil itsnaini sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah hari Senin karena Allah Ta'ala.",
    };
  }

  if (dayOfWeek === 4) {
    return {
      isFastingDay: true,
      isForbiddenDay: false,
      type: 'sunnah',
      title: 'Puasa Sunnah Hari Kamis',
      description: 'Hari di mana pintu-pintu surga dibuka dan amal para hamba diangkat ke hadapan Allah Ta\'ala.',
      niatTextArabic: 'نَوَيْتُ صَوْمَ يَوْمِ الْخَمِيسِ سُنَّةً لِلَّهِ تَعَالَى',
      niatTextLatin: "Nawaitu shauma yaumil khamiisi sunnatan lillaahi ta'aalaa.",
      niatTranslation: "Aku berniat puasa sunnah hari Kamis karena Allah Ta'ala.",
    };
  }

  return {
    isFastingDay: false,
    isForbiddenDay: false,
    type: 'none',
    title: 'Bukan Hari Puasa Utama',
    description: 'Hari ini tidak bertepatan dengan puasa sunnah rutin. Anda tetap bisa menjalankan Puasa Daud atau Puasa Qadha.',
    niatTextArabic: 'نَوَيْتُ صَوْمَ التَّطَوُّعِ سُنَّةً لِلَّهِ تَعَالَى',
    niatTextLatin: "Nawaitu shaumat tathawwu'i sunnatan lillaahi ta'aalaa.",
    niatTranslation: "Aku berniat puasa sunnah mutlak karena Allah Ta'ala.",
  };
}

/**
 * Menghitung Daftar Puasa Sunnah Terdekat (Next 30 - 60 Days) Secara Offline
 */
export function getUpcomingFasts(startDate: Date, daysAhead: number = 30): UpcomingFast[] {
  const result: UpcomingFast[] = [];
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  for (let i = 0; i < daysAhead; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);

    const info = getFastingInfo(d);
    if (info.isFastingDay) {
      const hijri = gregorianToHijri(d);
      const dateFormatted = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(d);

      result.push({
        date: d,
        dateFormatted,
        hijriFormatted: hijri.formatted,
        dayName: dayNames[d.getDay()],
        name: info.title,
        type: info.type === 'wajib' ? 'wajib' : 'sunnah',
        fadhilah: info.description,
      });
    }
  }

  return result;
}

export const DOA_BERBUKA_PUASA = [
  {
    title: 'Doa Berbuka Menurut Hadits Shahih (HR. Abu Dawud)',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    latin: 'Dzahabazh zhama-u wabtallatil \'uruuqu wa tsabatal ajru in syaa-allaah.',
    translation: 'Telah hilang rasa haus, dan telah basah urat-urat, dan telah tetap pahala, insya Allah.',
    source: 'HR. Abu Dawud no. 2357 (Hasan)',
  },
  {
    title: 'Doa Berbuka Populer (HR. Bukhari & Muslim / Riwayat Masyhur)',
    arabic: 'اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    latin: "Allahumma laka shumtu wa bika aamantu wa 'alaa rizqika afthartu.",
    translation: 'Ya Allah, hanya untuk-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka.',
    source: 'HR. Abu Dawud & Al-Baihaqi',
  },
];
