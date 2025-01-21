import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { useStore } from '~/store';

export default function GenerateInvoiceLayout() {
  const startNewInvoice = useStore((data) => data.startNewInvoice);
  const newInvoice = useStore((data) => data.newInvoice);

  useEffect(() => {
    if (!newInvoice) {
      startNewInvoice();
    }
  }, []);

  if (!newInvoice) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Invoice Information' }} />
      <Stack.Screen name="recipient" options={{ title: 'Recipient Information' }} />
      <Stack.Screen name="items" options={{ title: 'Items' }} />
      <Stack.Screen name="summary" options={{ title: 'Summary' }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
}
