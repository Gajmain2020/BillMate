import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View, Modal, ActivityIndicator } from 'react-native';

import { Button } from '~/components/Button';
import ReviewModal from '~/components/Review';
import { useStore } from '~/store';

function ListItem({
  title,
  labelRight = '',
  onPress,
}: {
  title: string;
  labelRight: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-gray-200 bg-white p-4">
      <Text className="text-lg">{title}</Text>
      <View className="flex-row items-center gap-2">
        <Text className="text-base text-gray-500">{labelRight}</Text>
        <Entypo name="chevron-right" size={24} color="gray" />
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const profile = useStore((data) => data.profile);
  const deleteAccount = useStore((data) => data.deleteAccount);
  const invoiceNumberFormat = useStore((data) => data.invoiceNumberFormat);

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
      <View className="flex-1  bg-gray-50 p-4">
        <View className="mb-1 py-8">
          <Text className="text-3xl font-bold ">{profile?.name || 'My Business'}</Text>
          <Text className="mt-1 text-gray-500">GST No.: {profile.gst}</Text>
        </View>

        <View className="gap-5">
          <View>
            <Text className="mb-2 ml-2 font-medium text-gray-400">SETTINGS</Text>
            <View className="overflow-hidden rounded-lg">
              <ListItem
                title="Edit Business Details"
                onPress={() => router.push('/settings/edit')}
                labelRight=""
              />
              <ListItem
                labelRight={invoiceNumberFormat}
                title="Invoice Number"
                onPress={() => router.push('/settings/invoice-format')}
              />
            </View>
          </View>
          <View>
            <View className="overflow-hidden rounded-lg">
              <ListItem
                title="Review App"
                onPress={() => setReviewModalVisible(true)}
                labelRight=""
              />
              <ReviewModal
                visible={reviewModalVisible}
                onClose={() => setReviewModalVisible(false)}
              />
            </View>
          </View>
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
        transparent
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
