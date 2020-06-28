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
import { Text, StyleSheet } from 'react-native';

const Heading = ({children, style, ...props}) => {
    return (
        <Text {...props} style={[styles.text, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Heading;
