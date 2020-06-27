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
import React, { Component, useContext } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Connect redux
import { connect } from 'react-redux';

//Actions
import { authenticateUser, resetValues } from './actions';

// Components
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import TextButton from '../../components/Button/TextButton';
import AuthContainer from '../../components/AuthContainer';
import InputText from '../../components/Input/InputText';
import ShowAlert from '../../components/Alert/Alert';

// Utilities
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';

class LoginScreen extends Component {
   state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
   };

   setEmail = (text) => {
      this.setState({
         email: { value: text, error: '' },
      });
   };

   setPassword = (text) => {
      this.setState({
         password: { value: text, error: '' },
      });
   };

   hideAlert = () => this.props.setError();

   _onLoginPressed = () => {
      const { email, password } = this.state;
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError) {
         this.setState({
            email: { ...email, error: emailError },
            password: { ...password, error: passwordError },
         });
         return;
      }

      let username = email.value;
      let pass = password.value;

      this.props.loginUser(username, pass);
   };

   render() {
      const { email, password } = this.state;
      const { loading, error } = this.props;

      return (
         <AuthContainer>
            {error ? (
               <ShowAlert
                  msg={'Correo electronico y/o contraseña incorrecta.'}
                  setE={this.hideAlert}
               />
            ) : null}
            <Icon name="account-circle-outline" style={styles.icon} />
            <Heading style={styles.title}>Villarrica App Login</Heading>
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
               keyboardType="email-address"
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
               title={'Login'}
               style={styles.loginButton}
               onPress={this._onLoginPressed}
               loading={loading}
            />
            <TextButton title={'Olvide mi contraseña'} />
         </AuthContainer>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      padding: 20,
      paddingTop: 120,
      alignItems: 'center',
   },
   title: {
      marginBottom: 14,
      color: theme.colors.primary,
   },
   input: {
      fontSize: 16,
   },
   loginButton: {
      marginVertical: 8,
   },
   label: {
      color: theme.colors.secondary,
   },
   icon: {
      width: 120,
      height: 120,
      textAlign: 'center',
      fontSize: 120,
      color: theme.colors.secondary,
   },
});

const mapStateToProps = (state) => {
   const { loading, error } = state.login;
   return { loading, error };
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
