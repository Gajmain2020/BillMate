import { useLocalSearchParams, Stack } from 'expo-router';

import { useStore } from '~/store';

export default function ContactLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Contacts', headerTitleAlign: 'center' }} />
      <Stack.Screen name="[id]/edit" options={{ title: 'Edit Contact' }} />
      <Stack.Screen name="[id]/invoices" />
    </Stack>
  );
}
