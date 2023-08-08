import { View, Text, Switch, StyleSheet } from 'react-native'
import React from 'react'

export default function SwitchItems({
    label,
    labelStyle,
    switchIsEnabled,
    setSwitchIsEnabled,
    switchItemWrapperStyle
}) {
  return (
    <View style={[styles.wrapper,switchItemWrapperStyle]}>
        <Text style={[styles.label,labelStyle]}>{label}</Text>
        <Switch 
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={ switchIsEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setSwitchIsEnabled}
            value={switchIsEnabled}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        borderWidth: 0.5,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    label: {
        fontSize: 20,
        fontWeight: '500'
    }
})