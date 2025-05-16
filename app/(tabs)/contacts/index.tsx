import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

import ContactListItem from '~/components/ContactListItem';
import { useStore } from '~/store';

export default function ContactScreen() {
  const contacts = useStore((state) => state.contacts);
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Input */}
      <View className="mx-2 mb-2 mt-1 flex-row items-center rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search contacts..."
          className="py-1.5 text-base text-gray-800"
          placeholderTextColor="#9ca3af"
          clearButtonMode="while-editing"
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch('')}
            className="ml-3 rounded-full p-1 active:opacity-70">
            <Ionicons name="close-circle" size={24} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contact List */}
      <Animated.FlatList
        contentContainerStyle={{ paddingHorizontal: 12, gap: 4 }}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactListItem contact={item} />}
        ListEmptyComponent={
          <Animated.View
            entering={FadeIn.duration(300)}
            className="mt-12 flex-1 items-center justify-center px-6">
            <Text className="mb-2 text-2xl font-semibold text-gray-400">No Contacts Found</Text>
            <Text className="text-center text-gray-500">
              Your contacts will appear here after you create invoices.
            </Text>
          </Animated.View>
        }
        entering={SlideInRight.duration(300)}
        exiting={SlideOutLeft.duration(300)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
