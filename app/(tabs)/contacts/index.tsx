import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import { Button } from '~/components/Button';
import { BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

function ContactListItem({ contact }: { contact: BusinessEntityType }) {
  const startNewInvoice = useStore((data) => data.startNewInvoice);
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);
  const deleteContact = useStore((data) => data.deleteContact);
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const onNewInvoicePressed = () => {
    startNewInvoice();
    addRecipientInfo(contact);
    router.push('/invoices/generate');
  };

  return (
    <>
      <Animated.View
        entering={SlideInRight.duration(300)} // Fade in when the item appears
        exiting={SlideOutLeft.duration(300)} // Fade out when the item is removed
      >
        <TouchableOpacity
          onLongPress={() => {
            setSelectedIndex(contact.id);
            setVisible(true);
          }}
          className="flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md">
          <View>
            <Text className="text-lg font-semibold">{contact.name}</Text>
            <Text className="text-gray-600">{contact.address}</Text>
          </View>
          <View className="flex-row gap-6">
            <FontAwesome6
              onPress={() => {
                router.push(`/contacts/${contact.id}/edit`);
              }}
              name="edit"
              color="dimgray"
              size={20}
            />
            <FontAwesome6
              onPress={onNewInvoicePressed}
              name="file-invoice"
              color="dimgray"
              size={20}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Modal transparent visible={visible} onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View className=" flex-1 items-center justify-center bg-gray-800/50">
            <TouchableWithoutFeedback>
              <Animated.View
                entering={ZoomIn.duration(400)} // Scale the modal in
                exiting={ZoomOut.duration(400)} // Scale the modal out
                className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
                <Text className="mb-4 text-center text-lg font-semibold">Are you sure?</Text>
                <Text className="mb-6 text-center text-gray-500">
                  Do you want to delete contact?
                </Text>
                <View className="flex-row justify-between">
                  <Button
                    className="h-10 flex-1 items-center justify-center py-0 "
                    title="Cancel"
                    variant="link"
                    onPress={() => setVisible(false)}
                  />
                  <Button
                    title="Delete"
                    className="h-10 flex-1 items-center justify-center bg-red-400 py-0"
                    onPress={() => {
                      if (selectedIndex !== null) {
                        deleteContact(contact.id);
                        setSelectedIndex(null);
                      }
                      setVisible(false);
                    }}
                  />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

export default function ContactScreen() {
  const contacts = useStore((data) => data.contacts);

  const [search, setSearch] = useState<string>('');

  // Handle search input changes
  const handleSearchValueChange = (text: string) => {
    setSearch(text);
  };

  if (contacts.length === 0) {
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-2xl font-semibold text-gray-800">No Contacts Yet</Text>
        <Text className="text-center text-gray-600">
          Your contacts will appear here after you create invoices.
        </Text>
      </Animated.View>
    );
  }

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
      <Animated.FlatList
        className="flex-1"
        data={contacts.filter((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        )}
        itemLayoutAnimation={LinearTransition}
        contentContainerClassName="p-2 gap-2"
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ContactListItem contact={item} />}
        ListEmptyComponent={
          <Animated.View
            entering={FadeIn.duration(300)}
            className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-xl font-bold">
              {search.length > 0 ? 'No Contacts Found' : 'No Contacts Yet'}
            </Text>
            <Text className="mb-8 text-center text-gray-600">
              Your contacts will appear here after you create invoices.
            </Text>
          </Animated.View>
        }
        entering={SlideInRight.duration(300)} // Slide in the list
        exiting={SlideOutLeft.duration(300)} // Slide out the list
      />
    </>
  );
}
