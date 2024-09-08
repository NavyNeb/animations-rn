import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import { Planets } from '~/data'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import PlanetsItem, { planetsWidths, SCREEN_HEIGHT } from './components/PlanetsItem'

type Props = {}

const galaxyBackground = require("~/assets/galaxy.jpg")
const sun = require("~/assets/sun.png")

const Galaxy = (props: Props) => {

    const animatedRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(animatedRef)


  return (
    <ImageBackground source={galaxyBackground} style={styles.container} >
        <StatusBar barStyle={"light-content"} />
        <View style={{
            height: SCREEN_HEIGHT * 0.70,
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
           
        }} >
            <Animated.ScrollView
                ref={animatedRef}
                horizontal
                snapToInterval={planetsWidths}
                disableIntervalMomentum
                showsHorizontalScrollIndicator={false}
                decelerationRate={"fast"}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    width: planetsWidths * 12
                }}

            >
                {
                    Planets.map((planet, index)=> {
                        return <PlanetsItem src={planet.image} index={index} scrollOffset={scrollOffset} />
                    })
                }
            </Animated.ScrollView>
        </View>
        <Animated.Image source={sun} style={{
            height: 220,
            width: 220,
            alignSelf: 'center',
            marginBottom: 40

        }} />
    </ImageBackground>
  )
}

export default Galaxy

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    }
})