import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { InvoiceItem } from '~/components/InvoiceItem';
import { useStore } from '~/store';

export default function ContactInvoicesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const contacts = useStore((state) => state.contacts);
  const invoices = useStore((state) => state.invoices);

  const contact = contacts.find((c) => c.id === id);
  const [search, setSearch] = useState('');

  const filteredInvoices = invoices.filter(
    (invoice) => invoice.recipient.name.toLowerCase() === contact?.name.toLowerCase()
  );

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: `${contact?.name}'s Invoices` }} />
      {/* Header */}

      {/* Search Input */}
      <View className="flex-row items-center rounded border border-gray-300 p-2">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search invoices..."
          className="flex-1 rounded border border-gray-300 py-2"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} className="ml-2">
            <Text className="text-gray-600">✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Invoice List */}
      <Animated.FlatList
        data={filteredInvoices.filter((invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase())
        )}
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
