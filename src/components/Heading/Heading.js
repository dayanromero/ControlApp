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
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Utilities
import {theme} from '../../core/theme';

const Heading = ({title, subTitle, icon}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  icon: {
    textAlign: 'center',
    fontSize: 100,
    color: theme.colors.secondary,
  },
});

export default Heading;
