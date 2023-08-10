import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from '../../constants/routes';

export default function AuthStack() {
    const Stack = createStackNavigator();
    const routes = [
        {
            name: SIGN_IN_SCREEN,
            component: Login,
            options: {
                headerStyle: {
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 24
                }
            }
        },
        {
            name: SIGN_UP_SCREEN,
            component: Register,
            options: {
                headerLeft: () => null,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 24
                }
            }
        }
    ]
  return (
    <Stack.Navigator>
        {
            routes.map((item,index) => (
                <Stack.Screen 
                    key={item.name + index} 
                    name={item.name} 
                    component={item.component}
                    options={item?.options}
                />
            ))
        }
    </Stack.Navigator>
  )
}