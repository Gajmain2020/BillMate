import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { MotiText, MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { StatusBar, Text, View, StyleSheet, Platform } from 'react-native';

import { Button } from '~/components/Button';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

export default function Welcome() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds splash delay

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <StatusBar
          barStyle={Platform.select({ ios: 'dark-content', android: 'dark-content' })}
          backgroundColor="white"
        />
        <MotiView
          from={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 1 }}
          transition={{ type: 'timing', duration: 1500 }}>
          <LottieView
            source={require('~/utils/animate.json')}
            autoPlay
            loop={false}
            style={{ width: 250, height: 250 }}
          />
        </MotiView>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView>
      <View className="relative flex-1 justify-center p-8">
        {/* Animated Background */}

        <View className="items-center gap-4">
          <MotiText
            from={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1000 }}>
            <Text className="text-center text-4xl font-bold text-gray-800">
              Welcome To BillMate
            </Text>
          </MotiText>

          <MotiText
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1200, delay: 300 }}>
            <Text className="text-center text-lg text-gray-600">
              Create and share professional invoices in seconds. Let's get started by setting up
              your business details.
            </Text>
          </MotiText>

          <MotiView
            from={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 80 }}
            className="w-full pt-8">
            <Button title="Get Started" onPress={() => router.push('/onboarding/app-intro')} />
          </MotiView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    width: '120%',
    height: '120%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
