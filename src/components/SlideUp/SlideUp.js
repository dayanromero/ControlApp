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
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import BottomButtons from '../Button/BottomButtons';

//Utilities
import { theme } from '../../core/theme';

const dragImg = require('../../assets/drag-icon.png');
const { height } = Dimensions.get('window');

const slideUp = ({ ...props }) => {
    const { slide, showContent, handleModal, userData, navigation } = props;

    const userScreen = () => {
        navigation.navigate('UserScreen');
    };

    const btns = [
        {
            title: 'Salida',
            action: () => {
                showContent(false);
                handleModal('Salida');
            },
        },
        {
            title: 'Ingreso',
            action: () => {
                showContent(false);
                handleModal('Ingreso');
            },
        },
    ];

    return (
        <View>
            <Modal
                isVisible={slide}
                onBackdropPress={() => showContent(false)}
                onSwipeComplete={() => showContent(false)}
                swipeDirection={['down']}
                style={styles.view}>
                <View style={styles.container}>
                    <Image source={dragImg} style={styles.dragIcon} />
                    <View style={styles.userInfo}>
                        <TouchableOpacity
                            onPress={userScreen}
                            onPressOut={() => showContent(false)}>
                            <Icon
                                name="account-circle-outline"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        {userData ? (
                            <View>
                                <Text style={styles.h1}>{userData.name}</Text>
                                <Text style={styles.h2}>C.C {userData.id}</Text>
                                <Text style={styles.h3}>
                                    Prueba: {userData.testResult}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.bottons}>
                        <BottomButtons btns={btns} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height / 3.5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    bottons: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    dragIcon: {
        width: 70,
        height: 6,
        margin: 10,
    },
    userInfo: {
        flex: 1,
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
    },
    icon: {
        width: 100,
        height: 100,
        marginRight: 20,
        textAlign: 'center',
        fontSize: 100,
        color: theme.colors.secondary,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    h2: {
        fontSize: 18,
    },
    h3: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});

export default slideUp;
