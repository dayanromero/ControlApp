/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

// Dependencies
import React, { Component } from 'react';

//Connect redux
import { connect } from 'react-redux';

//Actions
import { getToken, cleanToken } from './screens/Login/actions/';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import AuthStackNavigator from './navigation/AuthStackNavigator';
import DrawerStackNavigator from './navigation/DrawerStackNavigator';
import Loading from './components/Loading/Loading';

const RootStack = createStackNavigator();

class App extends Component {
   componentDidMount() {
      this.props.validateToken();
   }
   
   logOut() {
      this.props.clearDown();
   }

   renderScreens() {
      const { accessToken, loading } = this.props;
      if (loading) {
         return <RootStack.Screen name={'Loading'} component={Loading} />;
      } else if (accessToken) {
         return <RootStack.Screen name={'MainStack'} component={DrawerStackNavigator} />;
      } else {
         return <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />;
      }
   }

   render() {
      return (
         <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
               {this.renderScreens()}
            </RootStack.Navigator>
         </NavigationContainer>
      );
   }
}

const mapStateToProps = (state) => {
   const { accessToken, loading } = state.login;
   return { accessToken, loading };
};

const mapDispatchToProps = (dispatch) => {
   return {
      validateToken: () => {
         return dispatch(getToken());
      },
      clearDown: () => {
         return dispatch(cleanToken());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
