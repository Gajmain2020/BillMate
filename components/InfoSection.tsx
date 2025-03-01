import { View } from 'react-native';

import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

export default function InfoSection() {
  return (
    <KeyboardAwareScrollView>
      <View className="gap-2 bg-white py-2">
        <CustomTextInput name="name" label="Business Name" placeholder="Enter business name" />
        <CustomTextInput name="address" label="Address" placeholder="Enter address" multiline />
        <CustomTextInput name="address" label="Address" placeholder="Enter business Email" />
        <CustomTextInput name="gst" label="GST No." placeholder="Enter GST number" />
        <CustomTextInput
          isNumber
          name="contact"
          label="Contact"
          placeholder="Enter contact number"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
