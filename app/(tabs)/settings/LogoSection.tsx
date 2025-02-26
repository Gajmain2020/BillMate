import { useFormContext } from 'react-hook-form';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function LogoSection() {
  const { watch, setValue } = useFormContext();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setValue('logo', result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity onPress={pickImage}>
        {watch('logo') ? (
          <Image source={{ uri: watch('logo') }} className="h-72 w-72 rounded-full" />
        ) : (
          <View className="h-72 w-72 items-center justify-center rounded-full bg-gray-300">
            <Text className="text-gray-500">Select Logo</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

// test
