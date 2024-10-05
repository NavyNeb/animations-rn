import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '~/helpers';
import Header from './components/Header';
import { PostersData } from '~/data';
import SearchCard, { POSTER_WIDTH } from './components/SearchCard';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';

const reloadIcon = require('../../../assets/reload.svg')

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SearchCards = () => {
  const [fullscreen, setToggleFullscreen] = useState<boolean>(false)
  const { top } = useSafeAreaInsets();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const handlePosterItemClick = ()=> {

    setToggleFullscreen(!fullscreen);
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: isAndroid ? top : 0 }]}>
      <Animated.View 
        entering={FadeInUp}
        exiting={FadeInDown}
        style={{
          display: fullscreen ? 'none' : "flex",
          height: SCREEN_HEIGHT * 0.20,
        }}
      >
        <Header />
        <View style = {{
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24
        }} >
          <Image source={reloadIcon} contentFit='contain' style={{ width: 42, height: 42 }} />
          <Feather name="search" size={18} color="#ced4da" style = {{
            position: 'absolute',
            alignSelf: 'center'
          }} />
        </View>
      </Animated.View>
      <View
        style={{
          height: SCREEN_HEIGHT * 0.80,
          backgroundColor: '#FFFF',
          borderTopLeftRadius: SCREEN_WIDTH * 0.12,
          borderTopRightRadius: SCREEN_WIDTH * 0.12,
        }}>
        <Animated.ScrollView
          ref={animatedRef}
          horizontal
          snapToInterval={POSTER_WIDTH}
          decelerationRate={'normal'}
          bounces={false}
          disableIntervalMomentum
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style = {{
            height: SCREEN_HEIGHT * 0.75,
          }}
          contentContainerStyle={{
            width: POSTER_WIDTH * PostersData.length + (SCREEN_WIDTH - POSTER_WIDTH),
          }}>
          {PostersData.map((poster, index) => {
            return (
              <SearchCard {...poster} scrollOffset={scrollOffset} index={index} key={index} onItemClick={handlePosterItemClick} />
            );
          })}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchCards;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#007200',
  },
});
