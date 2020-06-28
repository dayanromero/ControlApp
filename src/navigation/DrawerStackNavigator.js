import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Navication
import MainStackNavigator from './MainStackNavigator';
import SideMenuContent from './SideMenuContent';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const DrawerStackNavigator = () => {
   return (
      <Drawer.Navigator
         initialRouteName="Inicio"
         drawerContent={(props) => <SideMenuContent {...props} />}>
         <Drawer.Screen name="inicio" component={MainStackNavigator} />
         {/* <Drawer.Screen name="bottom" component={BottomTabNavigator} /> */}
         
      </Drawer.Navigator>
   );
};

export default DrawerStackNavigator;
