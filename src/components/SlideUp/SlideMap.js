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
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

//Components
import BottomButtons from '../Button/BottomButtons';
import PickAddress from '../MapLocations/PickAddress';
import AddressCard from '../Card/addressCard';

const { height } = Dimensions.get('window');

const SlideMap = ({ ...props }) => {
   const { slide, showContent, handleAddress } = props;
   const [address, setAddress] = useState();
   const setParams = (params) => setAddress(params);

   const btns = [
      {
         title: 'Cancelar',
         action: () => showContent(false),
      },
      {
         title: 'Seleccionar',
         action: () => {
             handleAddress(address)
             showContent(false)
            },
      },
   ];

   return (
      <Modal
         isVisible={slide}
         onBackdropPress={() => showContent(false)}
         onSwipeComplete={() => showContent(false)}
         style={styles.view}>
         <PickAddress setParams={setParams} />
         <AddressCard address={address} />
         <View style={styles.bottons}>
            <BottomButtons btns={btns} />
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   container: {
      height: height / 1,
      backgroundColor: 'white',
      alignItems: 'center',
   },
   bottons: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'white',
      height: height / 9,
   },
   dragIcon: {
      width: 70,
      height: 6,
      margin: 10,
   },
   view: {
      justifyContent: 'flex-end',
      margin: 0,
   },
});

export default SlideMap;
