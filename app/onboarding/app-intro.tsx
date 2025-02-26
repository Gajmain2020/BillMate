import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';

const slides = [
  {
    id: '1',
    title: 'Effortless Billing for Local Shops',
    description:
      'Say goodbye to pen and paper! Billmate makes billing seamless, quick, and hassle-free for your customers.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '2',
    title: 'Completely Free, Always!',
    description:
      'No hidden costs, no subscriptions. Generate and manage bills effortlessly—free of charge.',
    image:
      'https://cdn.expertphotography.com/wp-content/uploads/2022/03/Portrait-Photographers-Manny-Librodo-Girl.jpg',
  },
  {
    id: '3',
    title: 'Store and Share Instantly',
    description:
      'Save bills on your phone and share them as PDFs directly with customers—no extra steps needed!',
    image:
      'https://i0.wp.com/digital-photography-school.com/wp-content/uploads/flickr/4235362473_82798c77a5_z.jpg?resize=443%2C640&ssl=1',
  },
  {
    id: '4',
    title: 'Set Up Your Profile',
    description:
      'Customize your shop details and start generating bills in seconds. Let’s get started!',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiwXa84G1ThzA7lpv-KBACOiNkRBTbk12S4g&s',
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
      className="relative items-center justify-center px-5"
      style={{
        width: windowWidth,
        height: windowHeight * 0.95, // Increased height
      }}>
      {/* Image with Overlay */}
      <View className="relative">
        <Image
          source={{ uri: data.image }}
          className="rounded-lg"
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.75, // Increased height
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']} // Transparent to dark
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '40%', // Covers the bottom part
            borderRadius: 10,
          }}
        />
        {/* Text Overlay */}
        <View className="absolute bottom-3 mx-auto w-full  px-2">
          <Text className="mb-1 text-center text-3xl font-bold text-white">{data.title}</Text>
          <Text className="text-center text-lg text-gray-200">{data.description}</Text>
        </View>
      </View>
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
