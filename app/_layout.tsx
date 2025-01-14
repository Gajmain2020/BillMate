import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="invoices/generate" options={{ headerShown: false }} />
    </Stack>
  );
}
