import { useLocalSearchParams } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { useStore } from '~/store';
import { getTotals } from '~/utils/invoice';
import { generateInvoicePdf } from '~/utils/pdf';

export default function InvoiceDetails() {
  const { id } = useLocalSearchParams();
  const invoice = useStore((state) => state.invoices.find((inv) => inv.id === id));
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (invoice) {
      handleGeneratePdf();
    }
  }, [invoice]);

  if (!invoice) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-600">Invoice not found</Text>
      </View>
    );
  }

  const { subtotal, gst, total } = getTotals(invoice);

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    const uri = (await generateInvoicePdf(invoice, subtotal, gst, total)) || '';
    setPdfUri(uri);
    setIsLoading(false);
  };

  const handleShare = async () => {
    if (!pdfUri) return;
    await shareAsync(pdfUri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        {/* Invoice Details */}
        <View className="mb-4">
          <Text className="text-4xl font-bold">#{invoice.invoiceNumber}</Text>
          <View className="mt-2 flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-500">Date</Text>
              <Text className="text-sm text-gray-500">
                {new Date(invoice.date).toLocaleDateString('en-GB')}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Due Date</Text>
              <Text className="text-sm text-gray-500">
                {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB') : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Sender & Recipient */}
        <View className="mb-4">
          <Text className="text-lg font-semibold">Sender</Text>
          <View className="rounded bg-gray-50 px-4 py-2 shadow">
            <Text>{invoice.sender.name}</Text>
            <Text>{invoice.sender.address}</Text>
            <Text>{invoice.sender.gst}</Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold">Recipient</Text>
          <View className="rounded bg-gray-50 px-4 py-2 shadow">
            <Text>{invoice.recipient.name}</Text>
            <Text>{invoice.recipient.address}</Text>
            <Text>{invoice.recipient.gst}</Text>
          </View>
        </View>

        {/* Items List */}
        <View className="mb-4">
          <Text className="text-lg font-semibold">Items</Text>
          <View className="rounded bg-gray-50 px-4 py-2 shadow">
            {invoice.items.map((item, idx) => (
              <View key={idx} className="flex-row justify-between">
                <Text className="flex-1">{item.name}</Text>
                <Text className="w-20 text-right">{item.quantity}</Text>
                <Text className="w-20 text-right">₹{item.price.toFixed(2)}</Text>
                <Text className="w-24 text-right font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View className="mb-4">
          <Text className="text-lg font-semibold">Totals</Text>
          <View className="rounded bg-gray-50 px-4 py-2 shadow">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text className="font-semibold">₹{subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text>GST (5%)</Text>
              <Text className="font-semibold">₹{gst.toFixed(2)}</Text>
            </View>
            <View className="mt-2 flex-row justify-between border-t border-gray-300 pt-2">
              <Text className="font-bold">Total</Text>
              <Text className="font-bold">₹{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Share Invoice Button */}
      <View className="p-4">
        <Button
          title={isLoading ? 'Generating PDF...' : 'Share Invoice'}
          onPress={handleShare}
          disabled={isLoading}
          variant="primary"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
