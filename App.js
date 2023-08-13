import * as React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home';
import Constants from './src/Constants';
import StoreAppWrapper from './src/Navigation/StoreAppWrapper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
<StatusBar backgroundColor={Constants.gradientTwo} />
    <NavigationContainer>
  
        <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StoreAppWrapper/>
      </PersistGate>
      </Provider>
      
    </NavigationContainer>
    </>
  );
}



export default App;
