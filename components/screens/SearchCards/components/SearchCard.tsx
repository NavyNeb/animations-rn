import { Pressable, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Galaxy/components/PlanetsItem'
import { Image, ImageSource } from 'expo-image'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { Easing, Extrapolation, FadeIn, FadeInDown, FadeInUp, interpolate, SharedValue, SlideInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { faker } from '@faker-js/faker/.';

type Props = {
  image: ImageSource,
  artist: string,
  song: string,
  scrollOffset: SharedValue<number>,
  index: number,
  onItemClick: () => void
}

export const POSTER_WIDTH = SCREEN_WIDTH * 0.80;
export const POSTER_HEIGHT = SCREEN_HEIGHT * 0.40;

const SearchCard = ({ artist, song, image, scrollOffset, index, onItemClick }:Props) => {

  const radiusStyle = useSharedValue(8);
  const scaleValue = useSharedValue(0.95);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(radiusStyle.value, { easing: Easing.linear }),
      transform: [{ scale: withTiming(scaleValue.value) }]
    }
  });

  const animatedViewStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH;


    let translateX = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [0, 0, -SCREEN_WIDTH],
      Extrapolation.CLAMP
  );

  let translateY = interpolate(
    activeIndex,
    [index - 6, index - 5, index - 4, index - 3, index - 2, index - 1, index, index + 1],
    [-210,-175,-140, -105, -70, -35, 0, 40],
    Extrapolation.EXTEND
);

  let scale = interpolate(
      activeIndex,
      [index - 6, index - 5,index -4, index - 3, index - 2, index - 1, index, index + 1],
      [.40, .50, .60,.70,.80,0.90, 1, 1],
      Extrapolation.CLAMP
  );

  let rotate = interpolate(
      activeIndex,
      [index - 6, index - 5,index -4, index - 3, index - 2, index - 1, index, index + 1],
      [-28, -44, -38, -30, -22, -12, 0, 35],
      Extrapolation.CLAMP
  );

  return {
    left: (SCREEN_WIDTH - (POSTER_WIDTH * scale )) / 2,
    top: (SCREEN_HEIGHT - (POSTER_HEIGHT * scale )) / 2,
    transform: [
        {translateX: scrollOffset.value + translateX},
        { translateY },
        { scale },
        { rotate: `${rotate}deg` }
    ]
}
  });

  useEffect(() => {
    setTimeout(() => {
      radiusStyle.value = 12
      scaleValue.value = 1
    }, 300)
    return () => {}
  }, []);
  

  return (
    <Animated.View 
      style={[{
        zIndex: -index,
        position: 'absolute',
        backgroundColor: 'blue'
      }, animatedViewStyle]}
    >
      <Animated.View
        entering={FadeIn.duration(800).delay(index * 300).damping(15).easing(Easing.linear)}
        style={{
          height: POSTER_HEIGHT,
          width: POSTER_WIDTH,
          borderRadius: 35,
          padding: 24,
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: faker.color.rgb()
        }}
      >
         <Pressable style = {{
          height: 42,
          width: 42,
          borderRadius: 70,
          backgroundColor: '#00000050',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 20,
          left: 20
        }} >
          <MaterialCommunityIcons name='close-thick' size={32} color="#ffffff40" />
        </Pressable>
        <View style = {{
          height: 120,
          width: 120,
          borderWidth: 6,
          borderRadius: 100,
          borderColor: '#ced4da',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
          <Image source = {image} contentFit='cover' style = {{ height: '100%', width: '100%', borderRadius: 100,  }} />
        </View>

        {/* <Animated.View 
          entering={FadeInUp.delay(index * 450)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            bottom: 20
          }}
        >
          <View>
            <Text style={{ fontSize: 21.5, fontWeight: 'bold', color: '#14213d' }}>{song}</Text>
            <Text style={{ fontSize: 14, color: '#14213d90' }}>{artist}</Text>
          </View>
          <Pressable 
            style = {{
              height: 60,
              width: 60,
              borderRadius: 60,
              backgroundColor: '#14213d',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FontAwesome5 name="play" size={24} color="#FFF" />
          </Pressable>
        </Animated.View> */}
      </Animated.View>
    </Animated.View>
  )
};

export default SearchCard;

const styles = StyleSheet.create({});