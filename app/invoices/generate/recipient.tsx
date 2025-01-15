import { zodResolver } from '@hookform/resolvers/zod';
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
      name: recipient?.name,
      address: recipient?.address,
      gst: recipient?.gst,
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    addRecipientInfo(data);
    router.push('/invoices/generate/invoice-info');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Recipient Info</Text>

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
