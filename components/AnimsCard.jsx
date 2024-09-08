import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { color } from '@tamagui/themes'
import { Image } from 'expo-image'


const AnimsCard = ({ title, desc, handleNavigate }) => {
  return (
    <TouchableOpacity 
      style = {styles.container}
      onPress={ ()=>  handleNavigate()}
    >
      <TouchableOpacity>
        <Image
          contentFit='contain'
          style = {styles.logoImage} 
          source={require('../assets/favicon.png')} />
      </TouchableOpacity>
      <View style={ styles.textContainer } >
        <Text 
          numberOfLines={1} 
          style = {styles.jobName} > 
          { title} 
        </Text>
        <Text style = {styles.jobType} >
          { desc }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default AnimsCard 

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: '#FFF',
    marginVertical: 5,
  },
  jobType: {
    fontSize: 12,
    color: color.gray6,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  jobName: {
    fontSize: 16,
    color: color.gray9Light,
  },
});
