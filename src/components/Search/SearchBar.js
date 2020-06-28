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
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar as Search } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import ShowAlert from '../Alert/Alert';

//Utilities
import { theme } from '../../core/theme';
import { numValidator } from '../../core/utils';

const SearchBar = ({ onPress, navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    const consultUser = () => {
        const queryVal = numValidator(searchQuery);
        if (queryVal) {
            setError(queryVal);
            return;
        }
        return onPress(searchQuery);
    };

    return (
        <View style={styles.container}>
            {error ? <ShowAlert msg={error} setE={setError} /> : null}
            <Icon.Button
                name="menu"
                size={30}
                color="white"
                backgroundColor={theme.colors.primary}
                onPress={() => navigation.openDrawer()}></Icon.Button>
            <Search
                style={styles.search}
                placeholder="Buscar numero de cedula"
                onChangeText={(query) => setSearchQuery(query)}
                value={searchQuery}
                onIconPress={() => consultUser()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 8,
        backgroundColor: theme.colors.primary,
    },
    search: {
        height: 55,
        width: '85%',
    },
});

export default SearchBar;
