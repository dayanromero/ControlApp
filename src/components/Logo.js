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
import { Image, StyleSheet } from 'react-native';

const logo = require('../assets/logo.png'); 

const Logo = () => (
  <Image source={logo} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 174,
    marginBottom: 12,
  },
});

export default Logo;