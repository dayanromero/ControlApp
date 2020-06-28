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
import MapboxGL from '@react-native-mapbox-gl/maps';

const locationIcon = require('../../assets/icon_location.png');

const MapLocations = (props) => {
    const points = props.point;

    let icon = {
        iconImage: locationIcon,
        iconAllowOverlap: true,
        iconSize: 1.2,
    };

    if (points) {
        return (
            <MapboxGL.ShapeSource
                id={'MapPoints'}
                hitbox={{ width: 30, height: 30 }}
                onPress={(points) => {
                    let { features: [data] } = points;
                    let { geometry: { coordinates } } = data;
                    props.centerLocation(coordinates);
                    props.show();
                }}
                shape={points}>
                <MapboxGL.SymbolLayer id={'locationIcon'} style={icon} />
            </MapboxGL.ShapeSource>
        );
    }
    return <MapboxGL.ShapeSource />;
};

export default MapLocations;
