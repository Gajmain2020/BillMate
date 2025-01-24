import { useRouter } from 'expo-router';
import { View, Text, FlatList } from 'react-native';

import { BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

function ContactListItem({ contact }: { contact: BusinessEntityType }) {
  const startNewInvoice = useStore((data) => data.startNewInvoice);
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);
  const router = useRouter();

  const onNewInvoicePressed = () => {
    startNewInvoice();
    addRecipientInfo(contact);
    router.push('/invoices/generate');
  };

  return (
    <View className="flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <View>
        <Text className="text-lg font-semibold">{contact.name}</Text>
        <Text className="text-gray-600">{contact.address}</Text>
      </View>
      <Text onPress={onNewInvoicePressed} className="font-medium text-emerald-600">
        New Invoice
      </Text>
    </View>
  );
}

export default function ContactScreen() {
  const contacts = useStore((data) => data.contacts);

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

  return (
    <FlatList
      className="flex-1"
      data={contacts}
      contentContainerClassName="p-2 gap-2"
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => <ContactListItem contact={item} />}
    />
  );
}
