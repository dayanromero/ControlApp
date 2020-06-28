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
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//Components
import Loading from '../Loading/Loading';

//Utilities
import { theme } from '../../core/theme';

const Button = ({ ...props }) => {
    const { title, style, onPress, loading } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            style={[
                { backgroundColor: loading ? 'transparent' : theme.colors.primary },
                styles.container,
                style,
            ]}>
            {loading ? <Loading /> : <Text style={styles.text}>{title}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});

export default Button;
