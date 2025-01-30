import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store';
import { generateInvoiceNumber } from '~/utils/invoice';

const formatSchema = z.object({
  format: z
    .string()
    .min(1, 'Format is required.')
    .refine((val) => val.includes('XXX'), {
      message: 'The format must contain XXX for that sequence number.',
    }),
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

  const format = form.watch('format');
  const example1 = generateInvoiceNumber(null, format);
  const example2 = generateInvoiceNumber({ invoiceNumber: example1 }, format);
  const example3 = generateInvoiceNumber({ invoiceNumber: example2 }, format);
  const examples = [example1, example2, example3];

  const onSubmit = (data: FormatForm) => {
    // Handle save logic here
    setInvoiceNumberFormat(data.format);
    router.back();
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-2 text-2xl font-bold">Invoice Number Format</Text>
        <Text className="mb-2 text-gray-600">
          Configure how your invoice numbers will be generated.
        </Text>
        <Text className="mb-2 text-gray-600">
          Use X for the sequence numbers (e.g. INV-XXX will generate INV-001, INV-002, etc.)
        </Text>
        <View className="gap-4">
          <CustomTextInput name="format" label="Format" />
        </View>

        <View className="mt-3 rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 font-medium text-gray-700">
            Preview of next invoice number sequence.
          </Text>
          <View className="flex-row items-center gap-3">
            {examples.map((example) => (
              <View key={example} className="rounded bg-white px-3 py-1 shadow-sm">
                <Text className="text-gray-600">{example}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
