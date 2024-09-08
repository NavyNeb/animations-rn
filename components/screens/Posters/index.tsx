import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '~/helpers';
import Header from './components/Header';
import { PostersData } from '~/data';
import PostersCard, { POSTER_WIDTH } from './components/Posters';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, SlideInDown, useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Posters = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [fullscreen, setToggleFullscreen] = useState<boolean>(false)
  const { top } = useSafeAreaInsets();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const handlePosterItemClick = ()=> {

    setToggleFullscreen(!fullscreen);
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: isAndroid ? top : 0 }]}>
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
            width: POSTER_WIDTH * PostersData.length + (SCREEN_WIDTH - POSTER_WIDTH),
          }}>
          {PostersData.map((poster, index) => {
            return (
              <PostersCard {...poster} scrollOffset={scrollOffset} index={index} key={index} onItemClick={handlePosterItemClick} />
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
            entering={FadeInLeft.delay(950).damping(2000).dampingRatio(1.5)}
            style = {{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#14213d',
              borderRadius: 40,
              height: 35,
              width: 100
            }}
          >
            <Text style={{ fontSize: 14, color: '#FFF' }} >DISCOVER</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(1000).damping(2000).dampingRatio(1.5)}
            style = {{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#14213d',
              borderRadius: 40,
              height: 35,
              width: 100
            }}
          >
            <Text style={{ fontSize: 14, color: '#14213d' }} >LIBRARY</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Posters;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#FFF',
  },
});
