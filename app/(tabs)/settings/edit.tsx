import { zodResolver } from '@hookform/resolvers/zod';
import { randomUUID } from 'expo-crypto';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { BusinessEntityType, ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function Profile() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);

  const form = useForm<OwnerEntityType>({
    resolver: zodResolver(ownerEntitySchema),
    defaultValues: {
      id: profile?.id || randomUUID(),
      name: profile?.name || '',
      address: profile?.address || '',
      gst: profile?.gst || '',
      contact: profile?.contact || '',
      altContact: profile?.altContact || '',
      email: profile?.email || '',
      website: profile?.website || '',
    },
  });

  const onSubmit = (data: OwnerEntityType) => {
    Keyboard.dismiss();
    setProfile({
      id: data.id,
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      gst: data.gst,
      altContact: data.altContact,
      website: data.website,
    }); //TODO: maybe auto save
    router.back();
    // show ui feedback:
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-1 text-2xl font-bold">My Business</Text>
        <Text className="mb-4 text-gray-600">
          This information will appear on all your invoices as the sender's details. Make sure it's
          accurate and up to date.
        </Text>

        <View className="gap-2">
          <CustomTextInput
            name="name"
            label="Business Name"
            placeholder="Enter your business name"
          />
          <CustomTextInput
            name="address"
            label="Address"
            placeholder="Enter your address"
            multiline
          />
          <CustomTextInput name="gst" label="GST No." placeholder="Enter your GST number" />
          <CustomTextInput name="contact" label="Contact" placeholder="Enter your contact number" />
          <CustomTextInput
            name="altContact"
            label="Alternate Contact"
            placeholder="Enter alternate contact number"
          />
          <CustomTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <CustomTextInput name="website" label="Website" placeholder="Enter your website" />
        </View>

        <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
