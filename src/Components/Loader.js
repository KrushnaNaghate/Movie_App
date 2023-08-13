import React from 'react';
import {ActivityIndicator,View} from 'react-native';
import Constants from '../Constants';

const Loader = () => {
  return( 
  <View style={{width:'100%',height:300,justifyContent: 'center',alignItems:'center'}}>
  <ActivityIndicator size="large" color={Constants.textColor} />
  </View>)
};

export default Loader;
