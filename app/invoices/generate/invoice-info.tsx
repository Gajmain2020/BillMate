import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { invoiceInfoSchema, InvoiceInfoType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function GenerateInvoice() {
  const addInvoiceInfo = useStore((data) => data.addInvoiceInfo);
  const invoice = useStore((data) => data.newInvoice);

  const form = useForm<InvoiceInfoType>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: invoice?.invoiceNumber,
      date: invoice?.date,
      dueDate: invoice?.dueDate,
    },
  });

  const onSubmit = (data: any) => {
    addInvoiceInfo(data);
    router.push('/invoices/generate/items');
  };

  return (
    <KeyboardAwareScrollView>
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
