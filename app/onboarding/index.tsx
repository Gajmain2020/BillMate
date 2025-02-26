// import { router } from 'expo-router';
// import LottieView from 'lottie-react-native';
// import { MotiText, MotiView } from 'moti';
// import { Text, View } from 'react-native';
// import { Button } from '~/components/Button';

// import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView';

// export default function Welcome() {
//   return (
//     <KeyboardAwareScrollView>
//       {/* Gradient Background */}
//       <View className="flex-1 justify-center p-8">
//         {/* Floating Particles Animation */}
//         {/* <LottieView
//             source={require('~/assets/animations/particles.json')}
//             autoPlay
//             loop
//             style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2 }}
//           /> */}

//         <View className="items-center gap-4">
//           {/* Title Animation */}
//           <MotiText
//             from={{ opacity: 0, translateY: -20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: 'timing', duration: 600 }}>
//             <Text className="text-center text-4xl font-bold text-gray-800">
//               Welcome To BillMate
//             </Text>
//           </MotiText>

//           {/* Subtitle Animation */}
//           <MotiText
//             from={{ opacity: 0, translateY: 10 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: 'timing', duration: 800, delay: 200 }}>
//             <Text className="text-center text-lg text-gray-600">
//               Create and share professional invoices in seconds. Let's get started by setting up
//               your business details.
//             </Text>
//           </MotiText>

//           {/* Button Animation */}
//           <MotiView
//             from={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: 'spring', damping: 10, stiffness: 100 }}
//             className="w-full pt-8">
//             <Button title="Get Started" onPress={() => router.push('/onboarding/app-intro')} />
//           </MotiView>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }

import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';

const slides = [
  {
    id: '1',
    title: 'Welcome to AppName',
    description: 'Your all-in-one solution for managing daily tasks and staying productive',
    image:
      'https://amoeboids.com/wp-content/uploads/2020/11/Software-Feature-Request-process-Banner.webp',
  },
  {
    id: '2',
    title: 'Powerful Features',
    description: 'Access all the tools you need to succeed, right at your fingertips',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
  },
  {
    id: '3',
    title: "Let's Get Started",
    description: 'Set up your profile and start your journey with us',
    image:
      'https://amoeboids.com/wp-content/uploads/2020/11/Software-Feature-Request-process-Banner.webp',
  },
];

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

function Slide({
  data,
}: {
  data: { id: string; title: string; description: string; image: string };
}) {
  return (
    <View
      className="items-center justify-center px-5"
      style={{
        width: windowWidth,
        height: windowHeight * 0.85,
      }}>
      <Image
        source={{ uri: data.image }}
        className="mb-5 rounded-lg"
        style={{
          width: windowWidth * 0.85,
          height: windowHeight * 0.6,
          resizeMode: 'contain',
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        {data.title}
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#666' }}>{data.description}</Text>
    </View>
  );
}

export default function Carousel() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleNextPress = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef?.current?.scrollToIndex({ index: newIndex, animated: true });
    } else {
      router.push('/onboarding/profile');
    }
    console.log(currentIndex);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle={Platform.select({ ios: 'dark-content', android: 'dark-content' })}
        backgroundColor="white"
      />
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={windowWidth}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
        renderItem={({ item }) => <Slide data={item} />}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* Pagination Dots */}
      <View className="mb-2">
        <View className="my-2 flex-row justify-center">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`mx-1 transition-all duration-300 ${
                currentIndex === index
                  ? 'w-6 rounded-md bg-emerald-500'
                  : 'w-2 rounded-full bg-emerald-200'
              } h-2`}
            />
          ))}
        </View>
        {/* NEXT OR SETUP BUTTON */}
        <Button
          className="mx-auto  w-[80%]"
          title={currentIndex === slides.length - 1 ? 'Setup Profile' : 'Next'}
          variant={currentIndex !== slides.length - 1 ? 'secondary' : 'primary'}
          onPress={handleNextPress}
        />
      </View>
    </SafeAreaView>
  );
}
