import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/main/Home';
import CompletedTask from '../../screens/main/CompletedTask';
import { useNavigation } from '@react-navigation/native';
import Profile from '../../screens/profile/Profile';

export default function HomeTabs() {
    const Tab = createBottomTabNavigator();
    const routes = [
      {
        id: 2,
        name: 'Home',
        component: Home
      },
      {
        id: 1,
        name: 'CompletedTask',
        component: CompletedTask
      },
      {
        id: 3,
        name: 'My Profile',
        component: Profile,
      }
    ]
  return (
    <Tab.Navigator
    >
        {
          routes.sort((a ,b) => a.id - b.id).map((item,index) => (
            <Tab.Screen 
              key={item.name + index}
              name={item.name}
              component={item.component}  
              options={item?.options}
              
            />
          ))
        }
    </Tab.Navigator>
  )
}