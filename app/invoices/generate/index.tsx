import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

export default function GenerateInvoice() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.warn('all good go to next step');
  };

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 p-4">
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Sender Info</Text>

        <View className="gap-2">
          <CustomTextInput name="name" label="Name" placeholder="Enter your name" />
          <CustomTextInput
            name="address"
            label="Address"
            placeholder="Enter your address"
            multiline
          />
          <CustomTextInput name="texId" label="Tax ID" placeholder="Enter your tax id" />
        </View>

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </SafeAreaView>
  );
}
