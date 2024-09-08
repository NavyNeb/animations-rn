import { Pressable, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Galaxy/components/PlanetsItem'
import { Image, ImageSource } from 'expo-image'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Animated, { Easing, Extrapolation, FadeIn, FadeInDown, FadeInUp, interpolate, SharedValue, SlideInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = {
  image: ImageSource,
  artist: string,
  song: string,
  scrollOffset: SharedValue<number>,
  index: number,
  onItemClick: () => void
}

export const POSTER_WIDTH = SCREEN_WIDTH * 0.90

const PostersCard = ({ artist, song, image, scrollOffset, index, onItemClick }:Props) => {

  const radiusStyle = useSharedValue(8);
  const scaleValue = useSharedValue(0.95);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(radiusStyle.value, { easing: Easing.linear }),
      transform: [{ scale: withTiming(scaleValue.value) }]
    }
  })

  const animatedViewStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / POSTER_WIDTH


    let translateX = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [0, 0, -SCREEN_WIDTH],
      Extrapolation.CLAMP
  )

  let translateY = interpolate(
    activeIndex,
    [index -4, index - 3, index - 2, index - 1, index, index + 1],
    [35, 105, 70, 35, 0, 0],
    Extrapolation.CLAMP
)

  let scale = interpolate(
      activeIndex,
      [index -4, index - 3, index - 2, index - 1, index, index + 1],
      [ .60,.70,.80,0.90, 1, 1],
      Extrapolation.CLAMP
  )

  let opacity = interpolate(
      activeIndex,
      [index -4, index - 3, index - 2, index - 1, index, index + 1],
      [.10, .20, .40, .60, 1, 1],
      Extrapolation.CLAMP
  )

  return {
    left: (SCREEN_WIDTH - (POSTER_WIDTH * scale )) / 2,
    opacity,
    transform: [
        {translateX: scrollOffset.value + translateX},
        { translateY },
        { scale }
    ]
}
  })

  useEffect(() => {
    setTimeout(() => {
      radiusStyle.value = 12
      scaleValue.value = 1
    }, 300)
    return () => {}
  }, [])
  

  return (
    <Animated.View 
      style={[{
        zIndex: -index,
        position: 'relative',
      }, animatedViewStyle]}
    >
      <Animated.View
        entering={FadeIn.duration(800).delay(index * 300).damping(15).easing(Easing.linear)}
        style={{
          height: SCREEN_HEIGHT * 0.60,
          width: POSTER_WIDTH,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#14213d',
          padding: 10,
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: '#FFF'
        }}
      >
        <Pressable style={{ 
            width: "100%", 
            height: "80%"
         }} onPress={onItemClick} >
          <Animated.Image resizeMode='cover' source={image} style={[{ width: "100%", height: "100%" }, animatedImageStyle]} />
        </Pressable>

        <Animated.View 
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
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}

export default PostersCard

const styles = StyleSheet.create({})