import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { randomUUID } from 'expo-crypto';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
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
      logo: profile?.logo || '', // Store the logo URI
    },
  });

  // Function to pick an image
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

  const onSubmit = (data: OwnerEntityType) => {
    Keyboard.dismiss();
    setProfile(data); // Save profile with logo
    router.back();
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="text-2xl font-bold">My Business</Text>
        <Text className="mb-4 text-gray-600">
          This information will appear on all your invoices as the sender's details. Make sure it's
          accurate and up to date.
        </Text>

        {/* Logo Picker */}
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

        {/* Business Info Fields */}
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
