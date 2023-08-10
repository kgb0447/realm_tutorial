
import { Provider } from 'react-redux'
import { TodoRealmContext } from './src/realm/config/TodoConfig'
import Main from './src/Main'
import store from './src/store/store'
import { useEffect } from 'react';
import { Alert } from 'react-native';


export default function App() {
  const { RealmProvider } = TodoRealmContext;
  return (
    <Provider store={store}>
      <RealmProvider>
        <Main/>
      </RealmProvider>
    </Provider>    
  )
}