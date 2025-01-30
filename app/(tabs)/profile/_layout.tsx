import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'Profile', headerTitleAlign: 'center' }}
      />
      <Stack.Screen name="edit" options={{ title: 'Edit Profile', headerTitleAlign: 'center' }} />
      <Stack.Screen
        name="invoice-format"
        options={{ title: 'Invoice Number Format', headerTitleAlign: 'center' }}
      />
    </Stack>
  );
}
