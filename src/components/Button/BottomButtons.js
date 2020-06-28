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
import {View, StyleSheet, Platform} from 'react-native';

//Components
import Button from './Button';

const BottomButtons = ({...props}) => {
  const {btns, style} = props;

  return (
    <View style={styles.buttonContainer}>
      {btns.map((btn, i) => (
        <Button
          key={i}
          title={btn.title}
          style={[styles.button, style]}
          onPress={btn.action}>
          {btn.title}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: Platform.OS === 'ios' ? 10 : 2,
  },
  button: {
    width: '49%',
    marginVertical: 8,
  },
});

export default BottomButtons;
