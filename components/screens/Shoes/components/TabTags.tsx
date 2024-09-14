import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TAGS = [
    "All",
    "Air Max",
    "Huarache",
    "Presto",
    "Jordan",
    "New Balance",
    "Air Force",
]

const TabTags = ({ activeIndex, setActiveIndex }: Props) => {
  return (
    <View style={styles.conainer} >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {TAGS.map((tag, index) => {
          return <Pressable onPress={() => setActiveIndex(index)} style={[styles.tagView, { 
            borderWidth: activeIndex === index ? 0 : 1,
            borderColor: activeIndex === index ? '#14213d' : 'lightgray',
            backgroundColor: activeIndex === index ? '#14213d' : '#cecece30',
           }]} key={index} >
            <Text style={{ color: activeIndex === index ? 'white' : 'gray' }} >{tag}</Text>
          </Pressable>
        })}
       </ScrollView> 
    </View>
  )
}

export default TabTags

const styles = StyleSheet.create({
    conainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 14,
    }, 
    tagView: {
        height: 36,
        minWidth: 55,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
    }
})