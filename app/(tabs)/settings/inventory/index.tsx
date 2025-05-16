import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
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

  const [editItem, setEditItem] = useState('');

  const { inventoryItems, addInventoryItem, deleteInventoryItem, updateInventoryItem } = useStore();

  useEffect(() => {
    if (editItem !== '') {
      const item = inventoryItems.find((i) => i.itemId === editItem);
      if (item) {
        newItemForm.reset({
          itemId: item.itemId,
          name: item.name,
          quantity: String(item.quantity),
          price: String(item.price),
          sellPrice: String(item.sellPrice),
        });
      }
    } else {
      // Reset form when closing edit mode
      newItemForm.reset({
        itemId: '',
        name: '',
        quantity: '',
        price: '',
        sellPrice: '',
      });
    }
  }, [editItem]);

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

  const handleEditItem = (itemId: string) => {
    const item = inventoryItems.find((i) => i.itemId === itemId);
    if (item) {
      newItemForm.reset({
        itemId: item.itemId,
        name: item.name,
        quantity: String(item.quantity),
        price: String(item.price),
        sellPrice: String(item.sellPrice),
      });
      setEditItem(itemId);
    }
  };

  return (
    <View className="flex-1">
      {/* Search Bar */}
      <View className="mb-4 flex-row items-center rounded-full bg-white px-4 py-1 shadow-md">
        <Ionicons name="search" size={20} color="#6b7280" className="mr-2" />
        <TextInput
          placeholder="Search by Name or ID..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={handleSearchValueChange}
          className="flex-1 text-base text-gray-800"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <Animated.FlatList
        itemLayoutAnimation={LinearTransition}
        data={filteredInventory}
        keyExtractor={(item) => item.itemId}
        contentContainerClassName="px-2 py-0 gap-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => setDeleteItem(item.itemId)}
            className="relative rounded-xl bg-white p-4 shadow-lg">
            {/* Edit Button at Top-Right */}
            <TouchableOpacity
              onPress={() => handleEditItem(item.itemId)}
              className="absolute right-3 top-3 z-10 p-1">
              <Ionicons name="create-outline" size={20} color="#4B5563" />
            </TouchableOpacity>

            {/* Card Content */}
            <View className="gap-3">
              <View className="flex-row items-baseline gap-1">
                <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
                <Text className="text-sm text-gray-500">({item.itemId})</Text>
              </View>

              {/* Quantity, Price, Sell Price in one row */}
              <View className=" flex-row justify-between">
                <Text className="text-base text-gray-700">Qty: {item.quantity}</Text>
                <Text className="text-base text-gray-700">Price: ₹{item.price}</Text>
                <Text className="text-base text-gray-700">Sell: ₹{item.sellPrice}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
          onPress={() => {
            newItemForm.reset();
            setAddNewItem(true);
          }}
          className="items-center rounded-full bg-teal-500 py-3 shadow-md">
          <Text className="text-lg font-semibold text-white">Add New Item</Text>
        </TouchableOpacity>
      </View>

      {/* Add New Item Modal */}
      <Modal
        visible={addNewItem || editItem !== ''}
        onRequestClose={() => {
          setAddNewItem(false);
          setEditItem('');
        }}
        animationType="slide"
        transparent>
        <TouchableWithoutFeedback
          onPress={() => {
            setAddNewItem(false);
            setEditItem('');
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
                        title={editItem !== '' ? 'Update Item' : 'Add Item'}
                        className="mt-4"
                        onPress={newItemForm.handleSubmit((data) => {
                          if (editItem !== '') {
                            // Check duplicate itemId only if changed
                            const isDuplicate =
                              data.itemId !== editItem &&
                              inventoryItems.some((i) => i.itemId === data.itemId);

                            if (isDuplicate) {
                              newItemForm.setError('itemId', {
                                type: 'manual',
                                message: 'Item ID already exists.',
                              });
                              return;
                            }

                            // Update item
                            updateInventoryItem(editItem, {
                              ...data,
                              quantity: data.quantity,
                              price: data.price,
                              sellPrice: data.sellPrice,
                            });

                            newItemForm.reset();
                            setEditItem('');
                            setAddNewItem(false);
                          } else {
                            // Add new item logic
                            const isDuplicate = inventoryItems.some(
                              (i) => i.itemId === data.itemId
                            );
                            if (isDuplicate) {
                              newItemForm.setError('itemId', {
                                type: 'manual',
                                message: 'Item ID already exists.',
                              });
                              return;
                            }

                            addInventoryItem(data);
                            newItemForm.reset();
                            setAddNewItem(false);
                          }
                        })}
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
