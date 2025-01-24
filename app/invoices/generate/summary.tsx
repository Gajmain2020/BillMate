import { Link, Redirect, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { useStore } from '~/store';

export default function Summary() {
  const invoice = useStore((data) => data.newInvoice);
  const getSubtotal = useStore((data) => data.getSubtotal());
  const getGst = useStore((data) => data.getGst());
  const getTotal = useStore((data) => data.getTotal());

  const addContact = useStore((data) => data.addContact);
  // const saveInvoice = useStore((data) => data.saveInvoice);

  if (!invoice) return <Redirect href="/" />;

  const handleGenerateInvoice = () => {
    // save invoice to database

    if (invoice?.recipient) {
      addContact(invoice.recipient);
    }

    router.push('/invoices/generate/success');
  };

  return (
    <KeyboardAwareScrollView>
      <View className="gap-2 shadow">
        {/* INVOICE DETAILS */}
        <View className="mb-3">
          <Text className="text-4xl font-bold ">#{invoice?.invoiceNumber}</Text>

          <View className="mt-2 flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-500">Date</Text>
              <Text className="text-sm text-gray-500">{invoice?.date?.toLocaleDateString()}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Due Date</Text>
              <Text className="text-sm text-gray-500">
                {invoice?.dueDate?.toLocaleDateString() || ''}
              </Text>
            </View>
          </View>
        </View>

        {/* SENDER CARD */}
        {invoice?.sender && (
          <View>
            <Text className="mb-1 text-lg font-semibold color-slate-500">Sender</Text>

            <View className="rounded bg-gray-50 px-4 py-2 shadow">
              <Text>{invoice.sender.name}</Text>
              <Text>{invoice.sender.address}</Text>
              <Text>{invoice.sender.gst}</Text>
            </View>
          </View>
        )}

        {/* RECIPIENT CARD */}
        {invoice?.recipient && (
          <View>
            <Text className="mb-1 text-lg font-semibold color-slate-500">Recipient</Text>

            <View className="rounded bg-gray-50 px-4 py-2 shadow">
              <Text>{invoice.recipient.name}</Text>
              <Text>{invoice.recipient.address}</Text>
              <Text>{invoice.recipient.gst}</Text>
            </View>
          </View>
        )}

        {/* ITEMS CARD */}
        <View>
          <Text className="mb-1 text-lg font-semibold color-slate-500">Items</Text>
          <View className="rounded bg-gray-50 px-4 py-2 shadow">
            {/* Header */}
            <View className="mb-1 flex-row justify-between border-b border-gray-300">
              <Text className="flex-1 font-medium">Item</Text>
              <Text className="w-20 text-right font-medium">Qty</Text>
              <Text className="w-20 text-right font-medium">Price</Text>
              <Text className="w-24 text-right font-medium">Total</Text>
            </View>

            {/* SAMPLE ITEMS */}
            {invoice?.items?.map((item) => (
              <View key={item.name} className="flex-row justify-between">
                <Text className="flex-1 ">{item.name}</Text>
                <Text className="w-20 text-right ">{item.quantity}</Text>
                <Text className="w-20 text-right ">{item.price.toFixed(2)}</Text>
                <Text className="w-24 text-right font-semibold">
                  ₹ {(item.price * item.quantity).toFixed()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* TOTALS CARD */}
        <View>
          <Text className="mb-1 text-lg font-semibold color-slate-500">Totals</Text>

          <View className="rounded bg-gray-50 px-4 py-2 shadow">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text className="font-semibold">₹ {getSubtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text>GST (5%)</Text>
              <Text className="font-semibold">₹ {getGst.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between border-t border-gray-300">
              <Text>Total</Text>
              <Text className="font-semibold">₹ {getTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* GENERATE INVOICE BUTTON */}

        <Button title="Generate Invoice" className="mt-auto" onPress={handleGenerateInvoice} />
      </View>
    </KeyboardAwareScrollView>
  );
}
