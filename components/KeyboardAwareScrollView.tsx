import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type KeyboardAwareScrollViewProps = PropsWithChildren<{
  keyboardVerticalOffset?: number;
  behavior?: 'padding' | 'height' | 'position';
  contentContainerStyle?: object;
}>;

export default function KeyboardAwareScrollView({
  children,
  keyboardVerticalOffset = 97,
  behavior = Platform.OS === 'ios' ? 'padding' : 'height',
  contentContainerStyle,
}: KeyboardAwareScrollViewProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.avoidingView}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 10,
            gap: 5,
          }}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    gap: 5,
    backgroundColor: 'white',
  },
});
