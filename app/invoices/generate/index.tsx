import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

export default function GenerateInvoice() {
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 p-4">
      <Text className="mb-5 text-2xl font-bold">Sender Info</Text>

      <CustomTextInput label="Name" placeholder="Enter your name" />
      <CustomTextInput label="Address" placeholder="Enter your address" multiline />
      <CustomTextInput label="Tax ID" placeholder="Enter your tax id" />

      <Button title="Next" className="mt-auto" />
    </SafeAreaView>
  );
}
