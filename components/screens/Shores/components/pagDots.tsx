import { StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { Image } from 'expo-image';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { POSTER_WIDTH } from './ShoresItem';

type Props = {
  scrollOffset: SharedValue<number>;
  index: number;
}

const PagingDots = ({ scrollOffset, index }: Props) => {

  let rStyles = useAnimatedStyle(() => {
    const activeIndex = Number((scrollOffset.value / POSTER_WIDTH).toFixed());

    return {
      width: activeIndex === index ? withSpring(16, { damping: 50, stiffness: 100 }) : withSpring(7, { damping: 50, stiffness: 100 }),
      backgroundColor: activeIndex === index ? withSpring("#ef8354", { damping: 50, stiffness: 100 }) : withSpring("#dee2e6", { damping: 50, stiffness: 100 }),
      borderRadius: 7
    }
  })

  return (
    <Animated.View 
      style={[{ 
        height: 7,
        borderRadius: 7,
     }, rStyles]} />
  )
}

export default PagingDots

const styles = StyleSheet.create({})