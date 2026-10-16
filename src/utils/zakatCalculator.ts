/**
 * Algoritma dan Logika Perhitungan Zakat Offline Lengkap
 * Sesuai Fiqih Islam, Fatwa MUI, dan Standar BAZNAS.
 * 100% Berjalan Lokal Offline.
 */

export const DEFAULT_GOLD_PRICE_PER_GRAM = 1450000; // Rp 1.450.000 / gram emas
export const DEFAULT_RICE_PRICE_PER_KG = 15000; // Rp 15.000 / kg beras standar

// Standar Nisab
export const NISAB_GOLD_GRAMS = 85; // 85 gram emas untuk Zakat Maal, Profesi, dan Dagang
export const NISAB_RICE_KG = 653; // 5 wasaq = 653 kg gabah / 520 kg beras untuk Zakat Pertanian

export interface ZakatFitrahInput {
  familyMembers: number; // Jumlah jiwa
  ricePricePerKg: number; // Harga beras per kg
  measureType: 'kg' | 'liter'; // 2.5 kg atau 3.5 liter
}

export interface ZakatFitrahResult {
  familyMembers: number;
  totalRiceKg: number;
  totalRiceLiter: number;
  totalPriceRp: number;
}

export interface ZakatMaalInput {
  savings: number; // Tabungan / Deposito / Giro
  goldValue: number; // Nilai emas/perak simpanan
  otherAssets: number; // Aset lancar / investasi jangka pendek
  shortTermDebts: number; // Hutang jatuh tempo yang harus dibayar
  goldPricePerGram: number; // Harga emas per gram
  isHaulReached: boolean; // Sudah mencapai 1 tahun (haul)
}

export interface ZakatMaalResult {
  totalAssets: number;
  netAssets: number;
  nisabRp: number;
  isNisabReached: boolean;
  isLiable: boolean; // Wajib zakat jika nisab terpenuhi & haul tercapai
  zakatAmountRp: number;
}

export interface ZakatIncomeInput {
  monthlySalary: number; // Gaji / penghasilan rutin bulanan
  additionalIncome: number; // Pendapatan lain / bonus
  monthlyExpenses: number; // Kebutuhan pokok & cicilan bulanan
  goldPricePerGram: number; // Harga emas per gram
}

export interface ZakatIncomeResult {
  grossMonthly: number;
  netMonthly: number;
  monthlyNisabRp: number;
  yearlyNisabRp: number;
  isNisabReached: boolean;
  zakatMonthlyRp: number;
  zakatYearlyRp: number;
}

export interface ZakatTradeInput {
  goodsStock: number; // Nilai persediaan barang dagang
  cashInHand: number; // Uang kas / modal kerja berputar
  receivables: number; // Piutang lancar yang tertagih
  payables: number; // Hutang dagang jatuh tempo
  goldPricePerGram: number;
}

export interface ZakatTradeResult {
  totalAssets: number;
  netWorkingCapital: number;
  nisabRp: number;
  isNisabReached: boolean;
  zakatAmountRp: number;
}

export interface ZakatAgricultureInput {
  harvestKg: number; // Hasil panen (kg gabah/beras)
  irrigationType: 'rain' | 'pump' | 'mixed'; // Tadah hujan (10%), Pompa/Berbayar (5%), Campuran (7.5%)
  cropPricePerKg: number; // Harga per kg
}

export interface ZakatAgricultureResult {
  harvestKg: number;
  nisabKg: number;
  isNisabReached: boolean;
  ratePercentage: number;
  zakatKg: number;
  zakatRp: number;
}

/**
 * Format Angka Rupiah (contoh: Rp 1.500.000)
 */
export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount < 0) return 'Rp 0';
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

/**
 * Hitung Zakat Fitrah
 */
export function calculateZakatFitrah(input: ZakatFitrahInput): ZakatFitrahResult {
  const members = Math.max(1, Math.round(input.familyMembers || 1));
  const ricePerKg = input.ricePricePerKg || DEFAULT_RICE_PRICE_PER_KG;

  const totalRiceKg = members * 2.5;
  const totalRiceLiter = members * 3.5;
  const totalPriceRp = totalRiceKg * ricePerKg;

  return {
    familyMembers: members,
    totalRiceKg,
    totalRiceLiter,
    totalPriceRp,
  };
}

/**
 * Hitung Zakat Maal (Harta Simpanan / Emas / Tabungan)
 */
