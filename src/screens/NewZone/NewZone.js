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
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';

//Connect Redux
import { connect } from 'react-redux';

//Redux Actions
import { saveNewZone, resetZoneValues } from './actions';

//Components
import InputText from '../../components/Input/InputText';
import InputSelect from '../../components/Input/InputSelect';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import ShowAlert from '../../components/Alert/Alert';
import SlideMap from '../../components/SlideUp/SlideMap';

//Utilities
import { theme } from '../../core/theme';
import { cities, departments, validationZoneSchema } from '../../config/default';

class NewUserScreen extends Component {
   state = {
      city: '',
      state: '',
      showMap: false,
      address: '',
      coordinates: '',
   };

   setAddress = (params) => {
      const {
         response,
         location: { lat, lon },
      } = params;
      this.setState({
         address: response,
         coordinates: `${lat}, ${lon}`,
      });
   };

   handleCity = (text) => this.setState({ city: text });
   showContent = () => this.setState({ showMap: !this.state.showMap });
   handleDept = (text) => this.setState({ state: text });
   hideAlert = () => this.props.setError();
   userScreen = () => this.props.navigation.navigate('DashboardMap');

   alertCreation = (registro, error) => {
      if (registro) {
         return <ShowAlert msg={'Registro exitoso'} setE={this.hideAlert} />;
      } else if (error) {
         return (
            <ShowAlert
               msg={'Hubo un error, intente nuevamente.'}
               setE={this.hideAlert}
            />
         );
      }
      return null;
   };

   initialValues = {
      name: '',
      address: '',
      city: '',
      state: '',
   };

   render() {
      const { loading, registro, error } = this.props;
      console.log('Loading', loading, registro, error)
      return (
         <SafeAreaView style={styles.container}>
            {this.alertCreation(registro, error)}
            {loading ? (
               <Loading />
            ) : (
               <ScrollView style={styles.scrollView}>
                  <View>
                     <Icon name="map-marker" style={styles.icon} />
                     <Text style={styles.text}>
                        Por favor llegue los campos a continuacion para
                        registrar un nueva zona de registro.
                     </Text>
                  </View>
                  <KeyboardAvoidingView>
                     <>
                        <Formik
                           initialValues={{
                              ...this.initialValues,
                              address: this.state.address,
                           }}
                           enableReinitialize
                           validationSchema={validationZoneSchema}
                           onSubmit={(values, { setSubmitting, resetForm }) => {
                              setSubmitting(true);
                              this.props.saveNewZoneLocation({
                                 ...values,
                                 coordinates: this.state.coordinates,
                              });
                              resetForm({});
                              setSubmitting(false);
                           }}>
                           {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              touched,
                           }) => (
                              <View>
                                 <InputText
                                    style={styles.input}
                                    returnKeyType="next"
                                    placeholder={'Nombre de la zona'}
                                    keyboardType={'default'}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    autoCapitalize="none"
                                    value={values.name}
                                    errorText={touched.name && errors.name}
                                 />
                                 <InputText
                                    style={styles.input}
                                    onTouchStart={this.showContent}
                                    returnKeyType="next"
                                    placeholder={'Direccion'}
                                    keyboardType={'default'}
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    autoCapitalize="none"
                                    value={values.address}
                                    errorText={
                                       touched.address && errors.address
                                    }
                                 />
                                 <InputSelect
                                    items={cities}
                                    value={this.state.city}
                                    onPress={handleChange('city')}
                                    onChangeText={this.handleCity}
                                    placeholder={'Ciudad'}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    errorText={touched.city && errors.city}
                                 />
                                 <InputSelect
                                    items={departments}
                                    value={this.state.state}
                                    onPress={handleChange('state')}
                                    onChangeText={this.handleDept}
                                    placeholder={'Departamento'}
                                    onBlur={handleBlur}
                                    value={values.state}
                                    errorText={touched.state && errors.state}
                                 />
                                 <View style={styles.downButton}>
                                    <Button
                                       style={styles.button}
                                       title={'Cancelar'}
                                       onPress={this.userScreen}>
                                       {'Cancelar'}
                                    </Button>
                                    <Button
                                       style={styles.button}
                                       title={'Guardar'}
                                       onPress={handleSubmit}>
                                       {'Guardar'}
                                    </Button>
                                 </View>
                              </View>
                           )}
                        </Formik>
                     </>
                  </KeyboardAvoidingView>
               </ScrollView>
            )}
            <SlideMap
               slide={this.state.showMap}
               showContent={this.showContent}
               handleAddress={this.setAddress}
            />
         </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.grey,
   },
   scrollView: {
      padding: 16,
   },
   input: {
      fontSize: 16,
      borderColor: 'black',
   },
   text: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
   },
   icon: {
      textAlign: 'center',
      fontSize: 90,
      color: theme.colors.secondary,
      margin: 30,
   },
   downButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 60,
   },
   button: {
      width: '48%',
      marginVertical: 10,
   },
});

const mapStateToProps = (state) => {
   const { data, loading, error, registro } = state.createZone;
   return { data, loading, error, registro };
};

const mapDispatchToProps = (dispatch) => {
   return {
      saveNewZoneLocation: (data) => {
         return dispatch(saveNewZone(data));
      },
      setError: () => {
         return dispatch(resetZoneValues());
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserScreen);
