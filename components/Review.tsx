import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Modal, Text, View, Pressable } from 'react-native';

import { Button } from '~/components/Button';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReviewModal({ visible, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleReviewSubmit() {
    if (rating > 0) {
      setSubmitted(true);

      // Show "Thank You" message for 2 seconds
      setTimeout(() => {
        setRating(0);
        setSubmitted(false);
        onClose();
      }, 2000);
    }
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
          {submitted ? (
            // Thank You Message
            <View className="items-center">
              <Text className="text-center text-4xl">🙏</Text>
              <Text className="text-xl font-semibold">Thanks for your review! </Text>
              <Text className="text-center text-lg text-gray-600">
                Keep enjoying the app your review will help us alot.
              </Text>
            </View>
          ) : (
            // Review Form
            <>
              <Text className="mb-2 text-center text-2xl font-semibold">Rate Your Experience</Text>

              {/* Star Rating */}
              <View className="mb-4 flex-row justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable key={star} onPress={() => setRating(star)}>
                    <AntDesign
                      name={star <= rating ? 'star' : 'staro'}
                      size={28}
                      color={star <= rating ? 'gold' : 'gray'}
                      className="gap-2"
                    />
                  </Pressable>
                ))}
              </View>

              {/* Buttons */}
              <View className="mt-4 flex-row justify-end space-x-4">
                <Button title="Cancel" variant="link" className="flex-1 py-3" onPress={onClose} />
                <Button
                  title="Submit"
                  variant="primary"
                  className="flex-1 py-3"
                  onPress={handleReviewSubmit}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