export function calculateZakatMaal(input: ZakatMaalInput): ZakatMaalResult {
  const goldPrice = input.goldPricePerGram || DEFAULT_GOLD_PRICE_PER_GRAM;
  const nisabRp = NISAB_GOLD_GRAMS * goldPrice;

  const totalAssets =
    (input.savings || 0) +
    (input.goldValue || 0) +
    (input.otherAssets || 0);

  const debts = input.shortTermDebts || 0;
  const netAssets = Math.max(0, totalAssets - debts);

  const isNisabReached = netAssets >= nisabRp;
  const isLiable = isNisabReached && input.isHaulReached;
  const zakatAmountRp = isLiable ? netAssets * 0.025 : 0;

  return {
    totalAssets,
    netAssets,
    nisabRp,
    isNisabReached,
    isLiable,
    zakatAmountRp,
  };
}

/**
 * Hitung Zakat Profesi / Penghasilan (Fatwa MUI No. 3/2003)
 */
export function calculateZakatIncome(input: ZakatIncomeInput): ZakatIncomeResult {
  const goldPrice = input.goldPricePerGram || DEFAULT_GOLD_PRICE_PER_GRAM;
  const yearlyNisabRp = NISAB_GOLD_GRAMS * goldPrice;
  const monthlyNisabRp = yearlyNisabRp / 12;

  const grossMonthly = (input.monthlySalary || 0) + (input.additionalIncome || 0);
  const expenses = input.monthlyExpenses || 0;
  const netMonthly = Math.max(0, grossMonthly - expenses);

  const isNisabReached = netMonthly >= monthlyNisabRp;
  const zakatMonthlyRp = isNisabReached ? netMonthly * 0.025 : 0;
  const zakatYearlyRp = zakatMonthlyRp * 12;

  return {
    grossMonthly,
    netMonthly,
    monthlyNisabRp,
    yearlyNisabRp,
    isNisabReached,
    zakatMonthlyRp,
    zakatYearlyRp,
  };
}

/**
 * Hitung Zakat Perniagaan (Dagang)
 */
export function calculateZakatTrade(input: ZakatTradeInput): ZakatTradeResult {
  const goldPrice = input.goldPricePerGram || DEFAULT_GOLD_PRICE_PER_GRAM;
  const nisabRp = NISAB_GOLD_GRAMS * goldPrice;

  const totalAssets =
    (input.goodsStock || 0) +
    (input.cashInHand || 0) +
    (input.receivables || 0);

  const payables = input.payables || 0;
  const netWorkingCapital = Math.max(0, totalAssets - payables);

  const isNisabReached = netWorkingCapital >= nisabRp;
  const zakatAmountRp = isNisabReached ? netWorkingCapital * 0.025 : 0;

  return {
    totalAssets,
    netWorkingCapital,
    nisabRp,
    isNisabReached,
    zakatAmountRp,
  };
}

/**
 * Hitung Zakat Pertanian
 */
export function calculateZakatAgriculture(input: ZakatAgricultureInput): ZakatAgricultureResult {
  const harvestKg = input.harvestKg || 0;
  const nisabKg = NISAB_RICE_KG;
  const isNisabReached = harvestKg >= nisabKg;

  let rate = 0.05; // 5% pompa
  let ratePercentage = 5;
  if (input.irrigationType === 'rain') {
    rate = 0.1; // 10% tadah hujan
    ratePercentage = 10;
  } else if (input.irrigationType === 'mixed') {
    rate = 0.075;
    ratePercentage = 7.5;
  }

  const zakatKg = isNisabReached ? harvestKg * rate : 0;
  const zakatRp = zakatKg * (input.cropPricePerKg || 12000);

  return {
    harvestKg,
    nisabKg,
    isNisabReached,
    ratePercentage,
    zakatKg,
    zakatRp,
  };
}

/**
 * 8 Golongan Penerima Zakat (Mustahik) menurut QS. At-Taubah: 60
 */
