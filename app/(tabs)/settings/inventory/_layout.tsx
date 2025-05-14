import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'Inventory', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="sale-summary"
        options={{ headerShown: false, title: 'Sale Summary', headerTitleAlign: 'center' }}
      />
    </Stack>
  );
}
