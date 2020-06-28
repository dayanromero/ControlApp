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
import React, { Fragment } from 'react';
import { Alert } from 'react-native';

export default ShowAlert = (props) => {
   return <Fragment>
        {Alert.alert(
             props.msg,
            '',
            [{ text: 'OK', onPress: () => props.setE('')}],
            { cancelable: false },
        )}
    </Fragment>
};
