import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import { invoiceItemSchema } from '~/schema/invoice';
import { useStore } from '~/store';

export const itemsSchema = z.object({
  items: invoiceItemSchema.array(), //TODO: add minimum 1 item
});

export type ItemsType = z.infer<typeof itemsSchema>;

export default function GenerateInvoice() {
  const addItems = useStore((data) => data.addItems);

  const form = useForm<ItemsType>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      items: [
        {
          name: 'E 1',
          quantity: 1,
          price: 10,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = (data: any) => {
    addItems(data.items);
    router.push('/invoices/generate/summary');
  };

  return (
    <KeyboardAwareScrollView className="p-4">
      <FormProvider {...form}>
        <View className="gap-3 ">
          {fields.map((_, index) => (
            <View key={index} className="gap-3 rounded-lg bg-gray-50 p-4 shadow">
              <Text className="text-lg font-semibold">Item {index + 1}</Text>

              <CustomTextInput
                name={`items.${index}.name`}
                label={`Item ${index + 1} Name`}
                placeholder="Enter item name"
              />
              <View className="width-full flex-row gap-2">
                <View className="flex-1">
                  <CustomTextInput
                    name={`items.${index}.price`}
                    label={`Item ${index + 1} Price`}
                    placeholder="Price"
                    keyboardType="numeric"
                    isNumeric
                    onChangeText={(value) => {
                      form.setValue(`items.${index}.price`, Number(value));
                    }}
                  />
                </View>

                <View className="flex-1">
                  <CustomTextInput
                    name={`items.${index}.quantity`}
                    label={`Item ${index + 1} Quantity`}
                    placeholder="Quantity"
                    keyboardType="numeric"
                    isNumeric
                    onChangeText={(value) => {
                      form.setValue(`items.${index}.quantity`, Number(value));
                    }}
                  />
                </View>

                <View className="flex-1 ">
                  <Text className="text-center text-lg font-bold">Total</Text>
                  <Text className="mt-4 text-center text-lg font-bold">
                    ₹
                    {(form.watch(`items.${index}.quantity`) || 0) *
                      (form.watch(`items.${index}.price`) || 0)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <Button
          title="Add Item"
          className="mt-3"
          variant="link"
          onPress={() => {
            append({
              name: 'item',
              quantity: 1,
              price: 10,
            });
          }}
        />
        {/* <Button
          title="Remove Last Item"
          onPress={() => form.remove(form.fields.length - 1)}
          disabled={form.fields.length <= 1}
        /> */}

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
