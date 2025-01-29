import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { Button } from '~/components/Button';

import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store';
import { getTotals } from '~/utils/invoice';

export default function InvoicesScreen() {
  const invoices = useStore((state) => state.invoices);
  const startNewInvoice = useStore((state) => state.startNewInvoice);

  const handleNewInvoice = () => {
    startNewInvoice();
    router.push('/invoices/generate');
  };

  const renderInvoice = ({ item }: { item: Invoice }) => {
    const { total } = getTotals(item);
    return (
      <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
        <View className="flex-row justify-between">
          <Text className="text-bold text-lg">#{item.invoiceNumber}</Text>
          <Text className="text-bold">₹{total.toFixed(2)}</Text>
        </View>
        <View className="mt-2">
          <Text className=" text-gray-600">#{item.invoiceNumber}</Text>
          <Text className="text-sm text-gray-500">
            {new Date(item.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={[]}
        renderItem={renderInvoice}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-2xl text-gray-600">No Invoices Yet</Text>
            <Text className="text-center text-gray-500">
              Create your first invoice to get started.
            </Text>
          </View>
        }
      />

      <Button title="New Invoice" onPress={handleNewInvoice} className="mt-4" />
    </View>
  );
}
