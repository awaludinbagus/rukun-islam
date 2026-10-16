import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Platform,
} from 'react-native';
import { Colors, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { useAppSettings } from '@/hooks/use-app-settings';
import {
  calculateZakatFitrah,
  calculateZakatMaal,
  calculateZakatIncome,
  calculateZakatTrade,
  calculateZakatAgriculture,
  formatRupiah,
  ASNAF_MUSTAHIK,
  DOA_ZAKAT,
  NISAB_GOLD_GRAMS,
} from '@/utils/zakatCalculator';
import { ArabicBlock } from '@/components/arabic-block';

export default function ZakatScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { settings, setGoldPrice, setRicePrice } = useAppSettings();

  const [activeTab, setActiveTab] = useState<'fitrah' | 'maal' | 'profesi' | 'dagang' | 'pertanian' | 'mustahik'>('fitrah');

  // State Zakat Fitrah
  const [fitrahMembers, setFitrahMembers] = useState('4');
  const [fitrahRicePrice, setFitrahRicePrice] = useState(settings.ricePricePerKg.toString());

  // State Zakat Maal
  const [maalSavings, setMaalSavings] = useState('150000000');
  const [maalGoldValue, setMaalGoldValue] = useState('0');
  const [maalOtherAssets, setMaalOtherAssets] = useState('0');
  const [maalDebts, setMaalDebts] = useState('10000000');
  const [maalGoldPrice, setMaalGoldPrice] = useState(settings.goldPricePerGram.toString());
  const [maalHaul, setMaalHaul] = useState(true);

  // State Zakat Profesi
  const [profSalary, setProfSalary] = useState('15000000');
  const [profExtra, setProfExtra] = useState('2000000');
  const [profExpenses, setProfExpenses] = useState('6000000');

  // State Zakat Perniagaan
  const [tradeGoods, setTradeGoods] = useState('120000000');
  const [tradeCash, setTradeCash] = useState('30000000');
  const [tradeReceivables, setTradeReceivables] = useState('15000000');
  const [tradePayables, setTradePayables] = useState('20000000');

  // State Zakat Pertanian
  const [agriHarvestKg, setAgriHarvestKg] = useState('1200');
  const [agriIrrigation, setAgriIrrigation] = useState<'rain' | 'pump' | 'mixed'>('pump');
  const [agriPriceKg, setAgriPriceKg] = useState('12000');

  // Kalkulasi Hasil
  const resFitrah = calculateZakatFitrah({
    familyMembers: parseInt(fitrahMembers, 10) || 1,
    ricePricePerKg: parseInt(fitrahRicePrice, 10) || 15000,
    measureType: 'kg',
  });

  const resMaal = calculateZakatMaal({
    savings: parseInt(maalSavings, 10) || 0,
    goldValue: parseInt(maalGoldValue, 10) || 0,
    otherAssets: parseInt(maalOtherAssets, 10) || 0,
    shortTermDebts: parseInt(maalDebts, 10) || 0,
    goldPricePerGram: parseInt(maalGoldPrice, 10) || settings.goldPricePerGram,
    isHaulReached: maalHaul,
  });

  const resProfesi = calculateZakatIncome({
    monthlySalary: parseInt(profSalary, 10) || 0,
    additionalIncome: parseInt(profExtra, 10) || 0,
    monthlyExpenses: parseInt(profExpenses, 10) || 0,
    goldPricePerGram: parseInt(maalGoldPrice, 10) || settings.goldPricePerGram,
  });

  const resTrade = calculateZakatTrade({
    goodsStock: parseInt(tradeGoods, 10) || 0,
    cashInHand: parseInt(tradeCash, 10) || 0,
    receivables: parseInt(tradeReceivables, 10) || 0,
    payables: parseInt(tradePayables, 10) || 0,
    goldPricePerGram: parseInt(maalGoldPrice, 10) || settings.goldPricePerGram,
  });

  const resAgri = calculateZakatAgriculture({
    harvestKg: parseInt(agriHarvestKg, 10) || 0,
    irrigationType: agriIrrigation,
    cropPricePerKg: parseInt(agriPriceKg, 10) || 12000,
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        {/* Header */}
        <View
          style={[
            styles.headerBanner,
            { backgroundColor: scheme === 'dark' ? '#78350f' : '#d97706' },
          ]}>
          <Text style={styles.headerSubtitle}>Rukun Islam ke-3</Text>
          <Text style={styles.headerTitle}>Kalkulator & Panduan Zakat</Text>
          <Text style={styles.headerDesc}>
            Perhitungan zakat offline akurat: Zakat Fitrah, Maal, Profesi, Perniagaan & Pertanian
          </Text>
        </View>

        {/* Tab Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {[
              { key: 'fitrah', label: '🌾 Zakat Fitrah' },
              { key: 'maal', label: '🪙 Zakat Maal' },
              { key: 'profesi', label: '💼 Penghasilan' },
              { key: 'dagang', label: '🏪 Perniagaan' },
              { key: 'pertanian', label: '🌱 Pertanian' },
              { key: 'mustahik', label: '👥 8 Asnaf' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key as any)}
                style={[
                  styles.tabItem,
                  activeTab === tab.key && {
                    backgroundColor: colors.accent,
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
        </ScrollView>

        {/* 1. ZAKAT FITRAH */}
        {activeTab === 'fitrah' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kalkulator Zakat Fitrah
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Zakat yang wajib dikeluarkan setiap jiwa muslim di bulan Ramadhan sebesar 2,5 kg (atau 3,5 liter) beras makanan pokok.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Jumlah Anggota Keluarga (Jiwa):</Text>
                <TextInput
                  value={fitrahMembers}
                  onChangeText={setFitrahMembers}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                  placeholder="Contoh: 4"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Harga Beras Per Kilogram (Rp):</Text>
                <TextInput
                  value={fitrahRicePrice}
                  onChangeText={(val) => {
                    setFitrahRicePrice(val);
                    const n = parseInt(val, 10);
                    if (!isNaN(n)) setRicePrice(n);
                  }}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                  placeholder="15000"
                />
              </View>

              {/* Hasil Zakat Fitrah */}
              <View
                style={[
                  styles.resultBox,
                  { backgroundColor: scheme === 'dark' ? '#451a03' : '#fffbeb', borderColor: colors.accent },
                ]}>
                <Text style={[styles.resultPre, { color: colors.accent }]}>TOTAL ZAKAT FITRAH WAJIB DIBAYARKAN</Text>
                <Text style={[styles.resultMain, { color: colors.text }]}>
                  {formatRupiah(resFitrah.totalPriceRp)}
                </Text>
                <Text style={[styles.resultSub, { color: colors.textSecondary }]}>
                  Atau setara dengan beras: <Text style={{ fontWeight: '800', color: colors.accent }}>{resFitrah.totalRiceKg} kg</Text> ({resFitrah.totalRiceLiter} liter) untuk {resFitrah.familyMembers} jiwa.
                </Text>
              </View>
            </View>

            {/* Doa Niat Zakat Fitrah */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 8 }]}>
                Lafadz Niat Zakat Fitrah
              </Text>
              {DOA_ZAKAT.filter((d) => d.category.includes('Fitrah')).map((item, idx) => (
                <ArabicBlock
                  key={idx}
                  title={item.category}
                  arabic={item.arabic}
                  latin={item.latin}
                  translation={item.translation}
                />
              ))}
            </View>
          </View>
        )}

        {/* 2. ZAKAT MAAL */}
        {activeTab === 'maal' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kalkulator Zakat Maal (Harta Simpanan / Emas)
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Nisab setara 85 gram emas murni ({formatRupiah(resMaal.nisabRp)}) dengan kepemilikan genap 1 tahun (haul). Kadar zakat adalah 2,5%.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Saldo Tabungan / Deposito / Giro (Rp):</Text>
                <TextInput
                  value={maalSavings}
                  onChangeText={setMaalSavings}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Nilai Emas / Logam Mulia Simpanan (Rp):</Text>
                <TextInput
                  value={maalGoldValue}
                  onChangeText={setMaalGoldValue}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Aset Lancar Lainnya / Saham / Piutang Pasti (Rp):</Text>
                <TextInput
                  value={maalOtherAssets}
                  onChangeText={setMaalOtherAssets}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Hutang Jatuh Tempo / Cicilan Pokok Mendesak (Rp):</Text>
                <TextInput
                  value={maalDebts}
                  onChangeText={setMaalDebts}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Harga Emas Per Gram Saat Ini (Rp):</Text>
                <TextInput
                  value={maalGoldPrice}
                  onChangeText={(val) => {
                    setMaalGoldPrice(val);
                    const n = parseInt(val, 10);
                    if (!isNaN(n)) setGoldPrice(n);
                  }}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              {/* Haul Checkbox */}
              <TouchableOpacity
                onPress={() => setMaalHaul(!maalHaul)}
                style={styles.checkboxRow}>
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: colors.border, backgroundColor: colors.cardAlt },
                    maalHaul && { backgroundColor: colors.accent, borderColor: colors.accent },
                  ]}>
                  <Text style={{ color: maalHaul ? '#ffffff' : 'transparent', fontWeight: '900', fontSize: 12 }}>✓</Text>
                </View>
                <Text style={[styles.checkboxLabel, { color: colors.text }]}>
                  Harta tersebut telah tersimpan / dimiliki genap 1 Tahun Hijriah (Mencapai Haul)
                </Text>
              </TouchableOpacity>

              {/* Hasil Zakat Maal */}
              <View
                style={[
                  styles.resultBox,
                  {
                    backgroundColor: resMaal.isLiable
                      ? scheme === 'dark' ? '#064e3b' : '#ecfdf5'
                      : scheme === 'dark' ? '#1e293b' : '#f1f5f9',
                    borderColor: resMaal.isLiable ? colors.primary : colors.border,
                  },
                ]}>
                <Text style={[styles.resultPre, { color: resMaal.isLiable ? colors.primary : colors.textSecondary }]}>
                  {resMaal.isLiable ? 'STATUS: WAJIB MENGELUARKAN ZAKAT MAAL' : 'STATUS: BELUM WAJIB ZAKAT MAAL'}
                </Text>
                <Text style={[styles.resultMain, { color: colors.text }]}>
                  {formatRupiah(resMaal.zakatAmountRp)}
                </Text>
                <Text style={[styles.resultSub, { color: colors.textSecondary }]}>
                  Total Harta Bersih: {formatRupiah(resMaal.netAssets)} • Batas Nisab (85g emas): {formatRupiah(resMaal.nisabRp)}.
                  {!resMaal.isNisabReached && ' Harta Anda belum mencapai batas nisab 85 gram emas.'}
                  {resMaal.isNisabReached && !maalHaul && ' Harta telah mencapai nisab tetapi belum genap 1 tahun (haul).'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* 3. ZAKAT PENGHASILAN / PROFESI */}
        {activeTab === 'profesi' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kalkulator Zakat Penghasilan / Profesi
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Sesuai Fatwa MUI No. 3 Tahun 2003, zakat profesi dikeluarkan dari penghasilan halal per bulan dengan nisab setara 85 gram emas pertahun (dibagi 12 bulan = {formatRupiah(resProfesi.monthlyNisabRp)}/bulan). Kadar zakat 2,5%.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Gaji / Penghasilan Bulanan Rutin (Rp):</Text>
                <TextInput
                  value={profSalary}
                  onChangeText={setProfSalary}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Penghasilan Tambahan / Bonus / Lembur Bulanan (Rp):</Text>
                <TextInput
                  value={profExtra}
                  onChangeText={setProfExtra}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Kebutuhan Pokok Primer & Cicilan Pokok Bulanan (Rp):</Text>
                <TextInput
                  value={profExpenses}
                  onChangeText={setProfExpenses}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              {/* Hasil Zakat Profesi */}
              <View
                style={[
                  styles.resultBox,
                  {
                    backgroundColor: resProfesi.isNisabReached
                      ? scheme === 'dark' ? '#064e3b' : '#ecfdf5'
                      : scheme === 'dark' ? '#1e293b' : '#f1f5f9',
                    borderColor: resProfesi.isNisabReached ? colors.primary : colors.border,
                  },
                ]}>
                <Text style={[styles.resultPre, { color: resProfesi.isNisabReached ? colors.primary : colors.textSecondary }]}>
                  {resProfesi.isNisabReached ? 'STATUS: WAJIB ZAKAT PROFESI' : 'STATUS: BELUM MENCAPAI NISAB'}
                </Text>
                <Text style={[styles.resultMain, { color: colors.text }]}>
                  {formatRupiah(resProfesi.zakatMonthlyRp)} / bulan
                </Text>
                <Text style={[styles.resultSub, { color: colors.textSecondary }]}>
                  Estimasi zakat tahunan: {formatRupiah(resProfesi.zakatYearlyRp)} • Penghasilan bersih bulanan: {formatRupiah(resProfesi.netMonthly)} • Nisab per bulan: {formatRupiah(resProfesi.monthlyNisabRp)}.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* 4. ZAKAT PERNIAGAAN */}
        {activeTab === 'dagang' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kalkulator Zakat Perniagaan (Dagang)
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Dihitung dari modal kerja berputar + persediaan barang dagang siap jual + piutang lancar, dikurangi hutang dagang jatuh tempo. Nisab 85 gram emas, kadar 2,5%.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Nilai Stok Barang Dagangan (Rp):</Text>
                <TextInput
                  value={tradeGoods}
                  onChangeText={setTradeGoods}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Uang Kas / Kas Bank Usaha Berputar (Rp):</Text>
                <TextInput
                  value={tradeCash}
                  onChangeText={setTradeCash}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Piutang Dagang Lancar Tertagih (Rp):</Text>
                <TextInput
                  value={tradeReceivables}
                  onChangeText={setTradeReceivables}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Hutang Dagang Jatuh Tempo (Rp):</Text>
                <TextInput
                  value={tradePayables}
                  onChangeText={setTradePayables}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              {/* Hasil Zakat Perniagaan */}
              <View
                style={[
                  styles.resultBox,
                  {
                    backgroundColor: resTrade.isNisabReached
                      ? scheme === 'dark' ? '#064e3b' : '#ecfdf5'
                      : scheme === 'dark' ? '#1e293b' : '#f1f5f9',
                    borderColor: resTrade.isNisabReached ? colors.primary : colors.border,
                  },
                ]}>
                <Text style={[styles.resultPre, { color: resTrade.isNisabReached ? colors.primary : colors.textSecondary }]}>
                  {resTrade.isNisabReached ? 'STATUS: WAJIB ZAKAT PERNIAGAAN' : 'STATUS: BELUM MENCAPAI NISAB'}
                </Text>
                <Text style={[styles.resultMain, { color: colors.text }]}>
                  {formatRupiah(resTrade.zakatAmountRp)}
                </Text>
                <Text style={[styles.resultSub, { color: colors.textSecondary }]}>
                  Modal Kerja Bersih: {formatRupiah(resTrade.netWorkingCapital)} • Batas Nisab: {formatRupiah(resTrade.nisabRp)}.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* 5. ZAKAT PERTANIAN */}
        {activeTab === 'pertanian' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kalkulator Zakat Pertanian
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Dikeluarkan setiap kali panen. Nisab sebesar 5 wasaq (653 kg gabah kering giling atau 520 kg beras). Kadar: 10% jika tadah hujan (tanpa biaya air), 5% jika memakai irigasi berbayar / pompa.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Total Hasil Panen (Kg):</Text>
                <TextInput
                  value={agriHarvestKg}
                  onChangeText={setAgriHarvestKg}
                  keyboardType="numeric"
                  style={[styles.input, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Sistem Pengairan / Irigasi:</Text>
                <View style={styles.typeRow}>
                  {[
                    { id: 'pump', label: 'Irigasi / Pompa (5%)' },
                    { id: 'rain', label: 'Tadah Hujan (10%)' },
                    { id: 'mixed', label: 'Campuran (7.5%)' },
                  ].map((t) => (
                    <TouchableOpacity
                      key={t.id}
                      onPress={() => setAgriIrrigation(t.id as any)}
                      style={[
                        styles.typeBtn,
                        { backgroundColor: colors.cardAlt, borderColor: colors.border },
                        agriIrrigation === t.id && {
                          backgroundColor: colors.primary,
                          borderColor: colors.primary,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.typeBtnText,
                          { color: agriIrrigation === t.id ? '#ffffff' : colors.text },
                        ]}>
                        {t.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Hasil Pertanian */}
              <View
                style={[
                  styles.resultBox,
                  {
                    backgroundColor: resAgri.isNisabReached
                      ? scheme === 'dark' ? '#064e3b' : '#ecfdf5'
                      : scheme === 'dark' ? '#1e293b' : '#f1f5f9',
                    borderColor: resAgri.isNisabReached ? colors.primary : colors.border,
                  },
                ]}>
                <Text style={[styles.resultPre, { color: resAgri.isNisabReached ? colors.primary : colors.textSecondary }]}>
                  {resAgri.isNisabReached ? 'STATUS: WAJIB ZAKAT PERTANIAN' : 'STATUS: BELUM MENCAPAI NISAB (653 KG)'}
                </Text>
                <Text style={[styles.resultMain, { color: colors.text }]}>
                  {resAgri.zakatKg.toFixed(1)} Kg ({resAgri.ratePercentage}%)
                </Text>
                <Text style={[styles.resultSub, { color: colors.textSecondary }]}>
                  Atau senilai {formatRupiah(resAgri.zakatRp)} jika diuangkan dengan asumsi harga gabah/beras {formatRupiah(parseInt(agriPriceKg, 10) || 12000)}/kg.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* 6. MUSTAHIK (8 ASNAF) & DOA */}
        {activeTab === 'mustahik' && (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                8 Golongan Penerima Zakat (8 Asnaf)
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                Berdasarkan firman Allah dalam QS. At-Taubah ayat 60, zakat hanya boleh disalurkan kepada delapan golongan berikut:
              </Text>
            </View>

            {ASNAF_MUSTAHIK.map((asnaf, idx) => (
              <View
                key={idx}
                style={[styles.asnafCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.asnafHeader}>
                  <View style={[styles.asnafBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.asnafBadgeText}>{idx + 1}</Text>
                  </View>
                  <Text style={[styles.asnafName, { color: colors.text }]}>{asnaf.name}</Text>
                  <Text style={[styles.asnafArabic, { color: colors.primary }]}>{asnaf.arabic}</Text>
                </View>
                <Text style={[styles.asnafDesc, { color: colors.textSecondary }]}>
                  {asnaf.description}
                </Text>
              </View>
            ))}

            {/* Doa Penerima Zakat */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 10 }]}>
              <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 8 }]}>
                Doa Ketika Membayar & Menerima Zakat
              </Text>
              {DOA_ZAKAT.map((item, idx) => (
                <ArabicBlock
                  key={idx}
                  title={item.category}
                  arabic={item.arabic}
                  latin={item.latin}
                  translation={item.translation}
                />
              ))}
            </View>
          </View>
        )}

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
    color: '#fef3c7',
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
    color: '#fef9c3',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  tabScroll: {
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
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
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 12,
    lineHeight: 17,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  resultBox: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
    marginTop: 10,
  },
  resultPre: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  resultMain: {
    fontSize: 26,
    fontWeight: '900',
    marginVertical: 4,
  },
  resultSub: {
    fontSize: 12,
    lineHeight: 17,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  typeBtn: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  asnafCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  asnafHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  asnafBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  asnafBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  asnafName: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  asnafArabic: {
    fontSize: 16,
    fontFamily: 'serif',
  },
  asnafDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
});
