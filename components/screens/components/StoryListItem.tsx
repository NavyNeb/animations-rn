import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image, ImageSource } from 'expo-image';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  src: ImageSource;
  index: number;
  scrollOffset: SharedValue<number>;
};

export const StoryListItemHeight = Dimensions.get('window').width * 0.8;
export const StoryListItemWidth = (StoryListItemHeight * 3) / 4;
export const windowWidth = Dimensions.get('window').width

const StoryListItem = ({ src, index, scrollOffset }: Props) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / StoryListItemWidth;
    const paddingLeft = (windowWidth - StoryListItemWidth) / 4;
    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [120, 60, 0, -StoryListItemWidth-paddingLeft],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
        activeIndex,
        [index - 2, index - 1, index, index + 1],
        [0.8, 0.9, 1, 1],
        Extrapolation.CLAMP
      );

    return {
      left: paddingLeft,  
      transform: [
        { translateX: scrollOffset.value + translateX },
        { scale }
    ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          zIndex: -index,
        },
        rContainerStyle,
      ]}>
      <Image
        source={src}
        contentFit={'cover'}
        style={{
          height: StoryListItemHeight,
          width: StoryListItemWidth,
          borderRadius: 25,
          position: 'absolute',
        }}
      />
    </Animated.View>
  );
};

export default StoryListItem;

const styles = StyleSheet.create({});
