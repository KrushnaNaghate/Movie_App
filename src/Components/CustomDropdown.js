import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from '../Constants';

const CustomDropdown = ({
  data =[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
  labelField='label',
  valueField="value",
  placeholder='Select',
  ActiveName,
  inActiveName,
  dropdownStyle,
  iconStyle,
  inputSearchStyle,
  textStyle,
  onSelect,
  value,
}) => {
  const [isFocus, setisFocus] = useState(false);
  const ActiveIcon = ActiveName ? ActiveName : 'caretup';
  const inActiveIcon = inActiveName ? inActiveName : 'caretdown';
  // console.log(data);
  const styles = StyleSheet.create({
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: Constants.baseColor,
      borderWidth: 2,
      borderColor: Constants.fadedColor,
    },
    icon: {
      marginRight: 5,
      marginTop: -3,
    },
    inputSearch: {
      height: 40,
      fontSize: 16,
    },
    textStyle: {
      fontWeight: '600',
      fontSize: 15,
      color: Constants.fadedColor,
    },
  });


  const handleSelection = (item) => {
    // console.log(item);
    setisFocus(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <Dropdown
      style={[styles.dropdown, dropdownStyle]}
      placeholderStyle={[styles.textStyle, textStyle]}
      selectedTextStyle={[styles.textStyle, textStyle]}
      itemTextStyle={[styles.textStyle, textStyle]}
      // iconStyle={styles.iconStyle}
      s
      containerStyle={{backgroundColor:Constants.baseColor}}
      data={data}
      inputSearchStyle={[styles.inputSearch,inputSearchStyle]}
      maxHeight={200}
      labelField={labelField}
      valueField={valueField}
      placeholder={!isFocus ? placeholder : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setisFocus(true)}
      onBlur={() => setisFocus(false)}
      onChange={handleSelection}
      renderRightIcon={() => (
        <AntDesign
          style={[styles.icon, iconStyle]}
          color={Constants.borderColor}
          name={isFocus ? ActiveIcon : inActiveIcon}
          size={18}
        />
      )}
    />
  );

  
};

export default CustomDropdown;


