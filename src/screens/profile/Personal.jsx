import { View, Text, PermissionsAndroid, Button } from 'react-native'
import React, { useEffect } from 'react'
// import * as RNPermissions from 'react-native-permissions'

export default function Personal() {
  return (
    <View>
      <Text>Personal</Text>
      <Button title='Test' onPress={requestCameraPermission}/>
    </View>
  )
}