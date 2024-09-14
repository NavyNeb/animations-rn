import { StyleSheet, Text, View } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons';
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
        paddingHorizontal: 14,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
     }} >
        <Icon name='arrow-back-outline' size={24} color={'#14213d'}  />
        <Image source={logo} contentFit='contain' style={{ width: 24, height: 24 }} />
        <Icon name='search-outline' size={24} color={'#14213d'}  />
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({})