import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import DashboardMap from '../screens/Dashboard/DashboardMap';
import UserScreen from '../screens/User/UserScreen';
import NewUserScreen from '../screens/NewUser/NewUserScreen';
import NewZone from '../screens/NewZone/NewZone';
import ZoneScreen from '../screens/Zones/Zones';
import EditUserScreen from '../screens/UpdateUser/EditUserScreen';
import Statistics from '../screens/Statistics/Statistics';

//Utilities
import { theme } from '../core/theme';

const MainStack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
   return (
      <MainStack.Navigator>
         <MainStack.Screen
            name="DashboardMap"
            component={DashboardMap}
            options={{
               title: '',
               headerShown: false,
            }}
         />
         <MainStack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{
               title: 'Usuario',
               headerRight: () => (
                  <TouchableOpacity
                     name="menu"
                     size={30}
                     color={theme.colors.primary}
                     backgroundColor="white"
                     onPress={() => navigation.navigate('EditUserScreen')}>
                     <Text style={styles.edit}>Editar</Text>
                  </TouchableOpacity>
               ),
            }}
         />
         <MainStack.Screen
            name="EditUserScreen"
            component={EditUserScreen}
            options={{ title: 'Editar Usuario' }}
         />
         <MainStack.Screen
            name="crearCiudadano"
            component={NewUserScreen}
            options={{ title: 'Crear ciudadano' }}
         />
         <MainStack.Screen
            name="crearZona"
            component={NewZone}
            options={{title: 'Crear puesto de control' }}
         />
         <MainStack.Screen
            name="zonas"
            component={ZoneScreen}
            options={{ title: 'Puestos de control' }}
         />
         <MainStack.Screen
            name="statistics"
            component={Statistics}
            options={{ title: 'Estadisticas' }}
         />
      </MainStack.Navigator>
   );
};

const styles = StyleSheet.create({
   edit: {
      fontSize: 17,
      marginRight: 10,
      fontWeight: '500',
   },
});

export default MainStackNavigator;
