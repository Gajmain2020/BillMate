import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, router, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Text, FlatList, Pressable, View, TextInput } from 'react-native';

import { BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function ContactScreen() {
  const navigation = useNavigation(); // Access navigation object
  const contacts = useStore((data) => data.contacts);
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);

  const [search, setSearch] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Contacts',
      headerRight: () => (
        <Pressable
          onPress={() => {
            addRecipientInfo(null);
            router.push('/invoices/generate/new-contact');
          }}
          style={{
            marginRight: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="plus" size={24} color="blue" />
          <Text style={{ color: 'blue', marginLeft: 8 }}>Add</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

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
      <View className="p-2">
        <TextInput
          value={search}
          onChangeText={handleSearchValueChange}
          placeholder="Search contacts..."
          className="rounded border border-gray-300 p-2"
        />
      </View>

      <FlatList
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
      />
    </>
  );
}
