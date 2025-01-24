import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomDatePicker from '~/components/CustomDatePicker';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { invoiceInfoSchema, InvoiceInfoType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function GenerateInvoice() {
  const addInvoiceInfo = useStore((data) => data.addInvoiceInfo);
  const invoice = useStore((data) => data.newInvoice);
  const numberOfContacts = useStore((data) => data.contacts.length);

  const form = useForm<InvoiceInfoType>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: invoice?.invoiceNumber,
      date: invoice?.date,
      dueDate: invoice?.dueDate,
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    addInvoiceInfo(data);
    if (numberOfContacts === 0) {
      router.push('/invoices/generate/new-contact');
    } else {
      router.push('/invoices/generate/contact');
    }
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
          <CustomDatePicker name="date" label="Date" />
          <CustomDatePicker name="dueDate" label="Due Date" />
        </View>

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
