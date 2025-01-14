import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

const senderInfoSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).min(1, 'Name is required'),
  address: z.string({ required_error: 'Address is required.' }).min(1, 'Address is required'),
  gst: z.string().optional(),
});

type SenderInfoType = z.infer<typeof senderInfoSchema>;

export default function GenerateInvoice() {
  const form = useForm<SenderInfoType>({
    resolver: zodResolver(senderInfoSchema),
    defaultValues: {
      name: 'Gajju',
      address: 'DURG',
      gst: 'hello',
    },
  });

  const onSubmit = (data: any) => {
    router.push('/invoices/generate/recipient');
  };

  return (
    <KeyboardAwareScrollView className="p-4">
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
          <CustomTextInput name="gst" label="GST No." placeholder="Enter your GST number" />
        </View>

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
