import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function AuthLink({
        label = '',
        linkText = '',
        link = ''
    }) {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate(link)
  }
    return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label: {
        paddingRight: 4
    },
    linkText: {
        textDecorationLine: 'underline',
        fontWeight: '600'

    }
})