import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View, Modal, ActivityIndicator } from 'react-native';

import { Button } from '~/components/Button';
import { useStore } from '~/store';

function ListItem({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
      <Text className="text-base">{title}</Text>
      <Entypo name="chevron-right" size={24} color="gray" />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const profile = useStore((data) => data.profile);
  const deleteAccount = useStore((data) => data.deleteAccount);

  function handleConfirmDelete() {
    setLoading(true);

    setTimeout(() => {
      deleteAccount();
      setLoading(false);
      setModalVisible(false);
      router.replace('/onboarding');
    }, 2000);
  }

  return (
    <>
      <View className="flex-1 bg-gray-50 p-4">
        <View className="mb-1 border-b border-gray-200 pb-4 pt-2">
          <Text className="text-3xl font-bold ">{profile?.name || 'My Business'}</Text>
          <Text className="mt-1 text-gray-500">GST No.: {profile.gst}</Text>
        </View>
        <View className="overflow-hidden rounded-lg">
          <ListItem title="Edit Business Details" onPress={() => router.push('/profile/edit')} />
          <ListItem
            title="Edit Invoice Number Format"
            onPress={() => router.push('/profile/invoice-format')}
          />
        </View>
      </View>
      <View className="px-2">
        <Button
          className="mb-2 py-3"
          variant="danger"
          title="Delete Account"
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
            {loading ? (
              <View className="flex items-center justify-center">
                <ActivityIndicator size="large" color="red" />
                <Text className="mt-4 text-gray-600">Deleting account...</Text>
              </View>
            ) : (
              <>
                <Text className="mb-4 text-lg font-semibold">Confirm Account Deletion</Text>
                <Text className="mb-4 text-gray-600">
                  Are you sure you want to delete your account? This action cannot be undone.
                </Text>
                <View className="flex-row justify-end gap-4">
                  <Button
                    className="flex-1 items-center justify-center py-2"
                    title="Cancel"
                    variant="link"
                    onPress={() => setModalVisible(false)}
                  />
                  <Button
                    title="Delete"
                    variant="danger"
                    className=" flex-1 items-center justify-center py-2 "
                    onPress={handleConfirmDelete}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
