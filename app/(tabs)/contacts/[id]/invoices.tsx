import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import InvoiceFilterModal from '~/components/InvoiceFilterModel';
import { InvoiceItem } from '~/components/InvoiceItem';
import { useStore } from '~/store';
import { getTotals } from '~/utils/invoice';

export default function ContactInvoicesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const contacts = useStore((state) => state.contacts);
  const invoices = useStore((state) => state.invoices);
  const contact = contacts.find((c) => c.id === id);

  const [search, setSearch] = useState('');

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

  const filteredInvoices = invoices
    .filter((invoice) => invoice.recipient.name.toLowerCase() === contact?.name.toLowerCase()) // Ensure only invoices of this contact are considered
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
      <Stack.Screen options={{ title: `${contact?.name}'s Invoices` }} />

      {/* Search & Filter */}
      <View className="flex-row items-center rounded border border-gray-300 p-2">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search invoices..."
          className="flex-1 rounded border border-gray-300 py-2"
        />
        <TouchableOpacity onPress={() => setModalVisible(true)} className="ml-2">
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>

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
      </View>

      {/* Invoice List */}
      <Animated.FlatList
        contentContainerClassName="p-2 gap-1"
        data={filteredInvoices}
        keyExtractor={(item) => item.invoiceNumber}
        renderItem={({ item }) => <InvoiceItem item={item} />}
        ListEmptyComponent={
          <Animated.View
            entering={LinearTransition}
            className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-xl font-bold">No Invoices Found</Text>
            <Text className="text-center text-gray-600">This contact has no invoices yet.</Text>
          </Animated.View>
        }
        entering={LinearTransition}
      />
    </View>
  );
}
