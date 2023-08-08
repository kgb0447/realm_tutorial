
import { Provider } from 'react-redux'
import { TodoRealmContext } from './src/realm/config/TodoConfig'
import Main from './src/Main'
import store from './src/store/store'
import { useEffect } from 'react';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Alert } from 'react-native';


export default function App() {
  const { RealmProvider } = TodoRealmContext;
  useEffect(() => {
    (async() => {
      request(PERMISSIONS.IOS.CAMERA).then((results) => {
        Alert.alert(results)
      })
    })()
  } ,[])
  return (
    <Provider store={store}>
      <RealmProvider>
        <Main/>
      </RealmProvider>
    </Provider>    
  )
}