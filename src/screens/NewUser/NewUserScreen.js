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
import { saveNewUser, resetValues } from './actions/';

//Components
import InputText from '../../components/Input/InputText';
import DatePicker from '../../components/DatePicker/DatePicker';
import InputSelect from '../../components/Input/InputSelect';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import ShowAlert from '../../components/Alert/Alert';
import SlideMap from '../../components/SlideUp/SlideMap';

//Utilities
import { theme } from '../../core/theme';
import {
   cities,
   departments,
   optionsId,
   optionsTest,
   validationSchema,
} from '../../config/default';

class NewUserScreen extends Component {
   state = {
      expeditionDate: '',
      documentType: '',
      testData: '',
      city: '',
      state: '',
      showMap: false,
      address: '',
      coordinates: '',
   };

   setAddress = (params) => {
      const { response, location: { lat, lon} } = params;
      this.setState({
         address: response,
         coordinates: `${lat}, ${lon}`,
      })
   }

   handleDatePicker = (dateP) => this.setState({ expeditionDate: dateP });
   showContent = () => this.setState({ showMap: !this.state.showMap });
   handleState = (text) => this.setState({ documentType: text });
   handleStateTest = (text) => this.setState({ testData: text });
   handleCity = (text) => this.setState({ city: text });
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
      city: '',
      state: '',
      documentType: '',
      id: '',
      expeditionDate: '',
      testResult: '',
      phone: '',
      email: '',
   };

   render() {
      const { loading, registro, error } = this.props;
      return (
         <SafeAreaView style={styles.container}>
            {this.alertCreation(registro, error)}
            {loading ? (
               <Loading />
            ) : (
               <ScrollView style={styles.scrollView}>
                  <View>
                     <Icon name="account-circle-outline" style={styles.icon} />
                     <Text style={styles.text}>
                        Por favor llegue los campos a continuacion para
                        registrar un ciudadano.
                     </Text>
                  </View>
                  <KeyboardAvoidingView>
                     <>
                        <Formik
                           initialValues={{...this.initialValues, address: this.state.address}}
                           enableReinitialize
                           validationSchema={validationSchema}
                           onSubmit={(values, { setSubmitting, resetForm }) => {
                              setSubmitting(true);
                              this.props.saveNewCiudadano({
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
                                    placeholder={'Nombres'}
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
                                 <InputSelect
                                    items={optionsId}
                                    value={this.state.documentType}
                                    onPress={handleChange('documentType')}
                                    onChangeText={this.handleState}
                                    placeholder={'Tipo de documento'}
                                    onBlur={handleBlur}
                                    value={values.documentType}
                                    errorText={
                                       touched.documentType &&
                                       errors.documentType
                                    }
                                 />
                                 <InputText
                                    style={styles.input}
                                    returnKeyType="next"
                                    placeholder={'Numero de documento'}
                                    keyboardType={'number-pad'}
                                    onChangeText={handleChange('id')}
                                    onBlur={handleBlur('id')}
                                    autoCapitalize="none"
                                    value={values.id}
                                    errorText={touched.id && errors.id}
                                 />
                                 <DatePicker
                                    onPress={handleChange('expeditionDate')}
                                    styles={styles.input}
                                    placeholder={'Fecha de expedicion'}
                                    onChangeText={this.handleDatePicker}
                                    onBlur={handleBlur('expeditionDate')}
                                    value={this.state.expeditionDate}
                                    errorText={
                                       touched.expeditionDate &&
                                       errors.expeditionDate
                                    }
                                 />
                                 <InputSelect
                                    items={optionsTest}
                                    value={this.state.testData}
                                    onPress={handleChange('testResult')}
                                    placeholder={'Prueba'}
                                    onChangeText={this.handleStateTest}
                                    onBlur={handleBlur('testResult')}
                                    value={values.testResult}
                                    errorText={
                                       touched.testResult && errors.testResult
                                    }
                                 />
                                 <InputText
                                    style={styles.input}
                                    returnKeyType="next"
                                    placeholder={'Telefono'}
                                    keyboardType={'phone-pad'}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    autoCapitalize="none"
                                    value={values.phone}
                                    errorText={touched.phone && errors.phone}
                                 />
                                 <InputText
                                    style={styles.input}
                                    returnKeyType="next"
                                    placeholder={'Correo electronico'}
                                    keyboardType={'email-address'}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    autoCapitalize="none"
                                    value={values.email}
                                    errorText={touched.email && errors.email}
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
      fontSize: 100,
      color: theme.colors.secondary,
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
   const { data, loading, error, registro } = state.createUser;
   return { data, loading, error, registro };
};

const mapDispatchToProps = (dispatch) => {
   return {
      saveNewCiudadano: (data) => {
         return dispatch(saveNewUser(data));
      },
      setError: () => {
         return dispatch(resetValues());
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserScreen);
