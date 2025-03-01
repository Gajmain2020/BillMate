import { zodResolver } from '@hookform/resolvers/zod';
import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { businessEntitySchema, BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function GenerateInvoice() {
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);
  const recipient = useStore((data) => data.newInvoice?.recipient);

  const form = useForm<BusinessEntityType>({
    resolver: zodResolver(businessEntitySchema),
    defaultValues: {
      id: recipient?.id || Crypto.randomUUID(),
      name: recipient?.name || '',
      address: recipient?.address || '',
      gst: recipient?.gst || '',
      contact: recipient?.contact || '', // Ensure contact is never undefined
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    addRecipientInfo(data);
    router.push('/invoices/generate/items');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">New Contact</Text>

        <View className="gap-2">
          <CustomTextInput name="name" label="Name" placeholder="Enter client's name" />
          <CustomTextInput
            name="address"
            label="Address"
            placeholder="Enter client's address"
            className="min-h-20"
            textAlignVertical="top"
            multiline
          />
          <CustomTextInput
            name="contact"
            label="Contact Number"
            placeholder="Enter client's contact number "
          />
          <CustomTextInput
            name="gst"
            label="GST No."
            placeholder="Enter client's GST number (if any)"
          />
        </View>

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
