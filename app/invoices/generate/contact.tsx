import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, FlatList, Pressable } from 'react-native';

import { BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function ContactScreen() {
  const contacts = useStore((data) => data.contacts);
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);

  if (contacts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-xl font-bold">No Contacts Yet</Text>
        <Text className="mb-8 text-center text-gray-600">
          Your contacts will appear here after you create invoices.
        </Text>
      </View>
    );
  }

  const onContactPress = (contact: BusinessEntityType) => {
    addRecipientInfo(contact);
    router.push('/invoices/generate/items');
  };

  return (
    <>
      <Pressable
        onPress={() => {
          addRecipientInfo(null);
          router.push('/invoices/generate/new-contact');
        }}
        className="absolute bottom-8 right-8 z-10 h-14 w-14 items-center justify-center rounded-full bg-emerald-600 shadow-lg">
        <MaterialCommunityIcons name="plus" size={32} color="white" />
      </Pressable>
      <FlatList
        className="flex-1"
        data={contacts}
        contentContainerClassName="p-2 gap-1"
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item: contact }) => (
          <Pressable
            onPress={() => onContactPress(contact)}
            className="mb-2 rounded-lg bg-white px-4 py-2 shadow-sm">
            <Text className="text-lg font-semibold">{contact.name}</Text>
            <Text className="text-gray-600">{contact.address}</Text>
            <Text className="text-gray-600">{contact.id}</Text>
            {/* {item.gst && <Text className="text-gray-600">GST No.: {item.gst}</Text>} */}
          </Pressable>
        )}
      />
    </>
  );
}
