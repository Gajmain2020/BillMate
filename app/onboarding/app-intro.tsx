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
