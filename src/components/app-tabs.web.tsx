import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, useColorScheme, View, StyleSheet, Text } from 'react-native';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%', flex: 1 }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="🏠">Beranda</TabButton>
          </TabTrigger>
          <TabTrigger name="sholat" href="/sholat" asChild>
            <TabButton icon="🕌">Sholat</TabButton>
          </TabTrigger>
          <TabTrigger name="puasa" href="/puasa" asChild>
            <TabButton icon="🌙">Puasa</TabButton>
          </TabTrigger>
          <TabTrigger name="zakat" href="/zakat" asChild>
            <TabButton icon="🪙">Zakat</TabButton>
          </TabTrigger>
          <TabTrigger name="rukun" href="/rukun" asChild>
            <TabButton icon="📖">5 Rukun</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

interface TabButtonProps extends TabTriggerSlotProps {
  icon?: string;
}

export function TabButton({ children, isFocused, icon, ...props }: TabButtonProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Pressable {...(props as any)} style={({ pressed }: any) => [styles.tabButton, pressed && styles.pressed]}>
      <View
        style={[
          styles.tabButtonView,
          isFocused && { backgroundColor: scheme === 'dark' ? '#064e3b' : '#dcfce7' },
        ]}>
        {icon ? <Text style={styles.tabIcon}>{icon}</Text> : null}
        <ThemedText
          type="smallBold"
          style={{
            fontSize: 12,
            color: isFocused ? colors.primary : colors.textSecondary,
          }}>
          {children}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View {...props} style={styles.tabListContainer}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: scheme === 'dark' ? 0.3 : 0.08,
            shadowRadius: 12,
            elevation: 8,
          },
        ]}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.two,
    paddingBottom: Spacing.two,
    paddingTop: Spacing.one,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 999,
  },
  innerContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    maxWidth: 540,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minWidth: 58,
  },
  tabIcon: {
    fontSize: 18,
  },
});
