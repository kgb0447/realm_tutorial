import { View, Text, Button, Modal, Alert, StyleSheet, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TodoRealmContext } from '../../realm/config/TodoConfig';
import { User } from '../../realm/db/User';
import { setAuth } from '../../store/reducers/AuthReducerSlice';
import ProfileItems from '../../components/shared/ProfileItems';
import Edit from '../../assets/img/icons/Edit.png'
import InputField from '../../components/shared/InputField';
import Btn from '../../components/shared/Btn';
import Profile from '../../assets/img/icons/Profile.png'
import { getParsedDate } from '../../utils/helpers';

export default function Personal() {
  const { useRealm, useObject} = TodoRealmContext;
  const dispatch = useDispatch();
  const realm = useRealm();
  const user = useSelector(state => state.AuthReducerSlice);
  const item = useObject(User,user.uuid)
  const [itemToUpdate,setItemToUpdate] = useState(null);
  const [isShow,setIsShow] = useState(false);
  const [inputValue,setInputValue] = useState(null);

  const setItem = (prop,val) => {
    // Updates an item depending on the property and resets the state after the update
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
      <View style={styles.avatarWrapper}>
        <Image source={Profile} style={styles.avatar}/>
      </View>
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
        item={getParsedDate(user.date_joined)}
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
  },
  avatarWrapper: {
    alignSelf: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 90,
    height: 90,
  }
})