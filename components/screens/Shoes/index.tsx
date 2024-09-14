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
import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '~/helpers';
import Header from './components/Header';
import { Shoes } from '~/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShoeCardItem, { POSTER_WIDTH } from './components/ShoeCardItem';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutUp,
  LayoutAnimationConfig,
  SlideInDown,
  useAnimatedRef,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import TabTags from './components/TabTags';
import { Image } from 'expo-image';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const shoe6 = require('../../../assets/shoes/shoe6.svg');
const shoe7 = require('../../../assets/shoes/shoe7.svg');

const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);

const ShoesCards = () => {
  const [fullscreen, setToggleFullscreen] = useState<boolean>(false)
  const [activeTagIndex, setActiveTagIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { top } = useSafeAreaInsets();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);



  const handlePosterItemClick = () => {
    setToggleFullscreen(!fullscreen);
  };

  const customExitingAnimation = (values: any)=> {
    'worklet'
    const animations = {
      originY: withTiming(500, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      opacity: withTiming(0, { duration: 1000 }),
    }

    const initialValues = {
      originY: values.currentOriginY,
      opacity: 1,
    };

    return {
      initialValues,
      animations
    }
  }

  const customEnteringAnimation = (values: any)=> {
    'worklet'
    const animations = {
      originY: withTiming(values.targetOriginY, { duration: 1500 }),
      opacity: withTiming(1, { duration: 1000 }),
    }

    const initialValues = {
      originY: 500,
      opacity: 0,
    };

    return {
      initialValues,
      animations
    }
  }

  console.log('activeIndex', activeIndex)

  return (
    <SafeAreaView style={[styles.container, { paddingTop: isAndroid ? top : 0 }]}>
      <StatusBar barStyle={'dark-content'} animated backgroundColor={ !fullscreen ? 'white' : Shoes[activeIndex].bgColor } />

      {/* <Header isFullScreen={fullscreen} /> */}
      <LayoutAnimationConfig skipEntering>
        { !fullscreen && <Animated.View entering={FadeInUp.springify(3500).damping(200).stiffness(0.5)} exiting={FadeOutUp.springify(2000).damping(200).stiffness(.5)} >
        <Text
        style={{
          fontSize: 24,
          fontWeight: '800',
          color: '#14213d',
          marginBottom: 5,
          marginHorizontal: 14,
        }}>
        Shoes
      </Text>
      <TabTags activeIndex={activeTagIndex} setActiveIndex={setActiveTagIndex} />
        </Animated.View>}
      </LayoutAnimationConfig>
      <View
        style={{
          height: fullscreen ? SCREEN_HEIGHT / 2 : SCREEN_HEIGHT * 0.45,
          overflow: "visible",
          width: '100%',
        }}>
        <Animated.ScrollView
          ref={animatedRef}
          horizontal
          snapToInterval={POSTER_WIDTH}
          decelerationRate={'normal'}
          disableIntervalMomentum={false}
          bouncesZoom
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: POSTER_WIDTH * Shoes.length + (SCREEN_WIDTH - POSTER_WIDTH),
          }}>
          {Shoes.map((poster, index) => {
            return (
              <ShoeCardItem
                {...poster}
                scrollOffset={scrollOffset}
                index={index}
                key={index}
                expanded={fullscreen}
                onItemClick={handlePosterItemClick}
                setActiveIndex={setActiveIndex}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
      <LayoutAnimationConfig skipEntering>
     { !fullscreen && <Animated.View style={{
      height: 500
     }} exiting={customExitingAnimation} entering={customEnteringAnimation} >
      <Text
        style={{
          fontSize: 13,
          fontWeight: '700',
          color: '#cecece',
          marginVertical: 10,
          marginHorizontal: 14,
        }}>
        214 OPTIONS
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#cecece30',
          borderTopWidth: 1,
          paddingVertical: 20,
          paddingHorizontal: 14,
          height: 'auto',
          maxHeight: 100,
        }}>
        <Image source={shoe6} contentFit="contain" style={{ width: 150, height: 55 }} />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            height: '100%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#14213d',
            }}>
            Undercover React Presto
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#cecece',
            }}>
            $120
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#cecece30',
          borderTopWidth: 1,
          paddingVertical: 20,
          paddingHorizontal: 14,
          height: 'auto',
          maxHeight: 100,
        }}>
        <Image source={shoe7} contentFit="contain" style={{ width: 150, height: 55 }} />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            height: '100%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#14213d',
            }}>
            Air Zoom Pegasus 17
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#cecece',
            }}>
            $100
          </Text>
        </View>
      </View>
      </Animated.View>    }
      </LayoutAnimationConfig>
    </SafeAreaView>
  );
};

export default ShoesCards;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#FFF',
  },
});
