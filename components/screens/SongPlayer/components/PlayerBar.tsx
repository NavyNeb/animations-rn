import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  LayoutAnimationsValues,
  LinearTransition,
  runOnJS,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Text } from '../../components/Text';
import { Image } from 'expo-image';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {};

const PlayerBar = (props: Props) => {
  const width = useSharedValue<number>(SCREEN_WIDTH * 0.4);
  const height = useSharedValue<number>(64);
  const bottom = useSharedValue<number>(30);
  const [expanded, setExpanded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // Animate height
      height: withSpring(height.value, { damping: 35, restDisplacementThreshold: 0.5, overshootClamping: true, stiffness: 200, velocity: 10, }),
      // Animate width
      width: withSpring(width.value, { damping: 35, restDisplacementThreshold: 0.5, overshootClamping: true, stiffness: 200, velocity: 10, }),
      // Animate bottom position
      maxWidth: SCREEN_WIDTH,
      bottom: withSpring(bottom.value, { damping: 35, restDisplacementThreshold: 0.5, overshootClamping: true, stiffness: 200, velocity: 10, }),
      borderBottomLeftRadius: expanded ? 0 : 20,
      borderBottomRightRadius:expanded ? 0 :  20,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
    })
    .onChange((event) => {
      console.log('event :>> ', event.translationY, event.translationX);
      if (expanded && event.translationY <= 150) {
        bottom.value -= event.translationY;
        height.value -= event.translationX;
        width.value -= event.translationY;
      }
    })
    .onFinalize(() => {
      runOnJS(() => {
        setExpanded((prev) => !prev);
      })
    });

  useEffect(() => {
    if (expanded) {
      height.value = SCREEN_HEIGHT * 0.5;
      width.value = SCREEN_WIDTH;
      bottom.value = 0;
    } else {
      height.value = 64;
      width.value = SCREEN_WIDTH * 0.4;
      bottom.value = 30;
    }
  }, [expanded])

  return (
      <GestureDetector gesture={pan} >
      <AnimatedPressable
      style={[
        {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#003f88',
          alignSelf: 'center',
        },
        animatedStyle,
      ]}
      layout={LinearTransition.springify(100)} //
      onPress={() => setExpanded((prev) => !prev)}>
     <View style = {{
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12
     }} >
     <Image
        source={require('../../../../assets/tabs-icon.svg')}
        contentFit="contain"
        style={{ width: 28, height: 28 }}
      />
        <Image
        source={require('../../../../assets/me.jpg')}
        contentFit="contain"
        style={{ width: 28, height: 28, borderRadius: 30 }}
      />
     </View>
    </AnimatedPressable>
      </GestureDetector>
  );
};

export default PlayerBar;

const styles = StyleSheet.create({});
