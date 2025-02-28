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
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)}>
        <TouchableOpacity
          onPress={() => router.push(`/contacts/${contact.id}/invoices`)}
          onLongPress={() => setVisible(true)}
          className="flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md">
          <View>
            <Text className="text-lg font-semibold">{contact.name}</Text>
            <Text className="text-gray-600">{contact.address}</Text>
          </View>
          <FontAwesome6 name="angle-right" color="dimgray" size={20} />
        </TouchableOpacity>
      </Animated.View>

      {/* Delete Confirmation Modal */}
      <Modal transparent visible={visible} onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View className="flex-1 items-center justify-center bg-gray-800/50">
            <TouchableWithoutFeedback>
              <Animated.View
                entering={ZoomIn.duration(400)}
                exiting={ZoomOut.duration(400)}
                className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
                <Text className="mb-4 text-center text-lg font-semibold">Are you sure?</Text>
                <Text className="mb-6 text-center text-gray-500">
                  Do you want to delete this contact?
                </Text>
                <View className="flex-row justify-between">
                  <Button title="Cancel" variant="link" onPress={() => setVisible(false)} />
                  <Button
                    title="Delete"
                    className="bg-red-400"
                    onPress={() => {
                      deleteContact(contact.id);
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
