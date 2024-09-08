import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Image, ImageSource } from 'expo-image'
import { Planets } from '~/data'

type Props = {
    index: number,
    src: ImageSource,
    scrollOffset: SharedValue<number>
}

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window")
export const planetsWidths = SCREEN_WIDTH * 0.25

const PlanetsItem = ({ index, src, scrollOffset }: Props) => {

    const animatedViewStyle = useAnimatedStyle(()=>{
        const activeIndex = scrollOffset.value / planetsWidths
        console.log('activeIndex', activeIndex)

        let translateX = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [planetsWidths+30, 0, -planetsWidths-30],
            Extrapolation.CLAMP
        )

        let translateY = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [planetsWidths-70, 0, planetsWidths-70],
            Extrapolation.CLAMP
        )

        let scale = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [0.85, 1, 0.85],
            Extrapolation.CLAMP
        )

        let opacity = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [1, 1, 1],
            Extrapolation.CLAMP
        )

        let zIndex = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [Planets.length - index, 1, index],
            Extrapolation.CLAMP
        )

        return {
            zIndex,
            opacity,
            transform: [
                {translateX: scrollOffset.value + translateX},
                {translateY: translateY},
                { scale }
            ]
        }
    })

  return (
    <Animated.View key={index} style={[{
        width: planetsWidths,
        height: planetsWidths,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        left: (SCREEN_WIDTH - planetsWidths) / 2.30,
    }, animatedViewStyle]}>
        <Image source={src} contentFit='contain' style = {{
            height: planetsWidths,
            width: planetsWidths,
        }} />
    </Animated.View>
  )
}

export default PlanetsItem

const styles = StyleSheet.create({})