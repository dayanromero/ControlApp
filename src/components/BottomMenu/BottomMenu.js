import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../core/theme';
const { height } = Dimensions.get('window');

const BottomMenu = (props) => {
   return (
      <View style={styles.container}>
        {/* <TouchableOpacity
            style={styles.texts}
            onPress={() => props.navigation.goBack('inicio')}>
            <Icon name="home" color={props.inicio ? theme.colors.secondary :'white'} size={30} />
            <Text style={{color: 'white'}}>Inicio</Text>
         </TouchableOpacity> */}
         <TouchableOpacity
            style={styles.texts}
            onPress={() => props.navigation.navigate('statistics')}>
            <Icon name="poll" color={props.stats ? theme.colors.secondary :'white'} size={30} />
            <Text style={{color: 'white'}}>Estadisticas</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      height: height / 14,
      backgroundColor: theme.colors.primary,
   },
   texts: {
      alignItems: 'center',
      justifyContent: 'space-around',
      color: 'white',
   },
});

export default BottomMenu;
