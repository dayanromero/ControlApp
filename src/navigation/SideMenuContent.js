/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

// Libreries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Drawer } from 'react-native-paper';

//Dependencies
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Connect redux
import { connect } from 'react-redux';

//Actions
import { logout } from '../screens/Login/actions';

//Utilities
import { theme } from '../core/theme';

class SideMenuContent extends Component {
   signOut() { this.props.clearDown() }
   
   render() {
      return (
         <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...this.props}>
               <View style={styles.drawerContent}>
                  <View style={styles.userInfoSection}>
                     <View
                        style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                           marginTop: 15,
                        }}>
                        <Icon
                           name="account-circle-outline"
                           style={styles.icon}
                        />
                        <Title style={styles.title}>Administrador</Title>
                     </View>
                  </View>

                  <Drawer.Section style={styles.drawerSection}>
                     <DrawerItem
                        labelStyle={{ fontSize: 16 }}
                        icon={() => (
                           <Icon
                              name="home"
                              color={theme.colors.grey}
                              size={30}
                           />
                        )}
                        label="Inicio"
                        onPress={() => {
                           this.props.navigation.navigate('inicio');
                        }}
                     />
                     <DrawerItem
                        labelStyle={{ fontSize: 16 }}
                        icon={() => (
                           <Icon
                              name="account-plus"
                              color={theme.colors.grey}
                              size={30}
                           />
                        )}
                        label="Crear Usuario"
                        onPress={() => {
                           this.props.navigation.navigate('crearCiudadano');
                        }}
                     />
                     <DrawerItem
                        labelStyle={{ fontSize: 16 }}
                        icon={() => (
                           <Icon
                              name="map-marker"
                              color={theme.colors.grey}
                              size={30}
                           />
                        )}
                        label="Puestos de control"
                        onPress={() => {
                           this.props.navigation.navigate('zonas');
                        }}
                     />
                  </Drawer.Section>
               </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
               <DrawerItem
                  icon={({ color, size }) => (
                     <Icon name="logout-variant" color={color} size={30} />
                  )}
                  label="Salir"
                  onPress={() => this.signOut()}
               />
            </Drawer.Section>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   drawerContent: {
      flex: 1,
   },
   userInfoSection: {
      paddingLeft: 20,
      backgroundColor: theme.colors.primary,
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
   },
   drawerSection: {
      marginTop: 15,
   },
   bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1,
   },
   icon: {
      textAlign: 'center',
      fontSize: 80,
      fontWeight: '100',
      color: theme.colors.secondary,
   },
});

const mapStateToProps = (state) => {
   const { accessToken, loading } = state.login;
   return { accessToken, loading };
};

const mapDispatchToProps = (dispatch) => {
   return {
      clearDown: () => {
         return dispatch(logout());
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContent);
