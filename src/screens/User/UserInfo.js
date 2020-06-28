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
import React, { useContext } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Divider, Card } from 'react-native-paper';

//Utilities
import { theme } from '../../core/theme';
import { UserContext } from '../../context/';

const UserInfo = () => {
   const user = useContext(UserContext);
   return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={styles.scrollView}>
            <Card>
               <Card.Content>
                  <View style={styles.textsContainer}>
                     <Text style={[styles.textL, styles.texts]}>Nombre:</Text>
                     <Text style={[styles.textR, styles.texts]}>
                        {user.nombre}
                     </Text>
                  </View>
                  <Divider />
                  <View>
                     <Text style={[{ paddingTop: 20 }, styles.textL]}>
                        Direccion:
                     </Text>
                     <Text style={[styles.textR, styles.texts]}>
                        {user.direccion}
                     </Text>
                  </View>
                  <Divider />
                  <View style={styles.textsContainer}>
                     <Text style={[styles.textL, styles.texts]}>Telefono:</Text>
                     <Text style={[styles.textR, styles.texts]}>
                        {user.celular}
                     </Text>
                  </View>
                  <Divider />
                  <View style={styles.textsContainer}>
                     <Text style={[styles.textL, styles.texts]}>Ciudad:</Text>
                     <Text style={[styles.textR, styles.texts]}>
                        {user.ciudad}
                     </Text>
                  </View>
                  <Divider />
                  <View style={styles.textsContainer}>
                     <Text style={[styles.textL, styles.texts]}>
                        Tipo de Documento:
                     </Text>
                     <Text style={[styles.textR, styles.texts]}>
                        {user.tipoDoc}
                     </Text>
                  </View>
                  <Divider />
                  <View style={styles.textsContainer}>
                     <Text style={[styles.textL, styles.texts]}>
                        Numero de Documento:
                     </Text>
                     <Text style={[styles.textR, styles.texts]}>
                        {user.cedula}
                     </Text>
                  </View>
               </Card.Content>
            </Card>
            <Divider />
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.grey,
   },
   scrollView: {
      marginTop: 10,
      marginHorizontal: 10,
   },
   textsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   texts: {
      paddingTop: 20,
      paddingBottom: 20,
   },
   textL: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase',
   },
   textR: {
      fontSize: 16,
      textTransform: 'capitalize',
   },
});

export default UserInfo;
