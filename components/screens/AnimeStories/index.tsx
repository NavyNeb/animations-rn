import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '~/helpers';
import Header from './components/Header';
import { AnimesStories } from '~/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import AnimePoster, { POSTER_WIDTH } from './components/AnimePoster';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, SlideInDown, useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimeStories = () => {
  const [fullscreen, setToggleFullscreen] = useState<boolean>(false)
  const [activIndex, setActiveIndex] = useState<number>(0)
  const { top } = useSafeAreaInsets();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  useCallback(
    () => {
      setActiveIndex(Number((scrollOffset.value / POSTER_WIDTH).toFixed()))
    },
    [scrollOffset.value],
  )
  

  const handlePosterItemClick = ()=> {

    setToggleFullscreen(!fullscreen);
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: isAndroid ? top : 0 }]}>
      <StatusBar barStyle={"light-content"} />
      <Animated.View 
        entering={FadeInUp}
        exiting={FadeInDown}
        style={{
          display: fullscreen ? 'none' : "flex",
        }}
      >
        <Header isFullScreen={fullscreen} />
      </Animated.View>
      <View
        style={{
          height: SCREEN_HEIGHT * 0.65,
          width: '100%',
        }}>
        <Animated.ScrollView
          ref={animatedRef}
          horizontal
          snapToInterval={POSTER_WIDTH}
          decelerationRate={'fast'}
          disableIntervalMomentum
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: POSTER_WIDTH * AnimesStories.length + (SCREEN_WIDTH - POSTER_WIDTH),
          }}>
          {AnimesStories.map((poster, index) => {
            return (
              <AnimePoster {...poster} scrollOffset={scrollOffset} index={index} activIndex={activIndex} key={index} onItemClick={handlePosterItemClick} />
            );
          })}
        </Animated.ScrollView>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View 
          entering={FadeIn.delay(800)}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            columnGap: 15
          }}
        >
          <Animated.View 
            entering={FadeInDown.delay(950).damping(2000).dampingRatio(1.5)}
            style = {{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#404556',
              borderRadius: 8,
              padding: 8
            }}
          >
            <Text style={{ fontSize: 18, color: '#FFF' }} >Explore more from CloneX</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1000).damping(2000).dampingRatio(1.5)}
            style = {{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 40,
              height: 35,
              width: 100
            }}
          >
            <Ionicons name="arrow-redo" size={28} color="#FFF" />
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default AnimeStories;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#0d0e14',
  },
});
