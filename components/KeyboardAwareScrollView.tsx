import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KeyboardAwareScrollView({ children }: PropsWithChildren) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={97}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          gap: 5,
        }}
        keyboardShouldPersistTaps="handled">
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
