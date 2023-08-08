import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Appearance, useColorScheme } from 'react-native'
import React from 'react'
import Container from '../../components/layout/Container'
import Setting from '../../assets/img/icons/Setting.png'
import Logout from '../../assets/img/icons/Logout.png'
import InfoCircle from '../../assets/img/icons/InfoCircle.png'
import ProfileIcon from '../../assets/img/icons/Profile.png'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../../store/reducers/AuthReducerSlice'

export default function Profile() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useColorScheme()

  const handlePress = (val) => {
    if(val.id === 4) {
      dispatch(setIsLoggedIn(false))
    } else {
      navigation.navigate(val.name)
    }
  }

  const items = [
    {
      id: 2,
      name: 'Setting',
      icon: Setting
    },
    {
      id: 3,
      name: 'About',
      icon: InfoCircle
    },
    {
      id: 1,
      name: 'Personal Info',
      icon: ProfileIcon
    },
    {
      id: 4,
      name: 'Log Out',
      icon: Logout
    }
  ]
  
  return (
    <Container>
      <View style={[styles.listWrapper,{width: width}]}>
        {
          items.sort((a,b) => a.id - b.id).map((item) => (
            <TouchableOpacity key={item.id}
              style={styles.itemWrapper}
              onPress={() => handlePress(item)}
            >
              <Image style={styles.itemIcon} source={item.icon}/>
              <Text style={[styles.itemLabel, {
                color: theme === 'dark' ? '#fff' : '#000'
              }]}>{item.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemWrapper: {
    flexDirection: 'row',
    height: 40,
    borderWidth: 0.5,
    alignItems: 'center',
    width: '100%'
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10
  },
  itemLabel: {
    fontSize: 20,
    fontWeight: '500',
  }
})