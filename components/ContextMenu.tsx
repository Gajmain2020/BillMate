import React from 'react';
import { Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  options: { label: string; onPress: () => void }[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ visible, onClose, options }) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <TouchableWithoutFeedback>
            <View className="w-4/5 rounded-lg bg-white p-4 shadow-lg">
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    option.onPress();
                    onClose(); // Close the menu after selecting an option
                  }}
                  className="border-b border-gray-200 py-3">
                  <Text className="text-lg text-gray-700">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ContextMenu;
