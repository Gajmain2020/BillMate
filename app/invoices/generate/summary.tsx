import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '~/components/Button';

export default function Summary() {
  return (
    <KeyboardAwareScrollView className="p-4">
      <View className="gap-2 shadow">
        {/* SENDER CARD */}
        <View className="rounded bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold shadow">Sender Info</Text>
          <View className="gap-1">
            <Text>JoneDoe</Text>
            <Text>123</Text>
            <Text>sdsd</Text>
            <Text>mail</Text>
          </View>
        </View>

        {/* RECIPIENT CARD */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Recipient Info</Text>
          <View className="gap-1">
            <Text>JoneDoe</Text>
            <Text>123</Text>
            <Text>sdsd</Text>
            <Text>mail</Text>
          </View>
        </View>

        {/* INVOICE DETAILS */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Invoice Info</Text>
          <View className="gap-1">
            <Text>JoneDoe</Text>
            <Text>123</Text>
            <Text>sdsd</Text>
            <Text>mail</Text>
          </View>
        </View>

        {/* ITEMS CARD */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Items</Text>
          <View className="gap-1">
            {/* Header */}
            <View className="flex-row justify-between">
              <Text className="flex-1 font-medium">Item</Text>
              <Text className="w-20 text-right font-medium">Qty</Text>
              <Text className="w-20 text-right font-medium">Price</Text>
              <Text className="w-24 text-right font-medium">Total</Text>
            </View>

            {/* SAMPLE ITEMS */}
            <View className="flex-row justify-between">
              <Text className="flex-1 ">Item1</Text>
              <Text className="w-20 text-right ">1</Text>
              <Text className="w-20 text-right ">10</Text>
              <Text className="w-24 text-right font-semibold">₹ 10</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="flex-1 ">Item1</Text>
              <Text className="w-20 text-right ">1</Text>
              <Text className="w-20 text-right ">10</Text>
              <Text className="w-24 text-right font-semibold">₹ 10</Text>
            </View>
          </View>
        </View>

        {/* TOTALS CARD */}
        <View className="rounded bg-gray-50 p-4 shadow">
          <Text className="mb-2 text-lg font-semibold">Totals</Text>
          <View className="gap-1">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text className="font-semibold">₹ 123</Text>
            </View>

            <View className="flex-row justify-between">
              <Text>GST (10%)</Text>
              <Text className="font-semibold">₹ 12.3</Text>
            </View>

            <View className="flex-row justify-between border-t border-gray-300">
              <Text>Total</Text>
              <Text className="font-semibold">₹ 12.3</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
