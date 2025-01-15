import { useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = {
  name: string;
  label: string;
  isNumeric?: boolean; // Add a prop to indicate numeric input
} & TextInputProps;

export default function CustomTextInput({
  label,
  name,
  isNumeric = false, // Default to false for non-numeric inputs
  ...props
}: CustomTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, rules: { required: 'Field is required.' } });

  return (
    <View className="gap-2">
      <Text>{label}</Text>

      <TextInput
        {...props}
        className={`rounded border border-gray-200 p-4 ${props.className}`}
        value={value?.toString()} // Ensure value is a string for TextInput
        onChangeText={(text) => {
          if (isNumeric) {
            const numericValue = parseFloat(text) || 0; // Convert to number or fallback to 0
            onChange(numericValue); // Pass the number to the form state
          } else {
            onChange(text); // Pass the string to the form state
          }
        }}
        onBlur={onBlur}
        keyboardType={isNumeric ? 'numeric' : props.keyboardType} // Set numeric keyboard if required
      />
      {error && <Text className="text-red-500">{error.message}</Text>}
    </View>
  );
}
