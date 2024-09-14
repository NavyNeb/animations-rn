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
  runOnJS,
  SharedValue,
  SlideInUp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AnimesStories } from '~/data';
import { Gyroscope } from 'expo-sensors';

type Props = {
  image: ImageSource;
  title: string;
  price: string;
  bgColor: string;
  scrollOffset: SharedValue<number>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  index: number;
  onItemClick: () => void;
  expanded: boolean
};

export const POSTER_WIDTH = SCREEN_WIDTH * 0.70;
export const POSTER_HEIGHT = SCREEN_HEIGHT * 0.40;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ShoeCardItem = ({ title, price, image, bgColor, scrollOffset, index, onItemClick, expanded, setActiveIndex }: Props) => {
  
  let run = ()=> {
    Number((scrollOffset.value / POSTER_WIDTH).toFixed()) === index && setActiveIndex(index)
  }

  useDerivedValue(() => {
    runOnJS(run)
  }, [scrollOffset.value]);
  
  const animatedViewStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH;
    let isActive = Number((scrollOffset.value / POSTER_WIDTH).toFixed()) === index
    const leftPadding = 14

    let translateX = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [POSTER_WIDTH + 60, 0, -POSTER_WIDTH-60]
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
    );

    let borderRadius = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [12, 10, 5],
      Extrapolation.CLAMP
  )

    return {
      height: expanded && isActive ? SCREEN_WIDTH : POSTER_HEIGHT,
      width: expanded && isActive ? SCREEN_WIDTH : POSTER_WIDTH,
      top: expanded && isActive ? -(POSTER_HEIGHT * 0.5) : "auto",
      borderRadius: expanded && isActive ? 100 : borderRadius,
      zIndex: expanded && isActive ? 100 : zIndex,
      left: expanded && isActive ? 0 : leftPadding,
      overflow: expanded && isActive ? 'hidden' : 'visible',
      transform: [{ translateX: scrollOffset.value + translateX }, { scale }],
    };
  });

     // Create animated styles for parallax effect
     const animatedStyle = useAnimatedStyle(() => {
      const activeIndex = (scrollOffset.value / POSTER_WIDTH);

      let rotate = interpolate(
        activeIndex,
        [index - 1, index, index + 1],
        [ -60, -30, 0],
      );
  
      return {
        transform: [
          { rotateZ: withTiming(`${rotate}deg`, { duration: 400, easing: Easing.linear }) },
        ],
      };
    });

    const rViewStyle = useAnimatedStyle(() => {
      const activeIndex = (scrollOffset.value / POSTER_WIDTH);
      let isActive = Number((scrollOffset.value / POSTER_WIDTH).toFixed()) === index

      let borderRadius = interpolate(
        activeIndex,
        [index - 1, index, index + 1],
        [12, 10, 5],
        Extrapolation.CLAMP
    )
  
      return {
      borderRadius: expanded && isActive ? SCREEN_WIDTH : borderRadius,
      };
    });

    const customLayoutAnimation = (values: any)=> {
      'worklet'
      const animations = {
        originX: withTiming(values.targetGlobalOriginX, { duration: 1500 }),
        originY: withTiming(values.targetGlobalOriginY, { duration: 1500 }),
        borderRadius: withTiming(values.targetBorderRadius, { duration: 1000 }),
        height: withTiming(values.targetHeight, { duration: 1000 }),
        width: withTiming(values.targetWidth, { duration: 1000 }),
      }
  
      const initialValues = {
        originX: values.currentGlobalOriginX,
        originY: values.currentGlobalOriginY,
        borderRadius: values.currentBorderRadius,
        height: values.currentHeight,
        width: values.currentWidth,
      };
  
      return {
        initialValues,
        animations
      }
    }


  return (
    <AnimatedPressable
      layout={customLayoutAnimation}
      onPress={() => onItemClick()}
      style={[
        {
          position: 'absolute',
          backgroundColor: bgColor,
        },
        animatedViewStyle,
      ]}>
      <Animated.View
        style = {[{
          height: POSTER_HEIGHT,
          width: POSTER_WIDTH,
          overflow: 'visible',
          alignItems: 'center',
          position: 'relative',
        }, rViewStyle]}
      >
        <Animated.View
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
            <Text style={{ fontSize: 21.5, fontWeight: 'bold', color: '#FFF' }}>{title}</Text>
            <Text style={{ fontSize: 14, color: '#f0efeb' }}>{price}</Text>
          </View>
          <Animated.Image resizeMode="contain" source={image} style={[{ width: 330, height: 330, position: 'absolute', bottom: 0, right: -40, zIndex: 1, overlayColor: "#0D0D0F50" }, animatedStyle]} />

         </Animated.View>
      </Animated.View>
    </AnimatedPressable>
  );
};
// #252933
export default ShoeCardItem;

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
