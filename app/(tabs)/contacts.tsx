import { Redirect } from 'expo-router';
import { View, Text, FlatList } from 'react-native';

import { useStore } from '~/store';

export default function ContactScreen() {
  const contacts = useStore((data) => data.contacts);

  if (contacts.length === 0) {
    return <Redirect href="/invoices/generate/recipient" />;
  }

  return (
    <FlatList
      className="flex-1"
      data={contacts}
      contentContainerClassName="p-2 gap-2"
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item: contact }) => (
        <View className="mb-1 rounded-lg bg-white px-4 py-2 shadow-sm">
          <Text className="text-lg font-semibold">{contact.name}</Text>
          <Text className="text-gray-600">{contact.address}</Text>
          {/* {item.gst && <Text className="text-gray-600">GST No.: {item.gst}</Text>} */}
        </View>
      )}
    />
  );
}
