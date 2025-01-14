import { Text, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = {
  label: string;
} & TextInputProps;

export default function CustomTextInput({ label, ...props }: CustomTextInputProps) {
  return (
    <View className="mb-4">
      <Text>{label}</Text>

      <TextInput {...props} className={`rounded border border-gray-200 p-4 ${props.className}`} />
    </View>
  );
}
