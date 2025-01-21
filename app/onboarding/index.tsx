import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

export default function Welcome() {
  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 justify-center p-8">
        <View className="items-center gap-4">
          <Text className="text-center text-4xl font-bold">Welcome To BillMate</Text>

          <Text className="text-center text-lg text-gray-600">
            Create and share professional invoices in seconds. Let's get started by setting up your
            business details.
          </Text>

          <View className="w-full pt-8">
            <Button title="Get Started" onPress={() => router.push('/onboarding/profile')} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
