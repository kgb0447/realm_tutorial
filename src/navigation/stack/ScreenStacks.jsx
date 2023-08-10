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

export default function ScreenStacks() {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
        const route = [
            {
                name: 'AddTodo',
                component: AddTodo,
            },
            {
                name: 'EditTodo',
                component: EditTodo
            },
            {
                name: 'ViewTodo',
                component: ViewTodo
            },
            {
                name: 'About',
                component:About
            },
            {
                name: 'Personal Info',
                component: Personal
            },
            {
                name: 'Setting',
                component: Preferences
            },
            {
                name: 'Add Todo',
                component: AddTodo,
                showHeader: true
            },
            {
                name: 'Tabs',
                component: HomeTabs,
                options: {
                    headerShown: false
                }
            }
            
        ]
    return (
        <Stack.Navigator
            initialRouteName='Tabs'
            screenOptions={{
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
                        // options={{
                        //     title: item.name.replace(/([A-Z])/g, ' $1').trim(),
                        //     tabBarStyle: {
                        //         display: 'none'
                        //     }
                        // }}
                        options={item.options}
                    />
                ))
            }
        </Stack.Navigator>
  )
}