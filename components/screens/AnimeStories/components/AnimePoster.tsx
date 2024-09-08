import { Pressable, StyleSheet, Text, useAnimatedValue, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Galaxy/components/PlanetsItem';
import { Image, ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BlurView } from 'expo-blur';
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  SharedValue,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AnimesStories } from '~/data';
import { Gyroscope } from 'expo-sensors';

type Props = {
  image: ImageSource;
  title: string;
  genre: string;
  scrollOffset: SharedValue<number>;
  index: number;
  onItemClick: () => void;
  activIndex: number
};

export const POSTER_WIDTH = SCREEN_WIDTH * 0.85;

const AnimePoster = ({ title, genre, image, scrollOffset, index, activIndex }: Props) => {
  const radiusStyle = useSharedValue(8);
  const scaleValue = useSharedValue(0.95);

  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);
  const scaleImg = useSharedValue(1);
  
  const animatedViewStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH;
    const leftPadding = (SCREEN_WIDTH - POSTER_WIDTH) / 2

    let translateX = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [POSTER_WIDTH+10, 0, -POSTER_WIDTH-10]
    )

    let scale = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [0.95, 1, 0.95],
      Extrapolation.CLAMP
    );

    let zIndex = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [AnimesStories.length - index, 1, index],
      Extrapolation.CLAMP
  )


    return {
      zIndex,
      left: leftPadding,
      transform: [{ translateX: scrollOffset.value + translateX }, { scale }],
    };
  });

   // Create animated styles for parallax effect
   const animatedStyle = useAnimatedStyle(() => {
    const activeIndex = Math.floor(scrollOffset.value / POSTER_WIDTH);

    return {
      transform: [
        { translateX: activeIndex === index ? tiltX.value : 0 },
        { translateY: activeIndex === index ? tiltY.value : 0 },
        { scale: scaleImg.value }, // Slight zoom to create depth
      ],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      radiusStyle.value = 12;
      scaleImg.value = withTiming(1.1);
    }, 300);
    return () => {};
  }, []);

  useEffect(() => {
    Gyroscope.setUpdateInterval(16);

    const subscription = Gyroscope.addListener(gyroscopeData => {
      const { x, y } = gyroscopeData;

      // These values determine the intensity of the parallax effect
      const intensity = 10;

      // Update shared values
      tiltX.value = withSpring(y * intensity, { damping: 30, mass: 0.5 }); // Notice y is used for tiltX
      tiltY.value = withSpring(x * intensity, { damping: 30, mass: 0.5 }); // Notice x is used for tiltY
    })

    return () => subscription && subscription.remove();
  }, []);

  console.log('activeIndex, index, translateX', activIndex)

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          height: SCREEN_HEIGHT * 0.6,
          width: POSTER_WIDTH,
        },
        animatedViewStyle,
      ]}>
      <BlurView
        intensity={ activIndex === index ? 0 : 100}
        style = {{
          height: SCREEN_HEIGHT * 0.6,
          width: POSTER_WIDTH,
          borderRadius: 12,
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: '#404556',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: '#FFF',
        }}
      >
        <Animated.View
          entering={FadeIn.duration(800)
            .delay(index * 300)
            .damping(15)
            .easing(Easing.linear)}
          style={{
            height: "100%",
            width: "100%",
          }}>
          <View
            style={[
              styles.blur_view,
              {
                top: 0,
                zIndex: 5,
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingVertical: 14,
              },
            ]}>
            <LinearGradient
              colors={['#0D0D0F', '#0D0D0F80', '#06060800']}
              style={[
                StyleSheet.absoluteFillObject,
                { position: 'absolute', justifyContent: 'center' },
              ]}
            />

            <Text style={{ fontSize: 21.5, fontWeight: 'bold', color: '#FFF' }}>{title}</Text>
            <Text style={{ fontSize: 14, color: '#f0efeb' }}>{genre}</Text>
          </View>
          <Animated.Image resizeMode="cover" source={image} style={[{ width: '100%', height: '100%', overlayColor: "#0D0D0F50" }, animatedStyle]} />

          <View style={[styles.blur_view, { bottom: 0 }]}>
            <LinearGradient
              colors={['#06060800', '#0D0D0F50', '#0D0D0F']}
              style={[
                StyleSheet.absoluteFillObject,
                { position: 'absolute', justifyContent: 'center' },
              ]}
            />

            <FontAwesome6 name="plus" size={32} color="#FFF" />
            <FontAwesome6 name="arrow-right" size={32} color="#FFF" />
          </View>
        </Animated.View>
      </BlurView>
    </Animated.View>
  );
};
// #252933
export default AnimePoster;

const styles = StyleSheet.create({
  blur_view: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
});
