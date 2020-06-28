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
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Connect Redux
import { connect } from 'react-redux';

//Actions Redux
import { fetchDataLocations } from '../../store/actions/index';
import {
   fetchActivity,
   resetValues,
} from '../../components/Modal/actions/index';

//Components
import ShowAlert from '../../components/Alert/Alert';
import InputSelect from '../Input/InputSelect';
import Button from '../Button/Button';
import Loading from '../../components/Loading/Loading';

//Utilities
import { formatDate } from '../../core/utils';
import { theme } from '../../core/theme';

const date = new Date();

class ModalDialog extends Component {
   state = {
      location: '',
      locationId: null,
      placeholder: 'Seleccione Zona',
      warning: false,
      items: [],
   };

   componentDidMount() {
      this.props.getLocationById();
      this.props.setError();
   }

   _hideDialog = () => this.props.onClose();
   handleState = (locId, index) => {
      const locationId = this.props.data[index].id;
      this.setState({
         location: locId,
         locationId: locationId,
         warning: false,
      });
   };

   hideAlert = () => {
      this.props.setError();
      this.props.onClose();
   };

   handleCreate = () => {
      if (!this.state.location) {
         this.setState({ warning: true });
         return;
      }
      const data = {
         type: this.props.showModal.typeOfRegister,
         date: date,
         hour: date,
         userId: this.props.userData.id,
         locationId: this.state.locationId,
      };
      this.props.saveActivyById(data);
   };

   render() {
      const {
         showModal: { visible, typeOfRegister },
         userData,
         data,
         loading,
         activityLoading,
         activityData,
      } = this.props;

      const items = data ? data.map((item) => item.name) : null;

      return (
         <View>
            {activityData ? (
               <ShowAlert msg={'Registro exitoso'} setE={this.hideAlert} />
            ) : null}
            <Portal>
               <Dialog visible={visible} onDismiss={this._hideDialog}>
                  <TouchableOpacity onPress={this._hideDialog}>
                     <Icon name="close-circle" style={styles.icon} />
                  </TouchableOpacity>
                  <Dialog.Title style={styles.title}>
                     Registrar {typeOfRegister}
                  </Dialog.Title>
                  {userData ? (
                     <Dialog.Content>
                        <View style={styles.textContainer}>
                           <Text style={[styles.texts, styles.bold]}>
                              Nombre:
                           </Text>
                           <Text style={styles.texts}>{userData.name}</Text>
                        </View>
                        <Divider />
                        <View style={styles.textContainer}>
                           <Text style={[styles.texts, styles.bold]}>
                              Cedula:
                           </Text>
                           <Text style={styles.texts}>{userData.id}</Text>
                        </View>
                        <Divider />
                        <View style={styles.textContainer}>
                           <Text style={[styles.texts, styles.bold]}>
                              Fecha:
                           </Text>
                           <Text style={styles.texts}>
                              {formatDate(date, 'f')}
                           </Text>
                        </View>
                        <Divider />
                        <View style={styles.textContainer}>
                           <Text style={[styles.texts, styles.bold]}>
                              Hora:
                           </Text>
                           <Text style={styles.texts}>
                              {formatDate(date, 'h')}
                           </Text>
                        </View>
                        <Divider />
                        <View style={{ marginBottom: 20 }}>
                           {items ? (
                              <InputSelect
                                 items={items}
                                 value={this.state.location.toUpperCase()}
                                 placeholder={'Seleccione una zona'}
                                 onPress={this.handleState}
                              />
                           ) : (
                              <Text style={styles.notice}>
                                 {loading ? (
                                    <Text
                                       style={{
                                          color: theme.colors.secondary,
                                       }}>
                                       Cargando zonas
                                    </Text>
                                 ) : (
                                    <Text style={{ color: 'red' }}>
                                       No hay zonas disponibles
                                    </Text>
                                 )}
                              </Text>
                           )}
                           {this.state.warning ? (
                              <Text style={styles.warning}>
                                 Por favor seleccione una zona.
                              </Text>
                           ) : null}
                        </View>
                        <Button
                           title={'Registrar'}
                           style={styles.loginButton}
                           onPress={this.handleCreate}
                           loading={activityLoading}
                        />
                     </Dialog.Content>
                  ) : (
                     <Loading />
                  )}
               </Dialog>
            </Portal>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   texts: {
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
      textTransform: 'uppercase',
   },
   bold: {
      fontWeight: 'bold',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   loginButton: {
      marginVertical: 8,
   },
   notice: {
      marginTop: 30,
      textAlign: 'center',
      fontSize: 16,
   },
   icon: {
      alignSelf: 'flex-end',
      width: 30,
      height: 30,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 0,
      fontSize: 30,
      color: theme.colors.secondary,
   },
});

const mapStateToProps = (state) => {
   const { loading, data, error } = state.location;
   const { data: userData } = state.search;
   const {
      data: activityData,
      loading: activityLoading,
      error: activityError,
   } = state.createActivity;
   return {
      data,
      loading,
      error,
      userData,
      activityData,
      activityLoading,
      activityError,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getLocationById: () => {
         return dispatch(fetchDataLocations());
      },
      saveActivyById: (data) => {
         return dispatch(fetchActivity(data));
      },
      setError: () => {
         return dispatch(resetValues());
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialog);
