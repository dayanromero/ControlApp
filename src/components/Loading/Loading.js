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
import { ActivityIndicator, StyleSheet, View } from 'react-native';

//Utilities
import { theme } from '../../core/theme';

const Loader = () => {
   return (
      <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
   },
});

export default Loader;
