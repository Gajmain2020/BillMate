import { Stack } from 'expo-router';

export default function GenerateInvoiceLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sender Information' }} />
      <Stack.Screen name="invoice-info" options={{ title: 'Invoice Information' }} />
      <Stack.Screen name="recipient" options={{ title: 'Recipient Information' }} />
      <Stack.Screen name="items" options={{ title: 'Items' }} />
      <Stack.Screen name="summary" options={{ title: 'Summary' }} />
    </Stack>
  );
}
