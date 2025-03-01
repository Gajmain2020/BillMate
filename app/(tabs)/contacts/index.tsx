import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

import ContactListItem from '~/components/ContactListItem';
import { useStore } from '~/store';

export default function ContactScreen() {
  const contacts = useStore((state) => state.contacts);
  const [search, setSearch] = useState('');

  return (
    <>
      {/* Search Input */}
      <View className="flex-row items-center rounded border border-gray-300 p-2">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search contacts..."
          className="flex-1 rounded border border-gray-300 py-2"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} className="ml-2">
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contact List */}
      <Animated.FlatList
        contentContainerClassName="p-2 gap-1"
        data={contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactListItem contact={item} />}
        ListEmptyComponent={
          <Animated.View
            entering={FadeIn.duration(300)}
            className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-xl font-bold">No Contacts Found</Text>
            <Text className="text-center text-gray-600">
              Your contacts will appear here after you create invoices.
            </Text>
          </Animated.View>
        }
        entering={SlideInRight.duration(300)}
        exiting={SlideOutLeft.duration(300)}
      />
    </>
  );
}
