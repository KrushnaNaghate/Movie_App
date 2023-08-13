import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Constants from '../Constants';


interface IndicatorProps {
  colors?: string;
  size?: number;
}

const Indicator: React.FC<IndicatorProps> = ({ colors = Constants.gradientTwo, size = 20 }) => {
  return (
    <View
      style={[
        styles.materialActivityIndicator,
        {
          height: size+10,
          width: size+10,
          borderRadius: size / 2+10,
          backgroundColor: Constants.baseColor,
          borderWidth:0.5,
          borderColor:Constants.textColor
        },
      ]}
    >
      <ActivityIndicator color={colors} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  materialActivityIndicator: {
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Indicator;
