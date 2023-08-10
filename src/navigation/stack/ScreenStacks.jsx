import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddTodo from '../../screens/main/AddTodo';
import Home from '../../screens/main/Home';
import EditTodo from '../../screens/main/EditTodo';
import ViewTodo from '../../screens/main/ViewTodo';
import Preferences from '../../screens/profile/Preferences';
import About from '../../screens/profile/About';
import Personal from '../../screens/profile/Personal';
import HomeTabs from '../tabs/HomeTabs';
import { useNavigation } from '@react-navigation/native';
import { options } from 'yargs';
import { ABOUT_SCREEN, ADD_TODO_SCREEN, EDIT_TODO_SCREEN, PERSONAL_INFO_SCREEN, SETTING_SCREEN, TABS_SCREEN, VIEW_TODO_SCREEN } from '../../constants/routes';

export default function ScreenStacks() {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
        const route = [
            {
                name: ADD_TODO_SCREEN,
                component: AddTodo,
            },
            {
                name: EDIT_TODO_SCREEN,
                component: EditTodo
            },
            {
                name: VIEW_TODO_SCREEN,
                component: ViewTodo
            },
            {
                name: ABOUT_SCREEN,
                component:About
            },
            {
                name: PERSONAL_INFO_SCREEN,
                component: Personal
            },
            {
                name: SETTING_SCREEN,
                component: Preferences
            },
            {
                name: TABS_SCREEN,
                component: HomeTabs,
                options: {
                    headerShown: false
                }
            }
            
        ]
    return (
        <Stack.Navigator
            initialRouteName = { TABS_SCREEN }
            screenOptions = {{
                headerTitleAlign: 'center',
                headerShown: true,
            }}
        >
            {
                route.map((item,index) => (
                    <Stack.Screen 
                        name={item.name} 
                        component={item.component} 
                        key={item.name + index}
                        options={item.options}
                    />
                ))
            }
        </Stack.Navigator>
  )
}