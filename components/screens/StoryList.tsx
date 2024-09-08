import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { color } from '@tamagui/themes';
import { BG_COLOR } from '~/constants';
import { Stories } from '~/data';
import StoryListItem, { StoryListItemHeight, StoryListItemWidth, windowWidth } from './components/StoryListItem';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'


type Props = {};

const StoryList = (props: Props) => {

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(animatedRef);

    const listPadding = windowWidth - StoryListItemWidth

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View 
        style = {{
            height: StoryListItemHeight,
            width: '100%'
        }}
        >
        <Animated.ScrollView
            ref={animatedRef}
            horizontal
            snapToInterval={StoryListItemWidth}
            decelerationRate={"fast"}
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={{
                width: StoryListItemWidth * Stories.length + listPadding,
            }}
        >
          {Stories.map((story, index) => {
            return <StoryListItem src={story.image} index={index} key={index} scrollOffset={scrollOffset} />;
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default StoryList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
