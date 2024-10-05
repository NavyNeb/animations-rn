import { StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import React from 'react'
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { faker } from '@faker-js/faker/.';

type Props = {
  isFullScreen?: boolean
}

const logo = require('../../../../assets/logo-gray.svg')
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
        <View style = {{
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
          <Text style = {{
            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: '700',
            position: 'absolute',
            color: '#FFFF'
          }} >
            12
          </Text>
          <Feather name="message-circle" size={38} color="#01011040" />
        </View>
        <Image source={logo} contentFit='contain' style={{ width: 24, height: 24 }} />
        <View style = {{
          height: 48,
          width: 48,
          borderWidth: 2,
          borderRadius: 100,
          borderColor: '#ced4da80',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
          <Image source = {faker.image.avatar()} contentFit='contain' style = {{ width: 38, height: 38, borderRadius: 100,  }} />
        </View>
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({})