import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ProfileItems({item,icon = '',callback,style,iconStyle,label}) {
  return (
    <View 
        style={[styles.wrapper,style]}
    >
        <Text style={styles.label}>{label}:</Text>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity
        onPress={callback} 
        style={[styles.icon,iconStyle]}  
      >
        <Image source={icon}/>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray'
    },
    itemText: {
        fontSize: 18,
        fontWeight: '400'
    },
    label: {
        fontSize: 18,
        marginRight: 10,
        fontWeight: '500'
    },
    icon: {
        marginLeft: 'auto'
    }
})