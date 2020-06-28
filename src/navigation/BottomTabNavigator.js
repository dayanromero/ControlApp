/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

//Libreries
import * as React from 'react';

//Depen dencies
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Screens
//import DashboardMap from '../screens/Dashboard/DashboardMap';
import Statistics from '../screens/Statistics/Statistics';
import MainStackNavigator from '../navigation/MainStackNavigator';

//Utilities
import { theme } from '../core/theme';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => (
    <Tab.Navigator
        initialRouteName='Inicio'
        activeColor='white'
        activeBackgroundColor= {theme.colors.primary}
    >
        <Tab.Screen
            name='Inicio'
            component={MainStackNavigator}
            options={{
                tabBarLabel: 'Inicio',
                tabBarColor: theme.colors.primary,
                tabBarIcon: () => <Icon name="home" color='white' size={25} />
            }}
        />
        <Tab.Screen
            name='Estadisticas'
            component={Statistics}
            screenOptions={{
                headerShown: true,
            }}
            options={{
                tabBarLabel: 'Estadisticas',
                tabBarColor: theme.colors.primary,
                tabBarIcon: () => <Icon name="poll" color='white' size={25} />
            }}
        />
        
    </Tab.Navigator>
)

export default BottomTabNavigator;