import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useColorScheme,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { CityInfo, INDONESIA_CITIES } from '@/utils/prayerTimes';

interface CitySelectorModalProps {
  visible: boolean;
  currentCity: CityInfo;
  onSelectCity: (city: CityInfo) => void;
  onSelectCustomCoordinates: (name: string, lat: number, lng: number, timezone: number) => void;
  onClose: () => void;
}

export function CitySelectorModal({
  visible,
  currentCity,
  onSelectCity,
  onSelectCustomCoordinates,
  onClose,
}: CitySelectorModalProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomForm, setShowForm] = useState(false);
  const [customName, setCustomName] = useState('Lokasi Saya');
  const [customLat, setCustomLat] = useState('-6.9175');
  const [customLng, setCustomLng] = useState('107.6191');
  const [customTz, setCustomTz] = useState('7');

  const filteredCities = INDONESIA_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.province.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveCustom = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    const tz = parseInt(customTz, 10);
    if (!isNaN(lat) && !isNaN(lng) && !isNaN(tz)) {
      onSelectCustomCoordinates(customName.trim() || 'Lokasi Kustom', lat, lng, tz);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>Pilih Lokasi Jadwal</Text>
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                Perhitungan hisab offline akurat sesuai koordinat
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={[styles.closeText, { color: colors.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Mode Switcher */}
          <View style={styles.tabSwitcher}>
            <TouchableOpacity
              onPress={() => setShowForm(false)}
              style={[
                styles.switchBtn,
                !showCustomForm && {
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  styles.switchBtnText,
                  { color: !showCustomForm ? '#ffffff' : colors.textSecondary },
                ]}>
                Daftar Kota ({INDONESIA_CITIES.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowForm(true)}
              style={[
                styles.switchBtn,
                showCustomForm && {
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  styles.switchBtnText,
                  { color: showCustomForm ? '#ffffff' : colors.textSecondary },
                ]}>
                + Koordinat GPS Kustom
              </Text>
            </TouchableOpacity>
          </View>

          {!showCustomForm ? (
            <>
              {/* Search input */}
              <View style={[styles.searchBox, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}>
                <Text style={{ fontSize: 16 }}>🔍</Text>
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Cari nama kota atau provinsi..."
                  placeholderTextColor={colors.textSecondary}
                  style={[styles.searchInput, { color: colors.text }]}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Text style={{ color: colors.textSecondary, fontSize: 14 }}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* City List */}
              <ScrollView style={styles.listContainer} keyboardShouldPersistTaps="handled">
                {filteredCities.map((city) => {
                  const isSelected = currentCity.id === city.id;
                  return (
                    <TouchableOpacity
                      key={city.id}
                      onPress={() => {
                        onSelectCity(city);
                        onClose();
                      }}
                      style={[
                        styles.cityItem,
                        { borderBottomColor: colors.border },
                        isSelected && {
                          backgroundColor: scheme === 'dark' ? '#064e3b' : '#ecfdf5',
                        },
                      ]}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.cityRow}>
                          <Text
                            style={[
                              styles.cityName,
                              { color: isSelected ? colors.primary : colors.text },
                            ]}>
                            {city.name}
                          </Text>
                          <View
                            style={[
                              styles.tzBadge,
                              { backgroundColor: scheme === 'dark' ? '#1e293b' : '#e2e8f0' },
                            ]}>
                            <Text style={[styles.tzText, { color: colors.textSecondary }]}>
                              {city.timezoneLabel}
                            </Text>
                          </View>
                        </View>
                        <Text style={[styles.cityProvince, { color: colors.textSecondary }]}>
                          {city.province} • Lat: {city.coordinates.latitude.toFixed(2)}°, Lng:{' '}
                          {city.coordinates.longitude.toFixed(2)}°
                        </Text>
                      </View>
                      {isSelected && <Text style={[styles.checkMark, { color: colors.primary }]}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : (
            /* Custom Coordinates Form */
            <ScrollView style={styles.customFormContainer}>
              <Text style={[styles.formNote, { color: colors.textSecondary }]}>
                Gunakan koordinat GPS kustom untuk daerah pelosok atau lokasi spesifik Anda. Seluruh perhitungan astronomi dilakukan offline secara matematis.
              </Text>

              <Text style={[styles.inputLabel, { color: colors.text }]}>Nama Lokasi / Tempat:</Text>
              <TextInput
                value={customName}
                onChangeText={setCustomName}
                placeholder="Contoh: Rumah Saya / Masjid Al-Ikhlas"
                placeholderTextColor={colors.textSecondary}
                style={[styles.inputField, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
              />

              <Text style={[styles.inputLabel, { color: colors.text }]}>Latitude (Garis Lintang, misal -6.9175):</Text>
              <TextInput
                value={customLat}
                onChangeText={setCustomLat}
                keyboardType="numeric"
                placeholder="-6.9175"
                placeholderTextColor={colors.textSecondary}
                style={[styles.inputField, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
              />

              <Text style={[styles.inputLabel, { color: colors.text }]}>Longitude (Garis Bujur, misal 107.6191):</Text>
              <TextInput
                value={customLng}
                onChangeText={setCustomLng}
                keyboardType="numeric"
                placeholder="107.6191"
                placeholderTextColor={colors.textSecondary}
                style={[styles.inputField, { backgroundColor: colors.cardAlt, borderColor: colors.border, color: colors.text }]}
              />

              <Text style={[styles.inputLabel, { color: colors.text }]}>Zona Waktu (UTC Offset):</Text>
              <View style={styles.tzRow}>
                {[
                  { label: 'WIB (UTC+7)', tz: 7 },
                  { label: 'WITA (UTC+8)', tz: 8 },
                  { label: 'WIT (UTC+9)', tz: 9 },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.tz}
                    onPress={() => setCustomTz(item.tz.toString())}
                    style={[
                      styles.tzBtn,
                      { borderColor: colors.border, backgroundColor: colors.cardAlt },
                      customTz === item.tz.toString() && {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.tzBtnText,
                        { color: customTz === item.tz.toString() ? '#ffffff' : colors.text },
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={handleSaveCustom}
                style={[styles.saveCustomBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.saveCustomText}>Gunakan Koordinat Kustom</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  tabSwitcher: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  switchBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginVertical: 2,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cityName: {
    fontSize: 15,
    fontWeight: '600',
  },
  cityProvince: {
    fontSize: 12,
    marginTop: 2,
  },
  tzBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tzText: {
    fontSize: 10,
    fontWeight: '700',
  },
  checkMark: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 8,
  },
  customFormContainer: {
    padding: 16,
  },
  formNote: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  tzRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  tzBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  tzBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  saveCustomBtn: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveCustomText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
