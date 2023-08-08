import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Preferences from '../../screens/profile/Preferences';
import About from '../../screens/profile/About';
import Personal from '../../screens/profile/Personal';
import Profile from '../../screens/profile/Profile';

export default function UserPreferences() {
    const Stack = createStackNavigator();
    const items = [
        {
            name: 'My Profile',
            component: Profile,
            options: {
                tabBarStyle: {display: 'none'}
            }
        },
        {
            name: 'Setting',
            component: Preferences,
            options: {
                // tabBarStyle: {display: 'none'}
            }
        },
        {
            name: 'About',
            component: About
        },
        {
            name: 'Personal Info',
            component: Personal
        }
    ]
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        {
            items.map((item,index) => (
                <Stack.Screen name={item.name} component={item.component} key={item.name + index}/>
            ))
        }
    </Stack.Navigator>
  )
}