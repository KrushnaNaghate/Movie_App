import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../Constants';

export default class Button extends Component {
  alert = () => {
    alert('pressed');
  };
  render() {
    const button = {
      backgroundColor: this.props.backgroundColor
        ? this.props.backgroundColor
        : Constants.taskColor,
      borderRadius: 30,
      width: this.props.width ? this.props.width : '50%',
      alignItems: 'center',
      paddingVertical: 8,
      overflow: 'hidden',
      minHeight: 36,
    };
    const text = {
      color: '#fff',
      fontSize: this.props.textSize ? this.props.textSize : 14,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      ...this.props.textStyle

    };
    return (
      <TouchableOpacity
        {...this.props}
        disabled={this.props.disabled}
        android_ripple={{color:Constants.fontBlue}}
        style={{...button, ...this.props.style}}
        onPress={this.props.onPress ? this.props.onPress : this.alert}>
        {this.props.loading ? (
          <ActivityIndicator
            color="#fff"
            size={this.props.size ? this.props.size : 18}
          />
        ) : (
          <Text style={text}>
            {this.props.title ? this.props.title : 'Demo Button'}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
