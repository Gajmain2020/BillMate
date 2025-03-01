import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, ZoomIn, ZoomOut } from 'react-native-reanimated';

import { Button } from '~/components/Button';
import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store';
import { getTotals } from '~/utils/invoice';

export function InvoiceItem({ item }: { item: Invoice }) {
  const { total } = getTotals(item);
  const deleteInvoice = useStore((data) => data.deleteInvoice);

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)}>
        <TouchableOpacity
          onPress={() => router.push(`/invoices/${item.id}`)}
          onLongPress={() => setVisible(true)}>
          <View className="mb-1 rounded-lg bg-white p-4 shadow-sm">
            <View className="flex-row justify-between">
              <Text className="text-bold text-lg">#{item.invoiceNumber}</Text>
              <Text className="text-bold">₹{total.toFixed(2)}</Text>
            </View>
            <View className="border-t border-t-gray-200" />
            <View className="mt-1">
              <View className="flex-row">
                <Text>To: </Text>
                <Text className="font-bold text-gray-600">{item.recipient.name}</Text>
              </View>
              <Text className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View className="flex-1 items-center justify-center bg-gray-800/50">
            <TouchableWithoutFeedback>
              <View className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
                <Text className="mb-4 text-center text-lg font-semibold">Are you sure?</Text>
                <Text className="mb-6 text-center text-gray-500">
                  Do you want to delete this invoice?
                </Text>
                <View className="flex-row justify-between">
                  <Button
                    className="h-10 flex-1 items-center justify-center py-0 "
                    title="Cancel"
                    variant="link"
                    onPress={() => setVisible(false)}
                  />
                  <Button
                    title="Delete"
                    className="h-10 flex-1 items-center justify-center bg-red-400 py-0"
                    onPress={() => {
                      deleteInvoice(item.id);
                      setVisible(false);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
