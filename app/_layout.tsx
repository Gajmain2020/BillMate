import { Stack } from 'expo-router';
import '../global.css';
import { useEffect, useState } from 'react';
import { useStore } from '~/store';
import { ActivityIndicator } from 'react-native';

// import { vexo } from 'vexo-analytics';

// if (__DEV__) {
//   vexo(process.env.VEXO_API_KEY || '');
// }

export default function Layout() {
  // const [hydrationFinished, setHydrationFinished] = useState(false);

  // useEffect(() => {
  //   if (useStore.persist.hasHydrated()) {
  //     setHydrationFinished(true);
  //     return;
  //   }
  //   const unsub = useStore.persist.onFinishHydration((state: any) => {
  //     console.log('Hydration finished', state);
  //     setHydrationFinished(true);
  //   });

  //   return () => unsub();
  // }, []);

  // if (hydrationFinished) {
  //   return null;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="invoices/generate" options={{ headerShown: false, animation: 'fade' }} />
    </Stack>
  );
}

// export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
//   return (
//     <View className="flex-1 items-center justify-center gap-8 p-8">
//       <View className="items-center gap-2">
//         <Text className="text-4xl font-bold">Oops!!</Text>
//         <Text className="text-center text-lg text-gray-500">Something went wrong.</Text>
//         <Text className="tet-center mt-2 text-gray-500">{error.message}</Text>
//       </View>

//       <Text className="text-lg font-semibold text-blue-600 active:opacity-80" onPress={() => {}}>
//         Try Again
//       </Text>
//     </View>
//   );
// }
