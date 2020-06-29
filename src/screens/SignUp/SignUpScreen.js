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
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';

//Connect redux
import {connect} from 'react-redux';

//Redux Actions
import {saveNewEstablishment, resetEstablishmentValues} from './actions/';

// Components
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import InputSelect from '../../components/Input/InputSelect';
import TextButton from '../../components/Button/TextButton';
import InputText from '../../components/Input/InputText';
import SlideMap from '../../components/SlideUp/SlideMap';
import Loading from '../../components/Loading/Loading';
import ShowAlert from '../../components/Alert/Alert';

// Utilities
import {theme} from '../../core/theme';
import {
  cities,
  validationNewUser,
  establishmentType,
  departments,
} from '../../config/default';

class SignUpScreen extends Component {
  state = {
    establishmentType: '',
    city: '',
    state: '',
    showMap: false,
    address: '',
    coordinates: '',
  };

  setAddress = (params) => {
    const {
      response,
      location: {lat, lon},
    } = params;
    this.setState({
      address: response,
      coordinates: `${lat}, ${lon}`,
    });
  };

  showContent = () => this.setState({showMap: !this.state.showMap});
  signIn = () => this.props.navigation.goBack('LoginScreen');
  hideAlert = () => this.props.setError();

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
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    establishmentType: '',
    establishment: '',
    city: '',
    state: '',
    address: '',
  };

  render() {
    const {loading, registro, error} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.alertCreation(registro, error)}
        {loading ? (
          <Loading />
        ) : (
          <ScrollView>
            <Heading
              icon="account-circle-outline"
              title="Registro"
              subTitle="Por favor proveea la información a continuación para registrar su establecimiento comercial."
            />

            <KeyboardAvoidingView>
              <>
                <Formik
                  initialValues={{
                    ...this.initialValues,
                    address: this.state.address,
                  }}
                  enableReinitialize
                  validationSchema={validationNewUser}
                  onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    this.props.signUpEstablishment({
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
                      <Text style={styles.descriptionText}>
                        Información del establecimiento
                      </Text>
                      <InputText
                        label="Dirección"
                        onTouchStart={this.showContent}
                        returnKeyType="next"
                        placeholder={'Dirección'}
                        keyboardType={'default'}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        autoCapitalize="none"
                        value={values.address}
                        errorText={touched.address && errors.address}
                      />
                      <InputSelect
                        items={establishmentType}
                        value={this.state.establishmentType}
                        onPress={handleChange('establishmentType')}
                        placeholder={'Tipo de establecimiento'}
                        onBlur={handleBlur('establishmentType')}
                        value={values.establishmentType}
                        errorText={
                          touched.establishmentType && errors.establishmentType
                        }
                      />
                      <InputText
                        label="Nombre del establecimiento"
                        returnKeyType="next"
                        placeholder={'Nombre del establecimiento'}
                        keyboardType={'default'}
                        onChangeText={handleChange('establishment')}
                        onBlur={handleBlur('establishment')}
                        value={values.establishment}
                        errorText={
                          touched.establishment && errors.establishment
                        }
                      />
                      <InputSelect
                        items={cities}
                        value={this.state.city}
                        onPress={handleChange('city')}
                        placeholder={'Ciudad'}
                        onBlur={handleBlur('city')}
                        value={values.city}
                        errorText={touched.city && errors.city}
                      />
                      <InputSelect
                        items={departments}
                        value={this.state.state}
                        onPress={handleChange('state')}
                        placeholder={'Departamento'}
                        onBlur={handleChange('state')}
                        value={values.state}
                        errorText={touched.state && errors.state}
                      />
                      <Text style={styles.descriptionText}>
                        Información personal (Propietario)
                      </Text>
                      <InputText
                        label="Nombre completo"
                        returnKeyType="next"
                        placeholder={'Nombre completo'}
                        keyboardType={'default'}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        autoCapitalize="none"
                        value={values.name}
                        errorText={touched.name && errors.name}
                      />
                      <InputText
                        label="Teléfono"
                        returnKeyType="next"
                        placeholder={'Teléfono'}
                        keyboardType={'phone-pad'}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        autoCapitalize="none"
                        value={values.phone}
                        errorText={touched.phone && errors.phone}
                      />
                      <InputText
                        label="Correo electrónico"
                        returnKeyType="next"
                        placeholder={'Correo electrónico'}
                        keyboardType={'email-address'}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        autoCapitalize="none"
                        value={values.email}
                        errorText={touched.email && errors.email}
                      />
                      <InputText
                        label="Contraseña"
                        returnKeyType="next"
                        placeholder={'Contraseña'}
                        keyboardType={'default'}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={values.password}
                        errorText={touched.password && errors.password}
                      />
                      <InputText
                        label="Confirmar contraseña"
                        returnKeyType="next"
                        placeholder={'Confirmar contraseña'}
                        keyboardType={'default'}
                        onChangeText={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={values.confirm_password}
                        errorText={
                          touched.confirm_password && errors.confirm_password
                        }
                      />
                      <Button
                        title={'Registrar'}
                        style={styles.btnLogin}
                        onPress={handleSubmit}
                        loading={loading}
                      />
                    </View>
                  )}
                </Formik>
              </>
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
              <TextButton
                title={'Ingresar'}
                style={styles.btnSignUp}
                onPress={this.createAuth0User}
              />
            </View>
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
    margin: 20,
  },
  btnLogin: {
    marginVertical: 8,
  },
  btnSignUp: {
    color: theme.colors.primary,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? 10 : 2,
  },
  descriptionText: {
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
});

const mapStateToProps = (state) => {
  const {data, loading, error, registro} = state.createEstablishment;
  return {data, loading, error, registro};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpEstablishment: (data) => {
      return dispatch(saveNewEstablishment(data));
    },
    setError: () => {
      return dispatch(resetEstablishmentValues());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
