import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import Constants from '../Constants';

class Input extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width ? this.props.width : '100%',
          paddingVertical: 8,
          ...this.props.style,
        }}>
        <TextInput
          {...this.props}
          onChangeText={this.props.onChangeText}
          style={{
            borderWidth: this.props.multiline ? 1 : 0,
            borderColor:  Constants.borderColor ,
            borderRadius: this.props.multiline ? 3 : 0,
            borderBottomColor: Constants.borderColor,
            borderBottomWidth: this.props.borderBottomWidth
              ? this.props.borderBottomWidth
              : 1,
            paddingVertical: 3,
            lineHeight: 18,
            fontSize: 14,
            paddingHorizontal: this.props.multiline ? 12 : 0,
            color: Constants.basicFontColor,
            ...this.props.style,
            ...this.props.styles,
          }}
          placeholderTextColor={Constants.placeholderColor}
          placeholder={this.props.placeholder ? this.props.placeholder : 'Demo'}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : null
          }
        />
      </View>
    );
  }
}

export default Input;
