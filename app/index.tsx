import { Stack, Link, useRouter} from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import AnimsCard from '~/components/AnimsCard';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
       <AnimsCard title={"Animated Stories Card"} desc={"Animated Story cards ScrollView"} handleNavigate={()=> router.push(`/story-list`)} />
       <AnimsCard title={"Animated planet Card"} desc={"Animated planetry solar system"} handleNavigate={()=> router.push(`/galaxy`)} />
       <AnimsCard title={"Animated posters Card"} desc={"Songs Posters Animations"} handleNavigate={()=> router.push(`/posters`)} />
       <AnimsCard title={"Anime Stories Card"} desc={"Anime Stories Animations"} handleNavigate={()=> router.push(`/animeStories`)} />
       <AnimsCard title={"Shoes Card"} desc={"Animated scrolling shoes"} handleNavigate={()=> router.push(`/shoes`)} />
       <AnimsCard title={"Shores Card"} desc={"Animated scrolling shores"} handleNavigate={()=> router.push(`/shores`)} />
       <AnimsCard title={"Song Player Elements"} desc={"Animated song player list"} handleNavigate={()=> router.push(`/songPlayer`)} />
       <AnimsCard title={"Search Cards"} desc={"Animated Search Cards List"} handleNavigate={()=> router.push(`/searchCards`)} />
      </Container>
    </>
  );
}
