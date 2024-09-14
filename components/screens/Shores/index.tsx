import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '~/helpers';
import { ShoresList } from '~/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShoresItem, { POSTER_WIDTH } from './components/ShoresItem';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, SlideInDown, useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Header from './components/Header';
import PagingDots from './components/pagDots';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Shores = () => {
  const [fullscreen, setToggleFullscreen] = useState<boolean>(false)
  const [activIndex, setActiveIndex] = useState<number>(0)
  const { top } = useSafeAreaInsets();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  useCallback(
    () => {
      setActiveIndex(Number((scrollOffset.value / POSTER_WIDTH).toFixed()))
    },
    [scrollOffset.value],
  )
  

  const handlePosterItemClick = ()=> {

    setToggleFullscreen(!fullscreen);
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: isAndroid ? top : 0 }]}>
      <StatusBar barStyle={"dark-content"} />
  
      <Header isFullScreen={fullscreen} />
      <View
        style={{
          height: SCREEN_HEIGHT * 0.65,
          width: '100%',
          marginTop: 50
        }}>
        <Animated.ScrollView
          ref={animatedRef}
          horizontal
          snapToInterval={POSTER_WIDTH}
          decelerationRate={'fast'}
          disableIntervalMomentum
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: POSTER_WIDTH * ShoresList.length + (SCREEN_WIDTH - POSTER_WIDTH),
          }}>
          {ShoresList.map((poster, index) => {
            return (
              <ShoresItem {...poster} scrollOffset={scrollOffset} index={index} activIndex={activIndex} key={index} onItemClick={handlePosterItemClick} />
            );
          })}
        </Animated.ScrollView>
      </View>
     <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 5 }} >
     {
        ShoresList.map((_, index) => {
          return (
            <PagingDots scrollOffset={scrollOffset} index={index} key={index} />
          )
        })
      }   
     </View> 
     
    </SafeAreaView>
  );
};

export default Shores;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
