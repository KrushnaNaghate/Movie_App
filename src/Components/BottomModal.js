import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Constants from '../Constants';


class BottomModal extends Component {
  render() {
    return (
      <Modal
        onBackButtonPress={this.props.onBackButtonPress}
        avoidKeyboard={true}
        useNativeDriver={true}
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        style={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          width: '100%',
          margin: 0,
          ...this.props.style
        }}
        {...this.props}>
        <View
          style={{
            backgroundColor:this.props.needfull ? 'black':  Constants.baseColor,
            minHeight: 100,
            paddingVertical:12,
            width: '100%',
            paddingHorizontal:this.props.needfull ? 0 : 12,
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
          }}>
             <View
          style={{
            width:  60,
            alignSelf: 'center',
            borderColor: Constants.placeholderColor,
            borderWidth: 1.3,
            borderRadius: 10,
          }}></View>
          {this.props.component ? (
            this.props.component
          ) : (
            <Text>I am the modal content!</Text>
          )}
        </View>
      </Modal>
    );
  }
}

export default BottomModal;
