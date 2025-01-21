import { Stack } from 'expo-router';
import '../global.css';

// import { vexo } from 'vexo-analytics';

// if (__DEV__) {
//   vexo(process.env.VEXO_API_KEY || '');
// }

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="invoices/generate" options={{ headerShown: false }} />
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
