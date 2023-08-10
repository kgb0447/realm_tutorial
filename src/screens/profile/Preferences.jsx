import { View, Text, Appearance, useColorScheme, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SwitchItems from '../../components/shared/SwitchItems'
import { TodoRealmContext } from '../../realm/config/TodoConfig';
import { User } from '../../realm/db/User'
import Container from '../../components/layout/Container';
import { colors } from '../../theme/darkmode';
import { useSelector } from 'react-redux';

export default function Preferences() {
  const { useRealm, useObject } = TodoRealmContext;
  const [isDarkMode,setIsDarkMode] = useState(false);
  const {uuid} = useSelector(state=> state.AuthReducerSlice)
  const theme = useColorScheme();
  const realm = useRealm();
  const themeFromStorage = useObject(User, uuid)

  const setColorScheme = () => {
    if(isDarkMode) {
      Appearance.setColorScheme('dark')
    } else {
      Appearance.setColorScheme('light')
    };

  }
  useEffect(() => {
    //Sets the dark mode from users previous configuration
    if(theme === 'dark') {
      setIsDarkMode(true)
    } else {
      setColorScheme(false)
    }
  },[])

  useEffect(() => {
    setColorScheme()
    if(themeFromStorage) {
      realm.write(() => {
        themeFromStorage.theme = theme
      })
    } else {
        realm.write(() => {
          realm.create('User', {
            _uuid: 'admin1',
            theme: theme
          })
        })
    }
    
  } ,[isDarkMode])

  return (
    <Container style={{backgroundColor: theme === 'dark' ? colors.primary : '#fff'}}>
      <Text>Preferences</Text>
      <SwitchItems label={'Dark Mode'} switchIsEnabled={isDarkMode} setSwitchIsEnabled={() => setIsDarkMode(!isDarkMode)}/>
    </Container>
  )
}

const styles = StyleSheet.create({

})