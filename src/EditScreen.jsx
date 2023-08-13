// EditScreen.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';

const {height, width} = Dimensions.get('window');

const EditScreen = ({route, navigation}) => {
  const {item} = route.params || {};
  const [Data, setData] = useState(item)

  const [firstName, setFirstName] = useState(!!item ? item?.FirstName : '');
  const [lastName, setLastName] = useState(!!item ? item?.LastName : '');
  const [dateOfBirth, setDateOfBirth] = useState(!!item ? item?.DateOfBirth : '');
  const [married, setMarried] = useState(!!item ? item?.married : false);
  const [photo, setPhoto] = useState(!!item ? item?.Photo : '');
  const [showWarning, setshowWarning] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

 useEffect(() => {
  console.log(route.params , "nehal");
  console.log(item,  "enha");
 }, [])
 
 const handleSave = () => {
  if (!!firstName && !!dateOfBirth && !!married && !!photo) {
  
    const newItem = {
      Id: !!item?.Id ?  + item?.Id +  1 : 1, 
      FirstName: firstName ? firstName : item?.FirstName,
      LastName: lastName ? lastName : item?.LastName, 
      DateOfBirth: dateOfBirth ? dateOfBirth : item?.dateOfBirth,
      Married: married ? married : item?.married,
      Photo: photo ? photo : item?.photo,
    };
    console.log(newItem);

    console.log("nehal");
    setData(newItem);
    navigation.navigate('Main', {newItem});
    setshowWarning('');
  } else {
    setshowWarning('Fill all the fields');
  }
};

const handleDateChange = (date) => {
  setSelectedDate(date);
};
const handleImagePicker = () => {
  ImagePicker.showImagePicker(
    { mediaType: 'photo', allowsEditing: true },
    (response) => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response.uri);
      }
    }
  );
};


  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        /> */}
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unfillColor="#FFFFFF"
          text="Married"
          innerIconStyle={{borderWidth: 2, borderColor: 'grey'}}
          textStyle={{
            fontFamily: 'JosefinSans-Regular',
            textDecorationLine: 'none',
          }}
          onPress={isChecked => {
            {
              if (isChecked === true) {
                setMarried(true);
              } else {
                setMarried(false);
              }
            }
          }}
        />
     {/* <TextInput
          style={styles.input}
          placeholder="Photo URL"
          value={photo}
          onChangeText={setPhoto}
        /> */}
        <View style={styles.photo}>
          {!!photo && <Avatar.Image source={{uri: photo}} />}
        </View> 

        <DatePicker
        style={{ width: '100%', marginBottom: 10 }}
        date={selectedDate}
        mode="date"
        placeholder="Select Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: { borderWidth: 0 },
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
        }}
        onDateChange={handleDateChange}
      />
      <Button title="Select Image" onPress={handleImagePicker} />
      {selectedImage && (
        <Avatar.Image source={{ uri: selectedImage }} />
      )}
      <Button title="Save" onPress={handleSave} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.buttonClick}>
          <Text style={{color: 'black'}}>Save</Text>
        </TouchableOpacity>
        {!!showWarning && <Text style={styles.warning}>{showWarning} </Text>}
      </View>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  input: {
    width: width - 100,
    borderWidth: 2,
    color: 'black',
    backgroundColor: 'grey',
    marginBottom: 5,
  },
  mainContainer: {
    width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    height: height / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    height: height / 6,
    // borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  photo: {
    width: 50,
    height: 50,
  },
  buttonClick : {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'skyblue',
    borderColor: 'skyblue',
  }
});
