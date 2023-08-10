import { useEffect, useState } from 'react'
import { View, StyleSheet, useColorScheme, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { setAuth, setIsLoggedIn } from '../../store/reducers/AuthReducerSlice'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import { User } from '../../realm/db/User'
import InputField from '../../components/shared/InputField'
import Btn from '../../components/shared/Btn'
import AuthLink from '../../components/shared/AuthLink'

export default function Login() {
  const { useQuery } = TodoRealmContext;
  const dispatch = useDispatch();
  const users = useQuery(User);
  const [username,setIsUsername] = useState('');
  const [password,setPassword] = useState('');
  const [isDisabled,setIsDisabled] = useState(!true);
  const theme = useColorScheme();

  const handleLogIn = () => {
    //get the username of the entered username
    const queuedUser = users.filter((item) => item.username === username)[0]; 
    
    // Input validation
    if(queuedUser !== null) {
      if(queuedUser?.password === password) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAuth({
          uuid: queuedUser._uuid       
        }))
      } else {
        Alert.alert("Oops","You have provided a wrong password or username!")
      }
    } else {
      Alert.alert("Sign In Failed", "The username or password does not match or does not exist")
    }
  }

  useEffect(() => {
    // Checks if the there is an existing input
    if(password.length > 0 && username.length > 0 ){
      setIsDisabled(false)
    } else {
      return
    }
    return () => {
      setIsDisabled(true)
    }
  } ,[password, username]);
  
  return (
    <View style={[styles.container,{backgroundColor: theme === 'dark' ? '#000' : '#fff'}]}>
      <InputField 
        placeholder='Enter your username' 
        label='Username'
        onChangeText={(text) => setIsUsername(text)}
        value={username}
        isUserName={true}
      />
      <InputField 
        placeholder='Enter your password' 
        label='Password' 
        isPassword={true}
        onChangeText={(text)=> setPassword(text)}
        value={password}
      />
      <Btn 
        label={'Log in' }  
        btnStyle={styles.btn}
        callback={handleLogIn}  
        isDisabled={isDisabled}
      />
      <AuthLink
        label={`Don't have an account yet?`}
        linkText='Sign Up'
        link='Register'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    flex: 1,
  },
  btn: {
    backgroundColor: '#000',
    height: 50,
    width: '50%',
    alignSelf: 'center',
    bottom: '10%'
  }
})