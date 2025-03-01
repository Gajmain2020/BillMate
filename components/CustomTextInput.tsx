import { useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = {
  name: string;
  label: string;
  isNumeric?: boolean; // Add a prop to indicate numeric input
  isNumber?: boolean; // Add a prop to indicate numeric input
} & TextInputProps;

export default function CustomTextInput({
  label,
  name,
  isNumeric = false, // Default to false for non-numeric inputs
  isNumber = false, // Default to false for non-numeric inputs
  ...props
}: CustomTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, rules: { required: 'Field is required.' } });

  return (
    <View className="gap-1">
      <Text>{label}</Text>

      <TextInput
        {...props}
        className={`rounded border border-gray-200 px-2 py-3 ${props.className}`}
        value={value?.toString()} // Ensure value is a string for TextInput
        onChangeText={(text) => {
          if (isNumber) {
            if (text === '') {
              onChange(''); // Keep it an empty string instead of resetting to 0
            } else {
              const numericValue = parseFloat(text);
              if (!isNaN(numericValue)) {
                onChange(numericValue);
              }
            }
          } else {
            onChange(text);
          }
        }}
        onBlur={onBlur}
        keyboardType={isNumeric || isNumber ? 'numeric' : props.keyboardType} // Set numeric keyboard if required
      />

      {error && <Text className="text-red-500">{error.message}</Text>}
    </View>
  );
}
