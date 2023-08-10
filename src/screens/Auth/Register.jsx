import { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import { User } from '../../realm/db/User'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { setAuth, setIsLoggedIn } from '../../store/reducers/AuthReducerSlice'
import InputField from '../../components/shared/InputField'
import Container from '../../components/layout/Container'
import Btn from '../../components/shared/Btn'
import AuthLink from '../../components/shared/AuthLink'

export default function Register() {
  const { useRealm, useQuery } = TodoRealmContext;
  const dispatch = useDispatch()
  const realm = useRealm();
  const users = useQuery(User);
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [validationMessage,setValidationMessage] = useState(null);
  const [isDisabled,setIsDisabled] = useState(true);

  const validateInput = () => {
    const userNames = users.map((item) => item.username);
    if(confirmPassword !== password) {
      setValidationMessage('Your password does not match')
    } else if(userNames.includes(username)) {
      setValidationMessage('Username already exists!')
    } else {
      setValidationMessage(null)
    }
  }

  const validateStates = () => {
    if(username.length > 3 && password.length > 3) {
      if(validationMessage === null) {
        setIsDisabled(false)
      }
    }
    return ()=> {
      setValidationMessage(null)
    }
  }

  useEffect(() => {
    validateInput();
    validateStates();
  },[username,password,confirmPassword]);

  const submit = () => {
    const id = nanoid()
    realm.write(() => {
      realm.create('User',{
        _uuid: id,
        username: username,
        password: password,
        date_joined: new Date()
      })
      setPassword('');
      setUserName('');
      setValidationMessage(null);
    });
    
    dispatch(setAuth({
      uuid: id,
      username: username,
      date_joined: Date.now(),
    }))
    dispatch(setIsLoggedIn(true))
  }

  return (
    <Container style={styles.container}>
      <Text>Register</Text>
      <InputField 
        label='Username :' 
        placeholder='Please enter your username'
        inputStyle={styles.inputField}
        onChangeText={(text) => setUserName(text)}
        value={username}
        isUserName={true}
      />
      <InputField 
        label='Password :'
        placeholder='Enter your password'
        isPassword={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
        onBlur={validateStates}
      />
      <InputField 
        label='Confirm Password :'
        placeholder='Please Re-enter your password'
        isPassword={true}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        onBlur={validateStates}
      />
      <Text style={styles.errorMsg}>{validationMessage}</Text>
      <Btn label='Submit' btnStyle={styles.btn}
        isDisabled={isDisabled}
        callback={submit}
      />
      <AuthLink 
        label='Already have an account?' 
        linkText='Sign In'
        link='LogIn'
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputField: {
    width: '100%'
  },
  errorMsg: {
    marginBottom: 20,
    color: 'red',
    fontWeight: '600'
  },
  btn: {
    position: 'absolute',
    bottom: -200,
    alignSelf: 'center'
  }
})