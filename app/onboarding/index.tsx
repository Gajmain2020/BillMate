import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { MotiText, MotiView } from 'moti';
import { Text, View } from 'react-native';
import { Button } from '~/components/Button';

import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

export default function Welcome() {
  return (
    <KeyboardAwareScrollView>
      {/* Gradient Background */}
      <View className="flex-1 justify-center p-8">
        {/* Floating Particles Animation */}
        {/* <LottieView
            source={require('~/assets/animations/particles.json')}
            autoPlay
            loop
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2 }}
          /> */}

        <View className="items-center gap-4">
          {/* Title Animation */}
          <MotiText
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}>
            <Text className="text-center text-4xl font-bold text-gray-800">
              Welcome To BillMate
            </Text>
          </MotiText>

          {/* Subtitle Animation */}
          <MotiText
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 800, delay: 200 }}>
            <Text className="text-center text-lg text-gray-600">
              Create and share professional invoices in seconds. Let's get started by setting up
              your business details.
            </Text>
          </MotiText>

          {/* Button Animation */}
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="w-full pt-8">
            <Button title="Get Started" onPress={() => router.push('/onboarding/app-intro')} />
          </MotiView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
