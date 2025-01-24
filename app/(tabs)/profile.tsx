import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import { businessEntitySchema, BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function Profile() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);

  const form = useForm<BusinessEntityType>({
    resolver: zodResolver(businessEntitySchema),
    defaultValues: {
      name: profile?.name,
      address: profile?.address,
      gst: profile?.gst,
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    setProfile(data); //TODO: maybe auto save
    // show ui feedback:
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={97}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          gap: 5,
        }}>
        <FormProvider {...form}>
          <Text className="mb-1 text-2xl font-bold">My Business</Text>
          <Text className="mb-4 text-gray-600">
            This information will appear on all your invoices as the sender's details. Make sure
            it's accurate and up to date
          </Text>

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

          <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
