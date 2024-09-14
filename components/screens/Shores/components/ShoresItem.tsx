import { Pressable, StyleSheet, Text, useAnimatedValue, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Galaxy/components/PlanetsItem';
import { Image, ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from 'expo-blur';
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  interpolate,
  LayoutAnimationsValues,
  SharedValue,
  SlideInUp,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AnimesStories, SubImages } from '~/data';
import { Gyroscope } from 'expo-sensors';

type Props = {
  image: ImageSource;
  userImg: ImageSource;
  title: string;
  desc: string;
  scrollOffset: SharedValue<number>;
  index: number;
  onItemClick: () => void;
  activIndex: number;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);
export const POSTER_WIDTH = SCREEN_WIDTH * 0.7;

const AnimePoster = ({
  title,
  userImg,
  image,
  desc,
  onItemClick,
  scrollOffset,
  index,
  activIndex,
}: Props) => {
  const animatedViewStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH;
    const leftPadding = (SCREEN_WIDTH - POSTER_WIDTH) / 2;

    let translateX = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [POSTER_WIDTH, 0, -POSTER_WIDTH]
    );

    let scale = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    let zIndex = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [AnimesStories.length - index, 1, index],
      Extrapolation.CLAMP
    );

    return {
      zIndex,
      left: leftPadding,
      transform: [{ translateX: scrollOffset.value + translateX }, { scale }],
    };
  });

  const rImagesStyle = useAnimatedStyle(() => {
    const activeIndex = Number((scrollOffset.value / POSTER_WIDTH).toFixed());

    let translateY = interpolate(activeIndex, [index - 1, index, index + 1], [-60, 0, 60]);

    let displayVal = interpolate(activeIndex, [index - 1, index, index + 1], [0, 1, 0], 'clamp');

    return {
      display: displayVal >= 1 ? 'flex' : 'none',
      transform: [{ translateY }],
    };
  });

  const animatedHeightStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH;

    let height = interpolate(activeIndex, [index - 1, index, index + 1], [370, 426, 370], 'clamp');

    return {
      height,
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const activeIndex = Number((scrollOffset.value / POSTER_WIDTH).toFixed());

    return {
      transform: [{ scale: withDelay(170, withSpring(activeIndex === index ? 1.1 : 1, { damping: 50, stiffness: 100 })) }],
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH;

    let opacity = interpolate(activeIndex, [index - 1, index, index + 1], [0, 0, 1], 'clamp');

    let displayVal = interpolate(activeIndex, [index - 1, index, index + 1], [0, 0, 1], 'clamp');

    return {
      display: displayVal <= 1 ? 'flex' : 'none',
      opacity: withDelay(500, withTiming(opacity)),
    };
  });

  let animation = (values: LayoutAnimationsValues) => {
    'worklet';
    return {
      animations: {
        height: withSpring(values.targetHeight, { damping: 50, stiffness: 100 }),
      },

      initialValues: {
        height: values.currentHeight,
      },
    };
  };

  let animationImage = (values: LayoutAnimationsValues) => {
    'worklet';

    return {
      animations: {
        originY: withSpring(values.targetGlobalOriginY, { damping: 50, stiffness: 100 }),
      },

      initialValues: {
        originY: values.currentGlobalOriginY,
      },
    };
  };

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
      <Animated.View
        layout={animation}
        style={[
          {
            width: POSTER_WIDTH,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'absolute',
            backgroundColor: '#FFF',
            elevation: 5,
            shadowColor: '#6c757d50',
            shadowRadius: 10,
            shadowOpacity: 0.2,
          },
          animatedHeightStyle,
        ]}>
        <Animated.View
          entering={FadeIn.duration(800)
            .delay(index * 300)
            .damping(15)
            .easing(Easing.linear)}
          style={{
            width: '100%',
            overflow: 'hidden',
            height: SCREEN_HEIGHT * 0.3,
            elevation: 5,
            shadowColor: '#6c757d30',
            shadowRadius: 10,
            shadowOpacity: 0.2,
          }}>
          <AnimatedImage
            contentFit="cover"
            source={image}
            style={[{ width: '100%', height: SCREEN_HEIGHT * 0.3, borderRadius: 12 }, rImageStyle]}
          />

          <View style={[styles.blur_view, { bottom: 0 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <AntDesign name="tags" size={24} color="#FFFF" />
              <Text
                style={{
                  fontSize: 12,
                  color: '#FFF',
                  fontStyle: 'normal',
                  fontWeight: '700',
                }}>
                {index + 22}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Ionicons name="heart-sharp" size={24} color="#ef8354" />
              <Text
                style={{
                  fontSize: 12,
                  color: '#FFF',
                  fontStyle: 'normal',
                  fontWeight: '700',
                }}>
                {index + 22}
              </Text>
            </View>
          </View>
        </Animated.View>

        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 12,
          }}>
          <Animated.View
            layout={animationImage}
            entering={FadeIn.duration(800)}
            exiting={FadeOutUp.duration(800)}
            style={[
              {
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              },
              rImagesStyle,
            ]}>
            <Image source={userImg} style={{ height: 34, width: 34 }} contentFit="contain" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 5,
              }}>
              {SubImages.map((item, index) => {
                return (
                  <Animated.View entering={FadeInUp.duration(400).delay(index * 100)} key={index}>
                    <Image
                      source={item}
                      contentFit="cover"
                      key={index}
                      style={{ height: 42, width: 42, borderRadius: 5 }}
                    />
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              columnGap: 5,
            }}>
            <Text
              style={{
                fontSize: 13,
                marginBottom: 10,
                color: '#adb5bd',
                fontStyle: 'normal',
                fontWeight: '600',
              }}>
              {desc}
            </Text>
            <AnimatedImage
              source={userImg}
              style={[{ height: 28, width: 28, opacity: 0 }, animatedImageStyle]}
              contentFit="contain"
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              width: '80%',
              color: '#14213d',
              fontStyle: 'normal',
              fontWeight: '600',
            }}>
            {title}
          </Text>
        </View>
      </Animated.View>
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
