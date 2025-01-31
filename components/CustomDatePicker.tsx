import { useState } from 'react';
import { useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type CustomDatePickerProps = {
  name: string;
  label: string;
};

export default function CustomDatePicker({ name, label }: CustomDatePickerProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  return (
    <>
      <View className="gap-2">
        <Text className="text-lg">{label}</Text>

        <Text
          onPress={() => setIsDatePickerVisible(true)}
          className={'rounded border border-gray-200 p-2 ' + (!value ? 'text-gray-500' : '')}>
          {value
            ? new Date(value).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : 'Please choose date'}
        </Text>

        {error?.message && <Text className="text-red-500">{error?.message}</Text>}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={(date) => {
          onChange(date);
          setIsDatePickerVisible(false);
        }}
        onCancel={() => {
          onBlur();
          setIsDatePickerVisible(false);
        }}
      />
    </>
  );
}
