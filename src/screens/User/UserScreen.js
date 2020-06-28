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
import { View, Text, StyleSheet } from 'react-native';
import UserProfileNavigation from '../../navigation/UserProfileNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Connect Redux
import { connect } from 'react-redux';

//Components
import BottomButtons from '../../components/Button/BottomButtons';
import ModalDialog from '../../components/Modal/ModalDialog';

//Utilities
import { theme } from '../../core/theme';
import { UserContext } from '../../context/';

//Assets
const userImg = require('../../assets/user.png');

class UserScreen extends Component {
   state = {
      modalVisible: {
         visible: false,
         typeOfRegister: '',
      },
   };

   handleModalOpen = (regisType) => {
      this.setState({
         modalVisible: { visible: true, typeOfRegister: regisType },
      });
   };
   onClose = () => {
      this.setState({
         modalVisible: { visible: false, typeOfRegister: '' },
      });
   };

   btns = [
      {
         title: 'Salida',
         action: () => this.handleModalOpen('Salida'),
      },
      {
         title: 'Ingreso',
         action: () => this.handleModalOpen('Ingreso'),
      },
   ];

   render() {
      const {
         id,
         name,
         testResult,
         documentType,
         phone,
         address,
         city,
      } = this.props.data;

      const userData = {
         cedula: id,
         nombre: name,
         prueba: testResult,
         tipoDoc: documentType,
         celular: phone,
         direccion: address,
         ciudad: city,
      };

      return (
         <View style={styles.container}>
            <ModalDialog
               showModal={this.state.modalVisible}
               onClose={this.onClose}
            />
            <View style={styles.userInfo}>
               <Icon name="account-circle-outline" style={styles.icon} />
               <View>
                  <Text style={styles.h1}>{name}</Text>
                  <Text style={styles.h3}>{testResult}</Text>
               </View>
            </View>
            <UserContext.Provider value={userData}>
               <UserProfileNavigation />
            </UserContext.Provider>
            <BottomButtons btns={this.btns} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.grey,
      paddingTop: 0,
   },
   userInfo: {
      width: '100%',
      marginVertical: 30,
      alignItems: 'center',
   },
   icon: {
      textAlign: 'center',
      fontSize: 100,
      color: theme.colors.secondary,
   },
   h1: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
   },
   h3: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
   },
});

const mapStateToProps = (state) => {
   const { data } = state.search;
   return { data };
};
export default connect(mapStateToProps)(UserScreen);
