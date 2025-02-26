import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="app-intro" options={{ headerShown: false }} /> {/* ✅ Add this */}
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile Setup',
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
