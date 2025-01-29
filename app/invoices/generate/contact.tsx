import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { Text, Pressable, View, TextInput, TouchableOpacity } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function ContactScreen() {
  const contacts = useStore((data) => data.contacts);
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);

  const [search, setSearch] = useState<string>('');

  // Handle search input changes
  const handleSearchValueChange = (text: string) => {
    setSearch(text);
  };

  // Redirect to new-contact screen if no contacts exist
  if (contacts.length === 0) {
    return <Redirect href="/invoices/generate/new-contact" />;
  }

  const onContactPress = (contact: BusinessEntityType) => {
    addRecipientInfo(contact);
    router.push('/invoices/generate/items');
  };

  return (
    <>
      <View className="flex-row items-center rounded border border-gray-300 p-2 ">
        <TextInput
          value={search}
          onChangeText={handleSearchValueChange}
          placeholder="Search contacts..."
          className="flex-1 rounded border border-gray-300 py-2"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} className="ml-2">
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <Pressable
        onPress={() => {
          addRecipientInfo(null);
          router.push('/invoices/generate/new-contact');
        }}
        className="absolute bottom-8 right-8 z-10 h-14 w-14 items-center justify-center rounded-full bg-emerald-600 shadow-lg">
        <MaterialCommunityIcons name="plus" size={32} color="white" />
      </Pressable>

      <Animated.FlatList
        itemLayoutAnimation={LinearTransition}
        className="flex-1"
        data={contacts.filter((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        )}
        contentContainerClassName="p-2 gap-1"
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item: contact }) => (
          <Pressable
            onPress={() => onContactPress(contact)}
            className="mb-2 rounded-lg bg-white px-4 py-2 shadow-sm">
            <Text className="text-lg font-semibold">{contact.name}</Text>
            <Text className="text-gray-600">{contact.address}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-xl font-bold">No Contacts Found</Text>
          </View>
        }
      />
    </>
  );
}
