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
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';

//Connect Redux
import {connect} from 'react-redux';

//Redux Actions
import {editNewUser, resetValues} from './actions';
import {searchDataSuccess} from '../Dashboard/actions';

//Components
import Heading from '../../components/Heading/Heading';
import InputText from '../../components/Input/InputText';
import DatePicker from '../../components/DatePicker/DatePicker';
import InputSelect from '../../components/Input/InputSelect';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import ShowAlert from '../../components/Alert/Alert';
import SlideMap from '../../components/SlideUp/SlideMap';

//Utilities
import {
  cities,
  departments,
  optionsId,
  optionsTest,
  validationSchema,
} from '../../config/default';

class EditUserScreen extends Component {
  state = {
    expeditionDate: '',
    documentType: '',
    testData: '',
    city: '',
    state: '',
    showMap: false,
    address: this.props.data.address,
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

  handleDatePicker = (dateP) => this.setState({expeditionDate: dateP});
  showContent = () => this.setState({showMap: !this.state.showMap});
  handleState = (text) => this.setState({documentType: text});
  handleStateTest = (text) => this.setState({testData: text});
  handleCity = (text) => this.setState({city: text});
  handleDept = (text) => this.setState({state: text});
  cancelEdit = () => this.props.navigation.goBack();
  hideAlert = () => {
    this.props.setError();
    this.props.navigation.goBack();
    this.props.editData ? this.props.UpdateState(this.props.editData) : null;
  };

  hideAlertError = () => {
    this.props.editData ? this.props.UpdateState(this.props.editData) : null;
  };

  alertCreation = (registro, error) => {
    if (registro) {
      return <ShowAlert msg={'Actualizacion exitosa!'} setE={this.hideAlert} />;
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
    name: this.props.data.name,
    address: this.props.data.address,
    city: this.props.data.city,
    state: this.props.data.state,
    documentType: this.props.data.documentType,
    id: this.props.data.id,
    expeditionDate: this.props.data.expeditionDate,
    testResult: this.props.data.testResult,
    phone: this.props.data.phone,
    email: this.props.data.email,
  };

  render() {
    const {
      loading,
      registro,
      error,
      data: {id},
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.alertCreation(registro, error)}
        {loading || !loading == 'undefinded' ? (
          <Loading />
        ) : (
          <ScrollView style={styles.scrollView}>
            <Heading
              icon="account-circle-outline"
              subTitle="Editar la informacion del usuario"
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
                    this.props.UpdateCiudadano(id, {
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
                        lable="Nombre"
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
                        label="Ciudad"
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
                        lable="Departamento"
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
                        lable="Tipo de documento"
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
                        label="Numero de documento"
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
                        label="Fecha de expedición"
                        onPress={handleChange('expeditionDate')}
                        styles={styles.input}
                        placeholder={'Fecha de expedición'}
                        onChangeText={this.handleDatePicker}
                        onBlur={handleBlur('expeditionDate')}
                        value={this.state.expeditionDate}
                        errorText={
                          touched.expeditionDate && errors.expeditionDate
                        }
                      />
                      <InputSelect
                        lable="Prueba"
                        items={optionsTest}
                        value={this.state.testData}
                        onPress={handleChange('testResult')}
                        placeholder={'Prueba'}
                        onChangeText={this.handleStateTest}
                        onBlur={handleBlur('testResult')}
                        value={values.testResult}
                        errorText={touched.testResult && errors.testResult}
                      />
                      <InputText
                        lable="Teléfono"
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
                        lable="Correo electrónico"
                        returnKeyType="next"
                        placeholder={'Correo electrónico'}
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
                          onPress={this.cancelEdit}>
                          {'Cancelar'}
                        </Button>
                        <Button
                          style={styles.button}
                          title={'Editar'}
                          onPress={handleSubmit}>
                          {'Editare'}
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
  },
  scrollView: {
    padding: 16,
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
  const {data} = state.search;
  const {loading, data: editData, registro, error} = state.editUser;
  return {data, loading, editData, registro, error};
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateCiudadano: (id, values) => {
      return dispatch(editNewUser(id, values));
    },
    UpdateState: (data) => {
      dispatch(searchDataSuccess(data[1][0]));
    },
    setError: () => {
      return dispatch(resetValues());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserScreen);
