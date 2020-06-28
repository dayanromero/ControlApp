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
import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

//Components
import MapLocations from '../MapLocations/MapLocations';

//Utilities
import { getAddress, DEFAULT_CENTER_COORDINATE } from '../../core/utils';
import { dataSource } from '../../config/default/'

class PickAddress extends Component {
   state = {
      location: DEFAULT_CENTER_COORDINATE,
      userId: 0,
   };

   onPress = (event) => {
      const { geometry } = event;
      const location = {
         lon: geometry.coordinates[0],
         lat: geometry.coordinates[1],
      };

      this.setState({
         location: [location.lon, location.lat]
      })

      getAddress(location)
         .then((response) => {
            const params = { location, response };
            this.props.setParams(params);
         })
         .catch((error) => console.log(error));
   };

   render() {
      return (
         <SafeAreaView style={styles.container}>
            <View style={styles.container}>
               <MapboxGL.MapView
                  onPress={this.onPress}
                  style={styles.container}
                  zoomLevel={10}
                  showUserLocation={true}>
                  <MapboxGL.Camera
                     zoomLevel={16}
                     animationMode={'flyTo'}
                     centerCoordinate={this.state.location}
                  />
                  {/* <MapboxGL.UserLocation /> */}
                  <MapLocations
                     show={() => {}}
                     centerLocation={this.state.location}
                     point={dataSource(this.state.location)}
                  />
               </MapboxGL.MapView>
            </View>
         </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default PickAddress;
