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
import { StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

//Components
import MapLocations from './MapLocations';

//Utilities
import { MapLocationContext } from '../../screens/Dashboard/context';
import { API_KEY } from '../../core/utils';

MapboxGL.setAccessToken(API_KEY);

const Dashboard = () => {
   return (
      <MapLocationContext.Consumer>
         {(value) => (  
            <MapboxGL.MapView
               style={styles.container}
               zoomLevel={10}
               showUserLocation={true}>
               <MapboxGL.Camera
                  zoomLevel={15}
                  animationMode={'flyTo'}
                  centerCoordinate={value.location}
               />
               <MapboxGL.UserLocation />
               <MapLocations
                  show={value.showContent}
                  centerLocation={value.setLocation}
                  point={value.dataSource}
               />
            </MapboxGL.MapView>
         )}
      </MapLocationContext.Consumer>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default Dashboard;
