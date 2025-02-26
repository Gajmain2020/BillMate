import { zodResolver } from '@hookform/resolvers/zod';
import { randomUUID } from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View, Image, TouchableOpacity } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function LogoSelection() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);
  const setOnboardingCompleted = useStore((data) => data.setOnboardingCompleted);

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

      //Req logo
      logo: profile?.logo || '',
    },
  });

  const onSubmit = (data: OwnerEntityType) => {
    Keyboard.dismiss();
    setProfile(data);
    setOnboardingCompleted();
    router.replace('/');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      form.setValue('logo', result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="text-2xl font-bold">Your Business Info</Text>
        <Text className="mb-2 text-gray-600">This information will be used on invoices</Text>

        {/* Logo Selection */}
        <View className="mb-4 items-center">
          <TouchableOpacity onPress={pickImage}>
            {form.watch('logo') ? (
              <Image source={{ uri: form.watch('logo') }} className="h-24 w-24 rounded-full" />
            ) : (
              <View className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300">
                <Text className="text-gray-500">Select Logo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-4">
          <Button
            variant="secondary"
            className="flex-1 py-2"
            title="Skip"
            onPress={() => router.push('/')}
          />
          <Button
            title="Save"
            className="mt-auto flex-1 py-2"
            onPress={form.handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
