import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';

const LoginStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    </LoginStack.Navigator>
  )
}
export default AuthStackNavigator;
