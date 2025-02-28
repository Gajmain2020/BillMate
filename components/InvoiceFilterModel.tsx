import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Button } from '~/components/Button';

interface InvoiceFilterModalProps {
  visible: boolean;
  onClose: () => void;
  sortBy: 'newest' | 'oldest' | 'price';
  setSortBy: (value: 'newest' | 'oldest' | 'price') => void;
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: (value: { from: Date | null; to: Date | null }) => void;
  amountRange: { min: string; max: string };
  setAmountRange: (value: { min: string; max: string }) => void;
}

export default function InvoiceFilterModal({
  visible,
  onClose,
  sortBy,
  setSortBy,
  dateRange,
  setDateRange,
  amountRange,
  setAmountRange,
}: InvoiceFilterModalProps) {
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // Function to clear filters and close modal
  const handleClearFilters = () => {
    setSortBy('newest');
    setDateRange({ from: null, to: null });
    setAmountRange({ min: '', max: '' });
    onClose(); // Close modal after clearing filters
  };

  return (
    <Modal visible={visible} onRequestClose={() => onClose} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="bg-blur flex-1 justify-center bg-gray-400/60 p-4">
          <TouchableWithoutFeedback>
            <View className="rounded-lg bg-white p-6">
              <Text className="mb-4 text-center text-xl font-bold">Filter Options</Text>

              {/* Sort By */}
              <View className="flex gap-1">
                <Text className="font-semibold">Sort By</Text>
                <View className="mb-4 flex-row gap-3">
                  {['newest', 'oldest', 'price'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      className={`rounded-lg px-4 py-2 ${sortBy === option ? 'bg-emerald-500' : 'bg-gray-200'}`}
                      onPress={() => setSortBy(option as 'newest' | 'oldest' | 'price')}>
                      <Text
                        className={`font-medium ${sortBy === option ? 'text-white' : 'text-black'}`}>
                        {option.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date Range */}
              <View className="flex gap-1">
                <Text className="font-semibold">Date Range</Text>
                <View className="mb-4 flex-row items-center justify-between gap-3">
                  <TouchableOpacity className="flex-1" onPress={() => setShowFromPicker(true)}>
                    <Text className="rounded-lg border py-2 text-center">
                      {dateRange.from ? dateRange.from.toLocaleDateString('en-GB') : 'From Date'}
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-lg font-medium">TO</Text>

                  <TouchableOpacity className="flex-1" onPress={() => setShowToPicker(true)}>
                    <Text className="rounded-lg border py-2 text-center">
                      {dateRange.to ? dateRange.to.toLocaleDateString('en-GB') : 'To Date'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {showFromPicker && (
                  <DateTimePicker
                    value={dateRange.from || new Date()}
                    mode="date"
                    display="default"
                    onChange={(_, date) => {
                      setShowFromPicker(false);
                      if (date) setDateRange((prev) => ({ ...prev, from: date }));
                    }}
                  />
                )}
                {showToPicker && (
                  <DateTimePicker
                    value={dateRange.to || new Date()}
                    mode="date"
                    display="default"
                    onChange={(_, date) => {
                      setShowToPicker(false);
                      if (date) setDateRange((prev) => ({ ...prev, to: date }));
                    }}
                  />
                )}
              </View>

              {/* Amount Range */}
              <View className="flex gap-1">
                <Text className="font-semibold">Amount Range</Text>
                <View className="mb-6 flex-row items-center justify-between gap-3">
                  <TextInput
                    placeholder="Min"
                    keyboardType="numeric"
                    value={amountRange.min}
                    onChangeText={(text) => setAmountRange({ ...amountRange, min: text })}
                    className="flex-1 rounded-lg border py-2 text-center"
                  />
                  <Text className="text-lg font-medium">TO</Text>
                  <TextInput
                    placeholder="Max"
                    keyboardType="numeric"
                    value={amountRange.max}
                    onChangeText={(text) => setAmountRange({ ...amountRange, max: text })}
                    className="flex-1 rounded-lg border py-2 text-center"
                  />
                </View>
              </View>
              {/* Buttons */}
              <View className="flex-row justify-between gap-4">
                {(sortBy !== 'newest' ||
                  dateRange.from ||
                  dateRange.to ||
                  amountRange.min ||
                  amountRange.max) && (
                  <Button
                    title="Clear Filters"
                    className="flex-1 py-2"
                    onPress={handleClearFilters}
                    variant="secondary"
                  />
                )}
                <Button title="Apply Filters" className="flex-1 py-2" onPress={onClose} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
