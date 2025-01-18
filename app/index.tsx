import { Stack, Link, router } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { useStore } from '~/store';

export default function Home() {
  const existingNewInvoice = useStore((data) => data.newInvoice);
  const resetFunction = useStore((data) => data.resetNewInvoice);

  const onNewInvoice = () => {
    router.push('/invoices/generate');
  };

  const onNewPress = () => {
    resetFunction();
    router.push('/invoices/generate');
  };

  return (
    <KeyboardAwareScrollView>
      <Stack.Screen options={{ headerShown: false }} />
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
        <View className="gap-5">
          <Button
            onPress={onNewInvoice}
            title={existingNewInvoice ? 'Resume Invoicing' : 'New Invoice'}
          />
          {existingNewInvoice && (
            <View className="items-center justify-center gap-0 ">
              <Button
                variant="link"
                onPress={onNewPress}
                className="h-8 flex-1 items-center py-0"
                title="Start New Invoice"
              />
              <Button
                className="h-8 flex-1 items-center py-0"
                variant="link"
                onPress={() => resetFunction()}
                title="Reset"
              />
            </View>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
