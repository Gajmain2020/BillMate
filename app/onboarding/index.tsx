// import { router } from 'expo-router';
// import LottieView from 'lottie-react-native';
// import { MotiText, MotiView } from 'moti';
// import { useEffect, useState } from 'react';
// import { Platform, StatusBar, Text, View } from 'react-native';

// import { Button } from '~/components/Button';
// import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

// export default function Welcome() {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 3000); // Increased to 3 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   if (showSplash) {
//     return (
//       <View className="flex-1 items-center justify-center bg-white">
//         {/* Lottie Animation */}
//         <StatusBar
//           barStyle={Platform.select({ ios: 'dark-content', android: 'dark-content' })}
//           backgroundColor="white"
//         />
//         <MotiView
//           from={{ scale: 0.7, opacity: 0 }}
//           animate={{ scale: 1.3, opacity: 1 }}
//           transition={{ type: 'timing', duration: 1500 }}>
//           {/* Slower transition */}
//           <LottieView
//             source={require('~/utils/animate.json')}
//             autoPlay
//             loop={false}
//             style={{ width: 250, height: 250 }} // Made it bigger
//           />
//         </MotiView>
//       </View>
//     );
//   }

//   return (
//     <KeyboardAwareScrollView>
//       <View className="flex-1 justify-center p-8">
//         <View className="items-center gap-4">
//           {/* Title Animation */}
//           <MotiText
//             from={{ opacity: 0, translateY: -30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: 'timing', duration: 1000 }}>
//             {/* Slower fade-in */}
//             <Text className="text-center text-4xl font-bold text-gray-800">
//               Welcome To BillMate
//             </Text>
//           </MotiText>

//           {/* Subtitle Animation */}
//           <MotiText
//             from={{ opacity: 0, translateY: 15 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: 'timing', duration: 1200, delay: 300 }}>
//             {/* Smoother transition */}
//             <Text className="text-center text-lg text-gray-600">
//               Create and share professional invoices in seconds. Let's get started by setting up
//               your business details.
//             </Text>
//           </MotiText>

//           {/* Button Animation */}
//           <MotiView
//             from={{ opacity: 0, scale: 0.7 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: 'spring', damping: 12, stiffness: 80 }} // More natural feel
//             className="w-full pt-8">
//             <Button title="Get Started" onPress={() => router.push('/onboarding/app-intro')} />
//           </MotiView>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }

import { zodResolver } from '@hookform/resolvers/zod';
import { randomUUID } from 'expo-crypto';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';
import { ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

export default function Profile() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);
  const setOnboardingCompleted = useStore((data) => data.setOnboardingCompleted);

  const form = useForm<OwnerEntityType>({
    resolver: zodResolver(ownerEntitySchema),
    defaultValues: {
      id: profile?.id || randomUUID(),
      name: profile?.name || '',
      address: profile?.address || '',
      gst: profile?.gst || '',
      contact: profile?.contact || '',
      email: profile?.email || '',
    },
  });

  const onSubmit = (data: OwnerEntityType) => {
    Keyboard.dismiss();
    setProfile(data);
    setOnboardingCompleted();
    router.replace('/onboarding/optional-details');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="text-2xl font-bold">Your Business Info</Text>
        <Text className="mb-2 text-gray-600">This information will be used on invoices</Text>

        <View className="gap-2">
          <CustomTextInput
            name="name"
            label="Business Name*"
            placeholder="Enter your business name"
          />
          <CustomTextInput
            name="address"
            label="Address*"
            placeholder="Enter your address"
            multiline
            numberOfLines={3}
            className="min-h-20"
            textAlignVertical="top"
          />

          <CustomTextInput name="email" label="Email ID*" placeholder="Enter your email id" />

          <CustomTextInput
            name="contact"
            label="Contact Number*"
            isNumeric
            placeholder="Enter your contact number"
          />

          <CustomTextInput name="gst" label="GST No.*" placeholder="Enter your GST number" />
        </View>

        <Button title="Save" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
