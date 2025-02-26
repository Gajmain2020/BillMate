import { zodResolver } from '@hookform/resolvers/zod';
import { randomUUID } from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View, Image, TouchableOpacity } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function Profile() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);
  const setOnboardingCompleted = useStore((data) => data.setOnboardingCompleted);
  const setLogo = useStore((data) => data.setLogo);

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
          <CustomTextInput
            name="altContact"
            label="Alternate Contact Number"
            placeholder="Enter your alternate contact number"
          />

          <CustomTextInput name="website" label="Website" placeholder="Enter your website link" />

          <CustomTextInput name="gst" label="GST No.*" placeholder="Enter your GST number" />
        </View>

        <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
