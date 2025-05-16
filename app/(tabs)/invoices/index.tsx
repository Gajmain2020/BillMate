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
    <View className="flex-1 bg-gray-50">
      {/* Search + Filter */}
      <View className="mx-2 mb-2 mt-1 flex-row items-center rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm">
        <TouchableOpacity
          className={`mr-3 rounded-md border px-3 py-2 ${
            searchByRecipient ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 bg-white'
          }`}
          onPress={() => setSearchByRecipient(!searchByRecipient)}
          activeOpacity={0.7}>
          <Text className={`font-semibold ${searchByRecipient ? 'text-white' : 'text-gray-600'}`}>
            To:
          </Text>
        </TouchableOpacity>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={
            searchByRecipient ? 'Search by Recipient Name...' : 'Search by Invoice Number...'
          }
          className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-base text-gray-800"
          placeholderTextColor="#9ca3af"
          clearButtonMode="while-editing"
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="ml-3"
          activeOpacity={0.7}>
          <Ionicons name="filter" size={28} color="#4b5563" />
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
        contentContainerStyle={{ paddingHorizontal: 12 }}
        data={filteredInvoices}
        renderItem={({ item }) => <InvoiceItem item={item} />}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition}
        ListEmptyComponent={
          <View className="mt-12 flex-1 items-center justify-center">
            <Text className="mb-2 text-2xl font-semibold text-gray-400">No Invoices Found</Text>
            <Text className="px-4 text-center text-gray-500">
              Try changing your filters or add a new invoice.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* New Invoice Button fixed at bottom */}
      <Button title="New Invoice" onPress={handleNewInvoice} className="mx-4 mb-4 py-3" />
    </View>
  );
}