export const ASNAF_MUSTAHIK = [
  {
    name: 'Fakir',
    arabic: 'الْفُقَرَاءِ',
    description: 'Orang yang tidak memiliki harta atau mata pencaharian sama sekali, atau memiliki penghasilan tetapi kurang dari setengah kebutuhan pokoknya.',
  },
  {
    name: 'Miskin',
    arabic: 'الْمَسَاكِينِ',
    description: 'Orang yang memiliki pekerjaan atau penghasilan tetapi belum cukup untuk memenuhi kebutuhan pokok primer hidupnya.',
  },
  {
    name: 'Amil Zakat',
    arabic: 'الْعَامِلِينَ عَلَيْهَا',
    description: 'Petugas / pengelola yang ditunjuk untuk mengumpulkan, mengadministrasikan, dan mendistribusikan zakat.',
  },
  {
    name: 'Muallaf',
    arabic: 'الْمُؤَلَّفَةِ قُلُوبُهُمْ',
    description: 'Orang yang baru masuk Islam agar semakin mantap hatinya, atau orang yang diharapkan keislamannya dan kebaikannya.',
  },
  {
    name: 'Riqab (Memerdekakan Budak)',
    arabic: 'فِي الرِّقَابِ',
    description: 'Upaya pembebasan budak atau pembebasan muslim yang tertawan, serta pemberantasan perdagangan manusia.',
  },
  {
    name: 'Gharimin (Berhutang)',
    arabic: 'الْغَارِمِينَ',
    description: 'Orang yang berhutang untuk keperluan mubah atau mendamaikan sengketa dan tidak mampu melunasinya.',
  },
  {
    name: 'Fisabilillah',
    arabic: 'فِي سَبِيلِ اللَّهِ',
    description: 'Aktivitas perjuangan di jalan Allah untuk menegakkan syiar Islam, pendidikan Islam, dakwah, dan kemaslahatan umum umat.',
  },
  {
    name: 'Ibnu Sabil',
    arabic: 'وَابْنِ السَّبِيلِ',
    description: 'Musafir yang kehabisan bekal dalam perjalanan yang bukan maksiat (misalnya menuntut ilmu atau berdakwah).',
  },
];

/**
 * Doa-Doa Seputar Zakat
 */
export const DOA_ZAKAT = [
  {
    category: 'Niat Zakat Fitrah (Diri Sendiri)',
    arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِي فَرْضًا لِلَّهِ تَعَالَى',
    latin: "Nawaitu an ukhrija zakaatal fithri 'an nafsii fardhan lillaahi ta'aalaa.",
    translation: "Aku berniat mengeluarkan zakat fitrah untuk diriku sendiri, fardhu karena Allah Ta'ala.",
  },
  {
    category: 'Niat Zakat Fitrah (Untuk Istri)',
    arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ زَوْجَتِي فَرْضًا لِلَّهِ تَعَالَى',
    latin: "Nawaitu an ukhrija zakaatal fithri 'an zaujatii fardhan lillaahi ta'aalaa.",
    translation: "Aku berniat mengeluarkan zakat fitrah untuk istriku, fardhu karena Allah Ta'ala.",
  },
  {
    category: 'Niat Zakat Fitrah (Untuk Seluruh Keluarga)',
    arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنِّي وَعَنْ جَمِيعِ مَا يَلْزَمُنِي نَفَقَتُهُمْ شَرْعًا فَرْضًا لِلَّهِ تَعَالَى',
    latin: "Nawaitu an ukhrija zakaatal fithri 'annii wa 'an jamii'i maa yalzamunii nafaqatuhum syar'an fardhan lillaahi ta'aalaa.",
    translation: "Aku berniat mengeluarkan zakat fitrah untuk diriku dan seluruh orang yang nafkahnya menjadi tanggunganku, fardhu karena Allah Ta'ala.",
  },
  {
    category: 'Niat Zakat Maal / Harta Simpanan',
    arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ مَالِي فَرْضًا لِلَّهِ تَعَالَى',
    latin: "Nawaitu an ukhrija zakaata maalii fardhan lillaahi ta'aalaa.",
    translation: "Aku berniat mengeluarkan zakat hartaku, fardhu karena Allah Ta'ala.",
  },
  {
    category: 'Doa Penerima Zakat untuk Muzakki (Amil / Mustahik)',
    arabic: 'آجَرَكَ اللَّهُ فِيمَا أَعْطَيْتَ، وَبَارَكَ فِيمَا أَبْقَيْتَ، وَجَعَلَهُ لَكَ طَهُورًا',
    latin: 'Aajarakallaahu fiimaa a\'thaita, wa baaraka fiimaa abqaita, wa ja\'alahu laka thahuuraa.',
    translation: 'Semoga Allah memberikan pahala atas apa yang telah engkau berikan, memberikan berkah atas harta yang masih engkau simpan, dan menjadikannya pembersih dosamu.',
  },
];
