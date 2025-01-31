import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Linking, Modal, TextInput } from 'react-native';

import { Button } from '~/components/Button';

function ListItem({ title, icon, onPress }: { title: string; icon: any; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-gray-200 bg-white p-4">
      <View className="flex-row items-center gap-3">
        <Entypo name={icon} size={24} color="gray" />
        <Text className="text-lg">{title}</Text>
      </View>
      <Entypo name="chevron-right" size={24} color="gray" />
    </Pressable>
  );
}

interface RequestModelProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  requestText: string;
  setRequestText: (text: string) => void;
}

function RequestModal({
  visible,
  onClose,
  onSubmit,
  requestText,
  setRequestText,
}: RequestModelProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable
        className="flex-1 items-center justify-center bg-black/50"
        onPress={onClose} // Close modal when clicking outside
      >
        <Pressable
          className="w-4/5 rounded-lg bg-white p-6 shadow-lg"
          onPress={(e) => e.stopPropagation()}>
          <Text className="mb-4 text-lg font-semibold">Raise a Request</Text>
          <TextInput
            className="mb-4 w-full rounded border p-2"
            placeholder="Enter your request details..."
            multiline
            value={requestText}
            onChangeText={setRequestText}
            numberOfLines={3}
            textAlignVertical="top"
          />
          <View className="flex-row justify-end gap-4">
            <Button className="flex-1 py-3" title="Cancel" variant="link" onPress={onClose} />
            <Button className="flex-1 py-3" title="Submit" variant="primary" onPress={onSubmit} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function ContactScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [requestText, setRequestText] = useState('');

  function handleEmail() {
    Linking.openURL('mailto:support@billmate.com');
  }

  function handleCall() {
    Linking.openURL('tel:+91 7975611308');
  }

  function handleSubmitRequest() {
    // Handle request submission logic here
    setModalVisible(false);
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="mb-6 py-6">
        <Text className="text-3xl font-bold">Contact Us</Text>
        <Text className="mt-2 text-gray-500">We're here to help you.</Text>
      </View>

      <View className="overflow-hidden rounded-lg">
        <ListItem title="Email Support" icon="mail" onPress={handleEmail} />
        <ListItem title="Call Support" icon="phone" onPress={handleCall} />
        {/* <ListItem title="Address" icon="location-pin" onPress={() => console.log('hello')} /> */}
        <ListItem title="Raise a Request" icon="bell" onPress={() => setModalVisible(true)} />
      </View>

      <RequestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitRequest}
        requestText={requestText}
        setRequestText={setRequestText}
      />
    </ScrollView>
  );
}
