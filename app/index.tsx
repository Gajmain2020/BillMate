import { Stack, Link } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

export default function Home() {
  return (
    <KeyboardAwareScrollView>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className="flex-1 justify-center gap-8 ">
        <ImageBackground
          className="absolute h-full w-full opacity-10"
          source={require('../assets/bg.jpg')}
          resizeMode="cover"
        />
        <View className="items-center gap-2">
          <Text className="text-4xl font-bold">BillMate</Text>
          <Text className="text-center text-lg text-gray-600">
            Create and share professional invoices in seconds
          </Text>
        </View>
        <Link href={{ pathname: '/invoices/generate' }} asChild>
          <Button title="New Invoice" />
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}
