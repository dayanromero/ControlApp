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
import {StyleSheet, View, Platform} from 'react-native';

//Connect redux
import {connect} from 'react-redux';

//Actions
import {authenticateUser, resetValues} from './actions';

// Components
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import TextButton from '../../components/Button/TextButton';
import AuthContainer from '../../components/AuthContainer';
import InputText from '../../components/Input/InputText';
import ShowAlert from '../../components/Alert/Alert';

// Utilities
import {theme} from '../../core/theme';
import {emailValidator, passwordValidator} from '../../core/utils';

class LoginScreen extends Component {
  state = {
    email: {value: '', error: ''},
    password: {value: '', error: ''},
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
  signUp = () => this.props.navigation.navigate('SignUpScreen');

  _onLoginPressed = () => {
    const {email, password} = this.state;
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      this.setState({
        email: {...email, error: emailError},
        password: {...password, error: passwordError},
      });
      return;
    }

    let username = email.value;
    let pass = password.value;

    this.props.loginUser(username, pass);
  };

  render() {
    const {email, password} = this.state;
    const {loading, error} = this.props;

    return (
      <AuthContainer>
        {error ? (
          <ShowAlert
            msg={'Correo electronico y/o contraseña incorrecta.'}
            setE={this.hideAlert}
          />
        ) : null}
        <Heading
          icon='account-circle-outline'
          title='Ingresar'
         />
        <InputText
          style={styles.input}
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
          style={styles.input}
          label="Contraseña"
          returnKeyType="done"
          placeholder={'Contraseña'}
          value={password.value}
          onChangeText={(text) => this.setPassword(text)}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button
          title={'Ingresar'}
          style={styles.btnLogin}
          onPress={this._onLoginPressed}
          loading={loading}
        />
        <TextButton title={'Olvide mi contraseña'} />
        <View style={styles.buttonContainer}>
          <TextButton
            title={'Registrarme'}
            style={styles.btnSignUp}
            onPress={this.signUp}
          />
        </View>
      </AuthContainer>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
