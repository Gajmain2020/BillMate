import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type KeyboardAwareScrollViewProps = PropsWithChildren<{
  keyboardVerticalOffset?: number;
  behavior?: 'padding' | 'height' | 'position';
  contentContainerStyle?: object;
}>;

export default function KeyboardAwareScrollView({
  children,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 120 : 0,
  behavior = 'padding',
  contentContainerStyle = {},
}: KeyboardAwareScrollViewProps) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <KeyboardAvoidingView
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.avoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              contentContainerStyle,
              keyboardVisible ? { paddingBottom: keyboardVerticalOffset } : {},
            ]}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
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
  },
});
