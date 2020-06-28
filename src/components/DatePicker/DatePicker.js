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
import { View, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//Components
import InputText from '../Input/InputText';

//Utilities
import { formatDate } from '../../core/utils';
import { theme } from '../../core/theme';

const DatePicker = ({ errorText, ...props }) => {
   const { value, styles, onPress, placeholder, onChangeText } = props;
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

   const showDatePicker = () => setDatePickerVisibility(true);
   const hideDatePicker = () => setDatePickerVisibility(false);

   const handleConfirm = (date) => {
      onChangeText(date);
      onPress(formatDate(date, 'f'));
      hideDatePicker();
   };

   return (
      <View>
         <InputText
            style={styles}
            placeholder={placeholder}
            autoCapitalize="none"
            onTouchStart={showDatePicker}
            value={formatDate(value, 'f')}
         />
         {errorText ? <Text style={style.error}>{errorText}</Text> : null}

         <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            headerTextIOS={'Seleccionar fecha'}
         />
      </View>
   );
};

const style = StyleSheet.create({
   error: {
      fontSize: 14,
      color: theme.colors.error,
      paddingHorizontal: 4,
      paddingTop: 4,
   },
});
export default DatePicker;
