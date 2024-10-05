import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import { StatusBar } from 'expo-status-bar';
import Header from './components/Header';
import { Text } from '../components/Text';
import PlayerBar from './components/PlayerBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {};

const SongPlayer = (props: Props) => {
  return (

    <GestureHandlerRootView style={{ flex: 1 }} >
    <View
      style={{
        flex: 1,
      }}>
      <Container style={{ backgroundColor: '#FFF' }}>
        <StatusBar style="auto" />
        <Header />
        <Text>SongPlayer</Text>
      </Container>
      <PlayerBar />
    </View>
    </GestureHandlerRootView>
  );
};

export default SongPlayer;

const styles = StyleSheet.create({});
