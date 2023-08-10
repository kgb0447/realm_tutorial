import { View, Text, Button, Modal, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileItems from '../../components/shared/ProfileItems';
import Edit from '../../assets/img/icons/Edit.png'
import InputField from '../../components/shared/InputField';
import { TodoRealmContext } from '../../realm/config/TodoConfig';
import { User } from '../../realm/db/User';
import Btn from '../../components/shared/Btn';
import { setAuth } from '../../store/reducers/AuthReducerSlice';
export default function Personal() {
  const dispatch = useDispatch();
  const { useRealm, useObject} = TodoRealmContext;
  const realm = useRealm();
  const user = useSelector(state => state.AuthReducerSlice);
  const item = useObject(User,user.uuid)
  const [itemToUpdate,setItemToUpdate] = useState(null);
  const [isShow,setIsShow] = useState(false);
  const [inputValue,setInputValue] = useState(null);

  const setItem = (prop,val) => {
    try {
      realm.write(() => {
        item[prop] = val
      });
    } catch(err) {
      Alert.alert("Oops!!", err)
    }
    setInputValue(null);
    setItemToUpdate(null);
  }

  useEffect(() => {
    dispatch(setAuth(
      {
        uuid: item._uuid,
        username: item.username,
        name: item.name,
        date_joined: item.date_joined.toString()
      }
    ))
  },[isShow])
  return (
    <View>
      <ProfileItems 
        item={user.username} 
        icon={Edit} 
        label={"Username"}  
        callback={() => {
          setIsShow(true)
          setItemToUpdate('Username'.toLowerCase())
        }}
      />
      <ProfileItems 
        item={user.name} 
        icon={Edit} 
        label={"Name"} 
        callback={() => {
          setIsShow(true);
          setItemToUpdate('name'.toLowerCase());
        }} 
      />
      <ProfileItems 
        item={user.date_joined.toString() || ''}
        label={"Date Joined"}  
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: 60
      }}
      />
      <Modal
        visible={isShow}
        animationType='slide'
      >
        <View style={styles.modal}>
          <InputField 
            placeholder={`Enter your new ${itemToUpdate}`} 
            onChangeText={(text) => setInputValue(text)}
            isUserName={true}
            value={inputValue}
          />
          <Btn 
            callback={() => {
              setItem(itemToUpdate,inputValue)
              setIsShow(false)
            }} 
            label={'Submit'}
            btnStyle={styles.submitBnt}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    height: '50%',
    width: '90%',
    marginTop: '45%',
    paddingHorizontal: 20,
    borderRadius: 16,
    borderColor: '#000',
    borderWidth: 0.5
  },
  submitBnt: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  }
})