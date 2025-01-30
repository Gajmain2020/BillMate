import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { useStore } from '~/store';

const formatSchema = z.object({
  format: z.string().min(1, 'Format is required.'),
});

type FormatForm = z.infer<typeof formatSchema>;

export default function InvoiceFormat() {
  const invoiceNumberFormat = useStore((data) => data.invoiceNumberFormat);
  const setInvoiceNumberFormat = useStore((data) => data.setInvoiceNumberFormat);

  const form = useForm<FormatForm>({
    resolver: zodResolver(formatSchema),
    defaultValues: {
      format: invoiceNumberFormat,
    },
  });

  const onSubmit = (data: FormatForm) => {
    // Handle save logic here
    setInvoiceNumberFormat(data.format);
    router.back();
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Invoice Number Format</Text>
        <Text className="mb-4 text-gray-600">
          Configure how your invoice numbers will be generated. Use X for numbers (e.g. INV-XXX will
          generate INV-001, INV-002, etc.)
        </Text>
        <View className="gap-4">
          <CustomTextInput name="format" label="Format" />
        </View>

        <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
