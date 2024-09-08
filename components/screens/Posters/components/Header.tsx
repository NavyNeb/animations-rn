import { StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';

type Props = {
  isFullScreen: boolean
}

const logo = require('../../../../assets/gaming.svg')
const fire = require('../../../../assets/Union.svg')

const Header = ({ isFullScreen }: Props) => {
  return (
    <Animated.View 
      style={{ 
        height: 50,
        paddingHorizontal: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
     }} >
        <AntDesign name="staro" size={24} color="#14213d" />
        <Image source={logo} contentFit='contain' style={{ width: 24, height: 24 }} />
        <Image source={fire} contentFit='contain' style={{ width: 24, height: 24 }} />
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({})