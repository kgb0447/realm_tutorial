import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/main/Home';
import CompletedTask from '../../screens/main/CompletedTask';
import Profile from '../../screens/profile/Profile';
import ProfileIcon from '../../assets/img/icons/Profile.png'
import CompleteIcon from '../../assets/img/icons/TickSquare.png'
import HomeIcon from '../../assets/img/icons/Home.png'
import { Image } from 'react-native';
import { addSpaceBetweenCaps } from '../../utils/helpers';
import { COMPLETED_TASK_SCREEN, HOME_SCREEN, MY_PROFILE_SCREEN } from '../../constants/routes';
export default function HomeTabs() {
    const Tab = createBottomTabNavigator();
    const routes = [
      {
        id: 2,
        name: HOME_SCREEN,
        component: Home,
        icons: HomeIcon
      },
      {
        id: 1,
        name: COMPLETED_TASK_SCREEN,
        component: CompletedTask,
        icons: CompleteIcon
      },
      {
        id: 3,
        name: MY_PROFILE_SCREEN,
        component: Profile,
        icons: ProfileIcon
      }
    ]
  return (
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerTitleAlign: 'center',
    }}
    >
        {
          routes.sort((a ,b) => a.id - b.id).map((item,index) => (
            <Tab.Screen 
              key={item.name + index}
              name={item.name}
              component={item.component}  
              options={{
                tabBarIcon: () => <Image source={item.icons} size={22}/>,
                title: addSpaceBetweenCaps(item.name)
              }}
            />
          ))
        }
    </Tab.Navigator>
  )
}