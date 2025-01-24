import { zodResolver } from '@hookform/resolvers/zod';
import * as Crypto from 'expo-crypto';
import { router, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { businessEntitySchema, BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function EditContactScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const contact = useStore((data) => data.contacts.find((c) => c.id === id));
  const updateContact = useStore((data) => data.updateContact);

  const form = useForm<BusinessEntityType>({
    resolver: zodResolver(businessEntitySchema),
    defaultValues: {
      id: contact?.id,
      name: contact?.name,
      address: contact?.address,
      gst: contact?.gst,
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    updateContact(data);
    router.back();
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">New Contact</Text>

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
