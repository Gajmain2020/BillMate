import { View } from 'react-native';

import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

export default function OptionalSection() {
  return (
    <KeyboardAwareScrollView>
      <View className="gap-2 bg-white py-2">
        <CustomTextInput
          name="altContact"
          label="Alternate Contact"
          placeholder="Enter alternate contact"
          isNumber
        />
        <CustomTextInput name="upi" label="UPI" placeholder="Enter your UPI." />
        <CustomTextInput name="pan" label="PAN" placeholder="Enter your PAN Number." />
        <CustomTextInput name="website" label="Website" placeholder="Enter website" />
      </View>
    </KeyboardAwareScrollView>
  );
}
