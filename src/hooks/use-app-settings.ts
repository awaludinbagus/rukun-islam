import { useState, useEffect, useCallback } from 'react';
import { INDONESIA_CITIES, CityInfo, DEFAULT_CITY } from '@/utils/prayerTimes';

export interface AppSettings {
  selectedCity: CityInfo;
  goldPricePerGram: number;
  ricePricePerKg: number;
  completedFasts: string[]; // List tanggal format 'YYYY-MM-DD' yang sudah dicentang puasa
  sholatChecklist: { [dateStr: string]: { [prayerName: string]: boolean } };
}

const STORAGE_KEY = 'RUKUN_ISLAM_APP_SETTINGS_V1';

const defaultSettings: AppSettings = {
  selectedCity: DEFAULT_CITY,
  goldPricePerGram: 1450000,
  ricePricePerKg: 15000,
  completedFasts: [],
  sholatChecklist: {},
};

// Global in-memory cache to sync state across screens
let globalSettings: AppSettings = defaultSettings;
const listeners = new Set<(settings: AppSettings) => void>();

function notify(settings: AppSettings) {
  globalSettings = settings;
  listeners.forEach((listener) => listener(settings));
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  } catch (e) {
    // Ignore storage errors in restricted environments
  }
}

// Initial load from localStorage on web if available
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.selectedCity) {
        globalSettings = { ...defaultSettings, ...parsed };
      }
    }
  } catch (e) {
    // fallback to defaults
  }
}

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(globalSettings);

  useEffect(() => {
    const listener = (newSettings: AppSettings) => {
      setSettings(newSettings);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setCity = useCallback((city: CityInfo) => {
    const updated: AppSettings = {
      ...globalSettings,
      selectedCity: city,
    };
    notify(updated);
  }, []);

  const setCustomCoordinates = useCallback(
    (name: string, latitude: number, longitude: number, timezone: number = 7) => {
      const customCity: CityInfo = {
        id: 'custom-' + Date.now(),
        name,
        province: 'Kustom Lokasi',
        coordinates: { latitude, longitude },
        timezone,
        timezoneLabel: timezone === 7 ? 'WIB' : timezone === 8 ? 'WITA' : 'WIT',
      };
      setCity(customCity);
    },
    [setCity]
  );

  const setGoldPrice = useCallback((price: number) => {
    const updated: AppSettings = {
      ...globalSettings,
      goldPricePerGram: price,
    };
    notify(updated);
  }, []);

  const setRicePrice = useCallback((price: number) => {
    const updated: AppSettings = {
      ...globalSettings,
      ricePricePerKg: price,
    };
    notify(updated);
  }, []);

  const toggleFastComplete = useCallback((dateKey: string) => {
    const exists = globalSettings.completedFasts.includes(dateKey);
    const completedFasts = exists
      ? globalSettings.completedFasts.filter((d) => d !== dateKey)
      : [...globalSettings.completedFasts, dateKey];

    const updated: AppSettings = {
      ...globalSettings,
      completedFasts,
    };
    notify(updated);
  }, []);

  const togglePrayerChecklist = useCallback((dateKey: string, prayerName: string) => {
    const currentForDate = globalSettings.sholatChecklist[dateKey] || {};
    const updatedForDate = {
      ...currentForDate,
      [prayerName]: !currentForDate[prayerName],
    };

    const updated: AppSettings = {
      ...globalSettings,
      sholatChecklist: {
        ...globalSettings.sholatChecklist,
        [dateKey]: updatedForDate,
      },
    };
    notify(updated);
  }, []);

  return {
    settings,
    setCity,
    setCustomCoordinates,
    setGoldPrice,
    setRicePrice,
    toggleFastComplete,
    togglePrayerChecklist,
    availableCities: INDONESIA_CITIES,
  };
}
