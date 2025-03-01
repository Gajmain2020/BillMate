import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, ZoomIn, ZoomOut } from 'react-native-reanimated';

import { Button } from '~/components/Button';
import { BusinessEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function ContactListItem({ contact }: { contact: BusinessEntityType }) {
  const deleteContact = useStore((data) => data.deleteContact);
  const startNewInvoice = useStore((data) => data.startNewInvoice);
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);

  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const onNewInvoicePressed = () => {
    startNewInvoice();
    addRecipientInfo(contact);
    router.push('/invoices/generate');
  };

  return (
    <>
      <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)}>
        <TouchableOpacity
          onLongPress={() => setVisible(true)}
          className="flex-row items-center justify-between gap-1 rounded-lg bg-white px-4 py-2 shadow-md">
          <View>
            <Text className="text-lg font-semibold">{contact.name}</Text>
            <Text className="text-gray-600">{contact.contact}</Text>
            <Text className="text-gray-600">{contact.address}</Text>
          </View>

          <View className="flex-row items-center gap-6">
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
            <FontAwesome6
              name="angle-right"
              color="dimgray"
              size={20}
              onPress={() => router.push(`/contacts/${contact.id}/invoices`)}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View className="flex-1 items-center justify-center bg-gray-800/50">
            <TouchableWithoutFeedback>
              <View className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
                <Text className="mb-4 text-center text-lg font-semibold">Are you sure?</Text>
                <Text className="mb-6 text-center text-gray-500">
                  Do you want to delete this contact?
                </Text>
                <View className="flex-row justify-between">
                  <Button
                    title="Cancel"
                    className="h-10 flex-1 items-center justify-center py-0"
                    variant="link"
                    onPress={() => setVisible(false)}
                  />
                  <Button
                    title="Delete"
                    className="h-10 flex-1 items-center justify-center bg-red-400 py-0"
                    onPress={() => {
                      deleteContact(contact.id);
                      setVisible(false);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
