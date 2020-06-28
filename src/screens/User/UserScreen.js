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
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import UserProfileNavigation from '../../navigation/UserProfileNavigation';

//Connect Redux
import {connect} from 'react-redux';

//Components
import Heading from '../../components/Heading/Heading';
import BottomButtons from '../../components/Button/BottomButtons';
import ModalDialog from '../../components/Modal/ModalDialog';

//Utilities
import {UserContext} from '../../context/';

class UserScreen extends Component {
  state = {
    modalVisible: {
      visible: false,
      typeOfRegister: '',
    },
  };

  handleModalOpen = (regisType) => {
    this.setState({
      modalVisible: {visible: true, typeOfRegister: regisType},
    });
  };
  onClose = () => {
    this.setState({
      modalVisible: {visible: false, typeOfRegister: ''},
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
          <Heading
            icon="account-circle-outline"
            title={name}
            subTitle={testResult}
          />
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
  },
  userInfo: {
    width: '100%',
    height: 165,
    marginVertical: 30,
  },
});

const mapStateToProps = (state) => {
  const {data} = state.search;
  return {data};
};
export default connect(mapStateToProps)(UserScreen);
