import { Control, useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = {
  name: string;
  label: string;
} & TextInputProps;

export default function CustomTextInput({ label, name, ...props }: CustomTextInputProps) {
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
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
      />
      <Text className="text-red-500">{error?.message}</Text>
    </View>
  );
}
