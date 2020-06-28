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
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';

//Connect redux
import {connect} from 'react-redux';

//Actions
import {authenticateUser, resetValues} from './actions';

// Components
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import InputSelect from '../../components/Input/InputSelect';
import TextButton from '../../components/Button/TextButton';
import InputText from '../../components/Input/InputText';
import ShowAlert from '../../components/Alert/Alert';

// Utilities
import {theme} from '../../core/theme';
import {emailValidator, passwordValidator} from '../../core/utils';
import {cities, validationSchema, optionsId} from '../../config/default';

class SignUpScreen extends Component {
  state = {
    name: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  };

  setName = (text) => {
    this.setState({
      name: {value: text, error: ''},
    });
  };

  setEmail = (text) => {
    this.setState({
      email: {value: text, error: ''},
    });
  };

  setPassword = (text) => {
    this.setState({
      password: {value: text, error: ''},
    });
  };

  hideAlert = () => this.props.setError();
  signIn = () => this.props.navigation.goBack('LoginScreen');

  _onLoginPressed = () => {
    const {name, email, password} = this.state;
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      this.setState({
        name: {...email, error: nameError},
        email: {...email, error: emailError},
        password: {...password, error: passwordError},
      });
      return;
    }

    let fullname = name.value;
    let username = email.value;
    let pass = password.value;

    this.props.loginUser(fullname, username, pass);
  };

  initialValues = {
    userType: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    stablishment: '',
    city: '',
    state: '',
    address: '',
    id: '',
  };

  render() {
    const {email, password} = this.state;
    const {loading, error} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Heading
            icon="account-circle-outline"
            title="Control App"
            subTitle="Por favor proveea la informacion a continuacion para registrarse."
          />

          <KeyboardAvoidingView>
            <>
              <Formik
                initialValues={{
                  ...this.initialValues,
                  address: this.state.address,
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
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
                    <InputSelect
                      items={optionsId}
                      value={this.state.documentType}
                      onPress={handleChange('documentType')}
                      onChangeText={this.handleState}
                      placeholder={'Tipo de documento'}
                      onBlur={handleBlur}
                      value={values.documentType}
                      errorText={touched.documentType && errors.documentType}
                    />
                    <InputText
                      label="Nombre"
                      returnKeyType="next"
                      placeholder={'Nombre'}
                      keyboardType={'default'}
                      onChangeText={(text) => this.setName(text)}
                      error={!!email.error}
                      errorText={email.error}
                      autoCapitalize="none"
                    />
                    <InputText
                      label="Correo electronico"
                      returnKeyType="next"
                      placeholder={'Correo electronico'}
                      keyboardType={'email-address'}
                      onChangeText={(text) => this.setEmail(text)}
                      error={!!email.error}
                      errorText={email.error}
                      autoCapitalize="none"
                      autoCompleteType="email"
                      textContentType="emailAddress"
                    />
                    <InputText
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
                      label="Contraseña"
                      returnKeyType="done"
                      placeholder={'Contraseña'}
                      value={password.value}
                      onChangeText={(text) => this.setPassword(text)}
                      error={!!password.error}
                      errorText={password.error}
                      secureTextEntry
                    />
                    <InputText
                      label="Nombre del establecimiento"
                      returnKeyType="next"
                      placeholder={'Nombre del establecimiento'}
                      keyboardType={'default'}
                      onChangeText={(text) => this.setName(text)}
                      error={!!email.error}
                      errorText={email.error}
                      autoCapitalize="none"
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
                    <InputText
                      onTouchStart={this.showContent}
                      returnKeyType="next"
                      placeholder={'Direccion'}
                      keyboardType={'default'}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      autoCapitalize="none"
                      value={values.address}
                      errorText={touched.address && errors.address}
                    />
                    <Button
                      title={'Registrarme'}
                      style={styles.btnLogin}
                      onPress={() => console.log('Registrarme')}
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
              onPress={this.signIn}
            />
          </View>
        </ScrollView>
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
});

const mapStateToProps = (state) => {
  const {loading, error} = state.login;
  return {loading, error};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => {
      return dispatch(authenticateUser(username, password));
    },
    setError: () => {
      return dispatch(resetValues());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
