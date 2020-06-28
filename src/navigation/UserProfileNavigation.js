import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserInfo from '../screens/User/UserInfo';
import UserActivity from '../screens/User/UserActivity';
import { theme } from '../core/theme';

const Tab = createMaterialTopTabNavigator();

const UserProfileNavigation = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'grey',
                tabStyle: { height: 60 },
                style: { backgroundColor: theme.colors.primary },
                labelStyle: { fontSize: 18, fontWeight: 'bold' },
            }}>
            <Tab.Screen
                name="UserInfo"
                component={UserInfo}
                options={{ title: 'Informacion' }}
            />
            <Tab.Screen
                name="UserActivity"
                component={UserActivity}
                options={{ title: 'Actividad' }}
            />
        </Tab.Navigator>
    );
};
export default UserProfileNavigation;
