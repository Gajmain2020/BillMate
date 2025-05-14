import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import { inventoryItemSchema } from '~/schema/invoice';
import { useStore } from '~/store';

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addNewItem, setAddNewItem] = useState(false);

  const [deleteItem, setDeleteItem] = useState('');

  const { inventoryItems, addInventoryItem, deleteInventoryItem } = useStore();

  const newItemForm = useForm({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      itemId: '',
      name: '',
      price: '',
      quantity: '',
      sellPrice: '',
    },
  });

  const filteredInventory = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemId.includes(searchQuery)
  );

  // Handle search input changes
  const handleSearchValueChange = (text: string) => {
    setSearchQuery(text);
  };

  const onAddNewItemPress = () => {
    addInventoryItem(newItemForm.getValues());
    newItemForm.reset();
    setAddNewItem(false);
  };

  return (
    <View className="flex-1">
      {/* Search Bar */}
      <View className="flex-row items-center rounded border border-gray-300 p-2 ">
        <TextInput
          placeholder="Search by name or ID..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={handleSearchValueChange}
          className="flex-1 rounded border border-gray-300 py-2"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} className="ml-2">
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <Animated.FlatList
        itemLayoutAnimation={LinearTransition}
        data={filteredInventory}
        keyExtractor={(item) => item.itemId}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => setDeleteItem(item.itemId)}
            className="mb-2 rounded-lg bg-white px-4 py-2 shadow-sm">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-600">{item.itemId}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Animated.View
            entering={FadeIn.duration(300)}
            className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-xl font-bold">No Inventory Items Found</Text>
            <Text className="text-center text-gray-600">
              Your inventory items will appear here after you create invoices.
            </Text>
          </Animated.View>
        }
      />

      {/* Fixed Button */}
      <View className="absolute bottom-4 left-4 right-4">
        <TouchableOpacity
          onPress={() => setAddNewItem(true)}
          className="items-center rounded-full bg-teal-500 py-3 shadow-md">
          <Text className="text-lg font-semibold text-white">Add New Item</Text>
        </TouchableOpacity>
      </View>

      {/* Add New Item Modal */}
      <Modal
        visible={addNewItem}
        onRequestClose={() => setAddNewItem(false)}
        animationType="slide"
        transparent>
        <TouchableWithoutFeedback
          onPress={() => {
            setAddNewItem(false);
            newItemForm.reset();
          }}>
          <View className="flex-1 bg-gray-400/60">
            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <SafeAreaView className="flex-1">
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    padding: 16,
                  }}
                  keyboardShouldPersistTaps="handled">
                  <TouchableWithoutFeedback>
                    <View className="gap-4 rounded-lg bg-white p-6">
                      <FormProvider {...newItemForm}>
                        <Text className="mb-4 text-center text-xl font-bold">Add New Item</Text>

                        <View className="gap-2">
                          <CustomTextInput
                            name="itemId"
                            label="Item ID"
                            placeholder="Enter Item ID"
                          />
                          <CustomTextInput
                            name="name"
                            label="Item Name"
                            placeholder="Enter Item Name"
                          />
                          <CustomTextInput
                            name="quantity"
                            label="Item Quantity"
                            placeholder="Enter Item Quantity"
                            isNumeric
                          />
                          <CustomTextInput
                            name="price"
                            label="Item Price"
                            placeholder="Enter Item Price"
                            isNumeric
                          />
                          <CustomTextInput
                            name="sellPrice"
                            label="Item Sell Price"
                            placeholder="Enter Item Sell Price"
                            isNumeric
                          />
                        </View>
                      </FormProvider>

                      <Button
                        title="Add Item"
                        className="mt-4"
                        onPress={() => newItemForm.handleSubmit(onAddNewItemPress)()}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </SafeAreaView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal to delete the item */}
      <Modal
        visible={deleteItem !== ''}
        onRequestClose={() => setDeleteItem('')}
        animationType="slide"
        transparent>
        <TouchableWithoutFeedback onPress={() => setDeleteItem('')}>
          <View className="flex-1 items-center justify-center bg-gray-800/50">
            <TouchableWithoutFeedback>
              <View className="w-4/5 rounded-lg bg-white p-6 shadow-lg">
                <Text className="mb-4 text-center text-lg font-semibold">Are you sure?</Text>
                <Text className="mb-6 text-center text-gray-500">
                  Do you want to delete this inventory item?
                </Text>
                <View className="flex-row justify-between">
                  <Button
                    title="Cancel"
                    className="h-10 flex-1 items-center justify-center py-0"
                    variant="link"
                    onPress={() => setDeleteItem('')}
                  />
                  <Button
                    title="Delete"
                    className="h-10 flex-1 items-center justify-center bg-red-400 py-0"
                    onPress={() => {
                      deleteInventoryItem(deleteItem);
                      setDeleteItem('');
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
