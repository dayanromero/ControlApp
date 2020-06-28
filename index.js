/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

 /**
 * @author Dayan Romero
 * @file index.js
 * @description Auth0 API Manager services
 */

// Dependencies
import * as React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

// Components
import App from './src/App';
import configureStore from './src/store';

// Configuration
import { name as appName } from './app.json';

const store = configureStore();

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <App />
            </PaperProvider>
       </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
