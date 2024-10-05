import { StyleSheet, 
    Text as DefaultText, } from 'react-native'
import React from 'react'

type TextProps = DefaultText["props"];

export function Text(props: TextProps) {
    const { style, ...otherProps } = props;
  
    return <DefaultText style={[{ fontFamily: "Inter" }, style]} {...otherProps} />;
  }
  