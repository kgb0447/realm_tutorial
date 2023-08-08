import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';

export default function AuthStack() {
    const Stack = createStackNavigator();
    const routes = [
        {
            name: 'LogIn',
            component: Login
        },
        {
            name: 'Register',
            component: Register
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
                />
            ))
        }
    </Stack.Navigator>
  )
}