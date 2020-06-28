import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import mapboxClient from '@mapbox/mapbox-sdk';
import mapboxGeocodingClient from '@mapbox/mapbox-sdk/services/geocoding';

// //Components
import ShowAlert from '../components/Alert/Alert';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// //Utilities
import { theme } from './theme';

//Config
export const IS_ANDROID = Platform.OS === 'android';
export const DEFAULT_CENTER_COORDINATE = [-76.481856, 3.006929];
export const API_KEY =
   'pk.eyJ1IjoiZGF5cm9tIiwiYSI6ImNrYTc5aXg0YzAxM2oyeXFlZWYwejU4cTYifQ.uQCDALmLyuOI-QzPxo1_EA';
const clientKey = mapboxClient({ accessToken: API_KEY });

/**
 * emailValidator
 * @param {*} email
 */
export const emailValidator = (email) => {
   const re = /\S+@\S+\.\S+/;

   if (!email || email.length <= 0) return 'El correo no puede estar vacio.';
   if (!re.test(email)) return 'Ooops! Introduce un correo valido.';

   return '';
};

/**
 * passwordValidator
 * @param {*} password
 */
export const passwordValidator = (password) => {
   if (!password || password.length <= 0)
      return 'La clave no puede estar vacia.';
   return '';
};

/**
 * formatDate
 * @param {*} date
 * @param {*} type
 */
export const formatDate = (date, type) => {
   let returnType = type === 'f' ? 'YYY-MM-dd' : 'hh:mm.aaaa';
   return date ? ('Format', format(date, returnType, { locale: es })) : null;
};

/**
 * numValidator
 * @param {*} text
 */
export const numValidator = (text) => {
   if (!text || text.length <= 0 || !/^([0-9])*$/.test(text))
      return 'Debe de ingresar un numero de cedula valido.';
   return '';
};

/**
 * getAddress
 * @param {*} location
 */
export const getAddress = async (location) => {
   const geoCodingClient = mapboxGeocodingClient(clientKey);
   const {
      features: [feature],
   } = await geoCodingClient
      .reverseGeocode({
         query: [location.lon, location.lat],
         types: ['address', 'poi'],
      })
      .send()
      .then((response) => response.body);

   if (feature) {
      const { place_name: address } = feature;
      return address;
   }
   return 'Tu direccion no fue encontrada, pero utilizaremos las coordenadas para ubicarte en el mapa.';
};

/**
 * alertCreation
 * @param {*} registro
 * @param {*} error
 */
export const alertCreation = (registro, error) => {
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

/**
 * cardStatistics
 * @param {*} item
 */
export const cardStatistics = (item, index) => {
   return (
      <TouchableOpacity key={index}>
         <Card style={styles.card}>
            <Card.Content style={styles.textsContainer}>
               <View style={{ marginRight: 20 }}>
                  <Icon name={item.icon} color={item.color} size={40} />
               </View>
               <View>
                  <Text style={styles.textL}>{item.label}</Text>
                  <Text style={styles.texts}>{item.y}</Text>
               </View>
            </Card.Content>
         </Card>
      </TouchableOpacity>
   );
};

/**
 * cardStatistics Styles
 */
const styles = StyleSheet.create({
   view: {
      padding: 16,
      marginBottom: 10,
   },
   textsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   texts: {
      paddingBottom: 8,
      fontSize: 20,
      color: 'white',
   },
   textL: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 16,
      paddingTop: 5,
      color: 'white',
   },
   card: {
      marginBottom: 10,
      backgroundColor: theme.colors.primary,
   },
});
