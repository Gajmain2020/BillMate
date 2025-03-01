import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { invoiceItemSchema } from '~/schema/invoice';
import { useStore } from '~/store';

export const itemsSchema = z.object({
  items: invoiceItemSchema.array(),
});

export type ItemsType = z.infer<typeof itemsSchema>;

export default function InvoiceItems() {
  const addItems = useStore((data) => data.addItems);
  const items = useStore((data) => data.newInvoice?.items);

  const [visible, setVisible] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const form = useForm<ItemsType>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      items: items || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    addItems(data.items);

    if (items?.length === 0) {
      alert('Please add at least one item');
      return;
    }

    router.push('/invoices/generate/summary');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <View className="gap-3">
          {fields.map((_, index) => (
            <TouchableOpacity
              key={`touchable-${index}`}
              onLongPress={() => {
                setSelectedIndex(index);
                setVisible(true);
              }}>
              <View className="gap-3 rounded-lg bg-gray-50 p-4 shadow">
                <Text className="text-lg font-semibold">Item {index + 1}</Text>
                <CustomTextInput
                  name={`items.${index}.name`}
                  label={`Item ${index + 1} Name`}
                  placeholder="Enter item name"
                />
                <View className="flex-row gap-2">
                  <View className="flex-1">
                    <CustomTextInput
                      name={`items.${index}.price`}
                      label={`Item ${index + 1} Price`}
                      placeholder="Price"
                      keyboardType="numeric"
                      isNumber
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
                      isNumber
                      onChangeText={(value) => {
                        form.setValue(`items.${index}.quantity`, Number(value));
                      }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-center text-lg font-bold">Total</Text>
                    <Text className="mt-4 text-center text-lg font-bold">
                      ₹
                      {(form.watch(`items.${index}.quantity`) || 0) *
                        (form.watch(`items.${index}.price`) || 0)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Modal transparent visible={visible} onRequestClose={() => setVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View className=" flex-1 items-center justify-center bg-gray-800/50">
              <TouchableWithoutFeedback>
                <View className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
                  <Text className="mb-4 text-center text-lg font-semibold">Are you sure?</Text>
                  <Text className="mb-6 text-center text-gray-500">
                    Do you want to delete item?
                  </Text>
                  <View className="flex-row justify-between">
                    <Button
                      title="Cancel"
                      variant="link"
                      className="mr-2 h-10 flex-1 p-1"
                      onPress={() => setVisible(false)}
                    />
                    <Button
                      title="Delete"
                      className="h-10 flex-1 items-center bg-red-400 p-1.5"
                      onPress={() => {
                        if (selectedIndex !== null) {
                          remove(selectedIndex);
                          setSelectedIndex(null);
                        }
                        setVisible(false);
                      }}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Button
          title="Add Item"
          className="mt-3"
          variant="link"
          onPress={() => {
            append({
              name: 'item',
              quantity: 1,
              price: 10,
              total: 10,
            });
          }}
        />

        <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
