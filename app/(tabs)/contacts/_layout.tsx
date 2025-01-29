import { Stack } from 'expo-router';

export default function ContactLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Contacts', headerTitleAlign: 'center' }} />
      <Stack.Screen name="[id]/edit" options={{ title: 'Edit Contact' }} />
    </Stack>
  );
}
