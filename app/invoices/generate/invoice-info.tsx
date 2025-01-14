import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

const invoiceInfoSchema = z.object({
  invoiceNumber: z
    .string({ required_error: 'Invoice Number is required.' })
    .min(1, 'Invoice Number is required'),
  date: z.string({ required_error: 'Date is required.' }).min(1, 'Date is required'),
  dueDate: z.string({ required_error: 'Due Date is required.' }).min(1, 'Due Date is required'),
});

type InvoiceInfoType = z.infer<typeof invoiceInfoSchema>;

export default function GenerateInvoice() {
  const form = useForm<InvoiceInfoType>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: '1234',
      date: new Date().toISOString(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    },
  });

  const onSubmit = (data: any) => {
    router.push('/invoices/generate/items');
  };

  return (
    <KeyboardAwareScrollView className="p-4">
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Invoice Info</Text>

        <View className="gap-2">
          <CustomTextInput
            name="invoiceNumber"
            label="Invoice Number"
            placeholder="Enter invoice number"
          />
          <CustomTextInput name="date" label="Date" placeholder="Enter date of invoice" multiline />
          <CustomTextInput
            name="dueDate"
            label="Due Date"
            placeholder="Enter due date of invoice"
          />
        </View>

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
