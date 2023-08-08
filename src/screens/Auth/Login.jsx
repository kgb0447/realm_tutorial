import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import InputField from '../../components/shared/InputField'
import Btn from '../../components/shared/Btn'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../../store/reducers/AuthReducerSlice'
import Container from '../../components/layout/Container'

export default function Login() {
  const dispatch = useDispatch();
  const [username,setIsUsername] = useState('');
  const [password,setPassword] = useState('');
  const [isDisabled,setIsDisabled] = useState(true)
  const theme = useColorScheme();
  const handleLogIn = () => {
    if(username === 'admin1' && password === 'qwer') {
      dispatch(setIsLoggedIn(true))
    } else {
      return null
    }
  }

  useEffect(() => {
    if(password.length > 0 && username.length > 0 ){
      setIsDisabled(false)
    }
    return () => {
      setIsDisabled(true)
    }
  } ,[password, username])
  
  return (
    <View style={[styles.container,{backgroundColor: theme === 'dark' ? '#000' : '#fff'}]}>
      <InputField 
        placeholder='Enter your username' 
        label='Username'
        onChangeText={(text) => setIsUsername(text)}
      />
      <InputField 
        placeholder='Enter your password' 
        label='Password' 
        isPassword={true}
        onChangeText={(text)=> setPassword(text)}
      />
      <Btn 
        label={'Log in'}  
        btnStyle={styles.btn}
        callback={handleLogIn}  
        isDisabled={isDisabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  btn: {
    backgroundColor: '#000',
    height: 50,
    width: '50%',
    alignSelf: 'center',
    bottom: '10%'
  }
})