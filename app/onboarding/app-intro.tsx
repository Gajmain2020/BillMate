import { router } from 'expo-router';
import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to AppName',
    description: 'Your all-in-one solution for managing daily tasks and staying productive',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s',
  },
];

const DotIndicator = ({ isActive }: { isActive: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isActive ? 20 : 10),
      opacity: withSpring(isActive ? 1 : 0.5),
    };
  });

  return <Animated.View className="w-10" style={[styles.dot, animatedStyle]} />;
};

export default function AppIntro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems[0] && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const scrollToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push('/onboarding/profile');
    }
  };

  const renderSlide = ({
    item,
  }: {
    item: { id: string; title: string; description: string; image: string };
  }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {slides.map((_, index) => (
        <DotIndicator key={index} isActive={currentIndex === index} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={slidesRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
      />
      <Pagination />
      <TouchableOpacity style={styles.button} onPress={scrollToNextSlide}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Setup Profile' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 150,
    width: '100%',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00bc7d',
    marginHorizontal: 3,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: width * 0.8,
    alignSelf: 'center',
    backgroundColor: '#00bc7d',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
