import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Personal from '../../screens/profile/Personal';
import Preferences from '../../screens/profile/Preferences';
import About from '../../screens/profile/About';
import Profile from '../../screens/profile/Profile';
import UserPreferences from './UserPreferences';

export default function ProfileStack() {
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
            name: 'Personal Info',
            component: UserPreferences,
            options: {
                tabBarStyle: {display: 'none'}
            }
        }
    ]
  return (
    <Stack.Navigator screenOptions={{headerShown: true,tabBarStyle: {
        display: 'none'
    }}}>
        {
            items.map((item) => (
                <Stack.Screen key={item.name} name={item.name} component={item.component} options={item.options}/>
            ))
        }
    </Stack.Navigator>
  )
}