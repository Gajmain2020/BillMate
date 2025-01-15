import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '~/components/Button';
import { useStore } from '~/store';

export default function Summary() {
  const invoice = useStore((data) => data.newInvoice);
  const getSubtotal = useStore((data) => data.getSubtotal());
  const getGst = useStore((data) => data.getGst());
  const getTotal = useStore((data) => data.getTotal());

  return (
    <KeyboardAwareScrollView className="p-4">
      <View className="gap-2 shadow">
        {/* SENDER CARD */}
        {invoice.sender && (
          <View className="rounded bg-gray-50 p-4">
            <Text className="mb-2 text-lg font-semibold shadow">Sender Info</Text>
            <View className="gap-1">
              <Text>{invoice.sender.name}</Text>
              <Text>{invoice.sender.address}</Text>
              <Text>{invoice.sender.gst}</Text>
            </View>
          </View>
        )}

        {/* RECIPIENT CARD */}
        {invoice.recipient && (
          <View className="rounded bg-gray-50 p-4 shadow">
            <Text className="mb-2 text-lg font-semibold">Recipient Info</Text>
            <View className="gap-1">
              <Text>{invoice.recipient.name}</Text>
              <Text>{invoice.recipient.address}</Text>
              <Text>{invoice.recipient.gst}</Text>
            </View>
          </View>
        )}

        {/* INVOICE DETAILS */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Invoice Info</Text>
          <View className="gap-1">
            <Text>Invoice #: {invoice.invoiceNumber}</Text>
            <Text>date: {invoice.date}</Text>
            <Text>Due Date: {invoice.dueDate}</Text>
          </View>
        </View>

        {/* ITEMS CARD */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Items</Text>
          <View className="gap-1">
            {/* Header */}
            <View className="flex-row justify-between">
              <Text className="flex-1 font-medium">Item</Text>
              <Text className="w-20 text-right font-medium">Qty</Text>
              <Text className="w-20 text-right font-medium">Price</Text>
              <Text className="w-24 text-right font-medium">Total</Text>
            </View>

            {/* SAMPLE ITEMS */}
            {invoice.items?.map((item) => (
              <View key={item.name} className="flex-row justify-between">
                <Text className="flex-1 ">{item.name}</Text>
                <Text className="w-20 text-right ">{item.quantity}</Text>
                <Text className="w-20 text-right ">{item.price}</Text>
                <Text className="w-24 text-right font-semibold">
                  ₹ {item.price * item.quantity}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* TOTALS CARD */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Totals</Text>
          <View className="gap-1">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text className="font-semibold">₹ {getSubtotal}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text>GST (5%)</Text>
              <Text className="font-semibold">₹ {getGst}</Text>
            </View>

            <View className="flex-row justify-between border-t border-gray-300">
              <Text>Total</Text>
              <Text className="font-semibold">₹ {getTotal}</Text>
            </View>
          </View>
        </View>

        {/* GENRATE INVOICE BUTTON */}
        <Button
          title="Generate Invoice"
          className="mt-auto"
          onPress={() => console.warn(invoice)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
