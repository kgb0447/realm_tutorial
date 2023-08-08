import { Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { setTextTheme, setTheme } from '../../utils/theme';

export default function Btn({
    label,
    callback,
    btnStyle,
    textStyle, 
    isDisabled = false
  }) {
    const theme = useColorScheme();
  return (
    <TouchableOpacity 
      style={[styles.wrapper,btnStyle,{backgroundColor: theme === 'dark' ? '#fff' : '#000', opacity: isDisabled ? 0.6 : 1}]} 
      onPress={callback} 
      disabled={isDisabled}> 
        <Text style={[styles.textStyle,textStyle,{color: theme === 'dark' ? '#000' : '#fff'}]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        flexGrow: 0,
        flexShrink: 0,
        width: 200,
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    textStyle: {
        fontSize: 20,
        padding: 2,
        color: '#fff'
    }
})