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
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

//Utilities
import { theme } from '../../core/theme';

const InputText = ({ errorText, style, ...props }) => (
   <View style={styles.container}>
      <Input
         style={[styles.input, style]}
         selectionColor={theme.colors.secondary}
         underlineColor="transparent"
         theme={{ colors: { primary: theme.colors.secondary } }}
         mode="outlined"
         {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
   </View>
);

const styles = StyleSheet.create({
   container: {
      width: '100%',
      marginVertical: 2,
   },
   input: {
      backgroundColor: theme.colors.backg,
   },
   error: {
      fontSize: 14,
      color: theme.colors.error,
      paddingHorizontal: 4,
      paddingTop: 4,
   },
});

export default InputText;
