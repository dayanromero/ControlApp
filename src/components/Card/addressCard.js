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
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';

const AddressCard = (props) => {
   const { address: { response, location: { lat, lon } = '' } = {} } = props;

   return (
      <Card style={styles.card}>
         <Card.Content>
            <View>
               <Text style={[styles.textL, styles.texts]}>
                  Direccion: si tu direccion no concuerda utilizaremos las
                  coordenadas
               </Text>
               <Text style={styles.texts}>{response}</Text>
            </View>
            <Divider />
            <View>
               <Text style={[styles.textL, styles.texts]}>Coordenadas: </Text>
               <Text style={styles.texts}>
                  {lat}, {lon}
               </Text>
            </View>
         </Card.Content>
      </Card>
   );
};

const styles = StyleSheet.create({
   texts: {
      paddingTop: 5,
      paddingBottom: 8,
      fontSize: 14,
   },
   textL: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
   },
   card: {
      marginBottom: 5,
   },
});

export default AddressCard;
