import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { Button } from '~/components/Button';
import InvoiceFilterModal from '~/components/InvoiceFilterModel';
import { InvoiceItem } from '~/components/InvoiceItem';
import { useStore } from '~/store';
import { getTotals } from '~/utils/invoice';

export default function InvoicesScreen() {
  const [search, setSearch] = useState<string>('');
  const [searchByRecipient, setSearchByRecipient] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price'>('newest');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [amountRange, setAmountRange] = useState<{ min: string; max: string }>({
    min: '',
    max: '',
  });

  const invoices = useStore((state) =>
    state.invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
  const startNewInvoice = useStore((state) => state.startNewInvoice);

  const handleNewInvoice = () => {
    startNewInvoice();
    router.push('/invoices/generate');
  };

  const filteredInvoices = invoices
    .filter((invoice) => {
      if (searchByRecipient) {
        return invoice.recipient.name.toLowerCase().includes(search.toLowerCase());
      }
      return invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    })
    .filter((invoice) => {
      if (dateRange.from && new Date(invoice.date) < dateRange.from) return false;
      if (dateRange.to && new Date(invoice.date) > dateRange.to) return false;
      return true;
    })
    .filter((invoice) => {
      const { total } = getTotals(invoice);
      if (amountRange.min && total < parseFloat(amountRange.min)) return false;
      if (amountRange.max && total > parseFloat(amountRange.max)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'price') return getTotals(b).total - getTotals(a).total;
      return 0;
    });

  return (
    <View className="flex-1">
      {/* Search Input */}
      <View className="flex-row items-center rounded border border-gray-300 p-2">
        <TouchableOpacity
          className={`mr-2 items-center justify-center rounded border px-3 py-2 ${searchByRecipient ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}
          onPress={() => setSearchByRecipient(!searchByRecipient)}>
          <Text className={`${searchByRecipient ? 'text-white' : 'text-gray-600'}`}>To:</Text>
        </TouchableOpacity>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={
            searchByRecipient ? 'Search by Recipient Name...' : 'Search by Invoice Number...'
          }
          className="flex-1 rounded border border-gray-300 py-2"
        />

        <TouchableOpacity onPress={() => setModalVisible(true)} className="ml-2">
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <InvoiceFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        dateRange={dateRange}
        setDateRange={setDateRange}
        amountRange={amountRange}
        setAmountRange={setAmountRange}
      />

      <Animated.FlatList
        contentContainerClassName="p-2 gap-1"
        data={filteredInvoices}
        renderItem={({ item }) => <InvoiceItem item={item} />}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-xl font-bold">No Invoice Found</Text>
          </View>
        }
      />

      <Button title="New Invoice" onPress={handleNewInvoice} className="mb-2 mt-4" />
    </View>
  );
}
