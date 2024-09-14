import { StyleSheet, Text, View } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons';
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
        <Icon name="menu-outline" size={24} color="#14213d" />
        <View style = {{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 7
        }} >
          <Image source={logo} contentFit='contain' style={{ width: 24, height: 24 }} />
          <Text style = {{
            fontSize: 14,
            color: '#14213d',
            fontStyle: "normal",
            fontWeight: "600"
          }} >Discover</Text>
        </View>
        <Icon name="search-outline" size={24} color="#14213d" />
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({})