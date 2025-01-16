import '../global.css';

import { Stack } from 'expo-router';
// import { vexo } from 'vexo-analytics';

// if (__DEV__) {
//   vexo(process.env.VEXO_API_KEY || '');
// }

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="invoices/generate" options={{ headerShown: false }} />
    </Stack>
  );
}
