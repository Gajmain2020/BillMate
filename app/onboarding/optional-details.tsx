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

export default function OptionalDetails() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);

  const form = useForm<OwnerEntityType>({
    resolver: zodResolver(ownerEntitySchema),
    defaultValues: {
      // Prefilled Info
      id: profile?.id || randomUUID(),
      name: profile?.name || '',
      address: profile?.address || '',
      gst: profile?.gst || '',
      contact: profile?.contact || '',
      email: profile?.email || '',

      //Optional Information
      altContact: profile?.altContact || '',
      website: profile?.website || '',
      pan: profile?.pan || '',
      upi: profile?.upi || '',
    },
  });

  const onSubmit = (data: OwnerEntityType) => {
    Keyboard.dismiss();
    setProfile({ ...profile, ...data });
    router.replace('/onboarding/logo-selection');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="text-2xl font-bold">Your Business Info</Text>
        <Text className="mb-2 text-gray-600">This information will be used on invoices</Text>

        <View className="flex-1 gap-2">
          <CustomTextInput
            name="altContact"
            label="Alternate Contact Number"
            placeholder="Enter your alternate contact number"
          />

          <CustomTextInput name="website" label="Website" placeholder="Enter your website link" />

          <CustomTextInput name="pan" label="PAN Number" placeholder="Enter your PAN number." />

          <CustomTextInput name="upi" label="UPI" placeholder="Enter your UPI." />
        </View>

        <View className=" flex-row gap-4">
          <Button
            variant="secondary"
            className="flex-1 py-2"
            title="Skip"
            onPress={() => router.push('/onboarding/logo-selection')}
          />
          <Button
            title="Save"
            className="mt-58 flex-1 py-2"
            onPress={form.handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
