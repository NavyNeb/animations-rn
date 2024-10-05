import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'tamagui';
import { SafeAreaView } from 'react-native';
import StoryList from '~/components/screens/StoryList';
import Galaxy from '~/components/screens/Galaxy';
import Posters from '~/components/screens/Posters';
import AnimeStories from '~/components/screens/AnimeStories';
import ShoesCards from '~/components/screens/Shoes';
import Shores from '~/components/screens/Shores';
import SongPlayer from '~/components/screens/SongPlayer';
import SearchCards from '~/components/screens/SearchCards';

export default function Details() {
  const { name } = useLocalSearchParams();

  const renderAnimations = () => {
    switch (name) {
      case 'story-list':
        return <StoryList />;
      case 'galaxy':
        return <Galaxy />;
      case 'posters':
        return <Posters />;
        case 'animeStories':
          return <AnimeStories />;
        case 'shoes':
          return <ShoesCards />
        case "shores":
          return <Shores />
        case "songPlayer": 
          return <SongPlayer />
        case "searchCards":
          return <SearchCards />
      default:
        <Text>No animation type defined</Text>;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f9f0' }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#f1f9f0' },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      {renderAnimations()}
    </SafeAreaView>
  );
}
