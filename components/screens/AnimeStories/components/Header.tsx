import { StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';

type Props = {
  isFullScreen: boolean
}

const logo = require('../../../../assets/gaming2.svg')

const Header = ({ isFullScreen }: Props) => {
  return (
    <Animated.View 
      style={{ 
        height: 50,
        paddingHorizontal: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25
     }} >
        <Image source={logo} contentFit='contain' style={{ width: 44, height: 44 }} />
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({})