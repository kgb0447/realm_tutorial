import { View, Text, Appearance } from 'react-native'
import React, { useEffect } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import RootStack from './navigation/RootStack'
import { TodoRealmContext } from './realm/config/TodoConfig'
import { User } from './realm/db/User'

export default function Main() {
  const { useObject } = TodoRealmContext;
  const theme = useObject(User,'admin1')

  
  useEffect(() => {
    if(theme) {
      Appearance.setColorScheme(theme.theme)
    }
  },[])
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack/>
    </NavigationContainer>
  )
}