import { zodResolver } from '@hookform/resolvers/zod';
import { randomUUID } from 'expo-crypto';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function Profile() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);
  const setOnboardingCompleted = useStore((data) => data.setOnboardingCompleted);

  const form = useForm<OwnerEntityType>({
    resolver: zodResolver(ownerEntitySchema),
    defaultValues: {
      id: profile?.id || randomUUID(),
      name: profile?.name || '',
      address: profile?.address || '',
      gst: profile?.gst || '',
      contact: profile?.contact || '',
      email: profile?.email || '',
    },
  });

  const onSubmit = (data: OwnerEntityType) => {
    Keyboard.dismiss();
    setProfile(data);
    setOnboardingCompleted();
    router.replace('/onboarding/optional-details');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <View className="flex items-center justify-center border-b border-gray-200 py-4">
          <Text className="text-2xl font-bold">Your Business Info</Text>
          <Text className="mb-2 text-gray-600">This information will be used on invoices</Text>
        </View>

        <View className="gap-2">
          <CustomTextInput
            name="name"
            label="Business Name*"
            placeholder="Enter your business name"
          />
          <CustomTextInput
            name="address"
            label="Address*"
            placeholder="Enter your address"
            multiline
            numberOfLines={3}
            className="min-h-20"
            textAlignVertical="top"
          />

          <CustomTextInput name="email" label="Email ID*" placeholder="Enter your email id" />

          <CustomTextInput
            name="contact"
            label="Contact Number*"
            isNumeric
            placeholder="Enter your contact number"
          />

          <CustomTextInput name="gst" label="GST No.*" placeholder="Enter your GST number" />
        </View>
        <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
