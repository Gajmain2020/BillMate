import { Stack, router } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { useStore } from '~/store';

export default function Home() {
  const existingNewInvoice = useStore((data) => data.newInvoice);
  const startNewInvoice = useStore((data) => data.startNewInvoice);

  const onResumeInvoice = () => {
    router.push('/invoices/generate');
  };

  const onNewPress = () => {
    startNewInvoice();
    router.push('/invoices/generate');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center gap-8 p-5">
        <ImageBackground
          className="absolute h-full w-full opacity-10"
          source={require('../../assets/bg.jpg')}
          resizeMode="cover"
        />
        <View className="items-center gap-2">
          <Text className="text-4xl font-bold">BillMate</Text>
          <Text className="text-center text-lg text-gray-600">
            Create and share professional invoices in seconds
          </Text>
        </View>
        <View className="gap-5">
          <Button onPress={onNewPress} title="Start New Invoice" />
          {existingNewInvoice && (
            <View className="items-center justify-center">
              <Button variant="link" onPress={onResumeInvoice} title="Resume Invoice" />
            </View>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
