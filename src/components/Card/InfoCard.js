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
import Icon from 'react-native-vector-icons/Ionicons';

//Utilities
import { theme } from '../../core/theme';
import { formatDate } from '../../core/utils';

const InfoCard = (data) => {
    const {
        type,
        date,
        location: { name },
    } = data.data;

    let fecha = new Date(date);

    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.date}>
                    <View style={styles.date}>
                        <Icon name="ios-calendar" style={styles.icon} />
                        <Text style={styles.textL}>{formatDate(fecha, 'f')}</Text>
                    </View>
                    <Text style={[styles.textL, styles.texts]}>{type}</Text>
                </View>
                <Divider />
                <View style={styles.textsContainer}>
                    <Text style={[styles.textL, styles.texts]}>Hora: </Text>
                    <Text style={styles.texts}>{formatDate(fecha, 'h')}</Text>
                </View>
                <Divider />
                <View style={styles.textsContainer}>
                    <Text style={[styles.textL, styles.texts]}>Lugar: </Text>
                    <Text style={styles.texts}> {name} </Text>
                </View>
            </Card.Content>
        </Card>
    );
};
const styles = StyleSheet.create({
    date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
    },
    textsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texts: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    textL: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    card: {
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
        color: theme.colors.secondary,
        fontSize: 20,
    },
});

export default InfoCard;
