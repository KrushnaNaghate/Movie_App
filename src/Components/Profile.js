import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Constants from '../Constants';
import Header from './Header';
import Feather from 'react-native-vector-icons/Feather';
import Film from '../../assets/film.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'react-native-paper';
import Input from './Input';
import { persistor } from '../Redux/Store';

const Profile = ({handleLogout}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user profile data from AsyncStorage
    const fetchUserProfileData = async () => {
      try {
        const userProfileData = await AsyncStorage.getItem('user_profile_data');
        const parsedUserData = JSON.parse(userProfileData) || {};
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };

    fetchUserProfileData();
  }, []);



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Constants.baseColor}}>
      <Header
        title={'Profile'}
        // leftComponent={          <TouchableOpacity
        //       style={{
        //         height: 30,
        //         width: 30,
        //         marginRight:10,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}
        //       onPress={() => {
        //        navigation.goBack();
        //       }}>
        //       <Feather
        //         name="chevron-left"
        //         size={30}
        //         color={Constants.surfaceColor}
        //       // style={{marginRight: 12}}
        //       />
        //     </TouchableOpacity>}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Constants.baseColor,
          paddingBottom: 10,
        }}>
        <ImageBackground
          source={Film}
          imageStyle={{height: '100%', width: '100%', borderRadius: 60}}
          resizeMode={'contain'}
          style={{
            height: 100,
            width: 100,
            borderRadius: 60,
            borderColor: Constants.surfaceColor,
            alignSelf: 'center',
            // borderWidth: this.state.disable ? 5 : 0,
            zIndex: 0,
          }}
        />

        <View style={{paddingHorizontal: 12, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 22,
              color: Constants.textColor,
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            Username
          </Text>
          <View
            style={{
               backgroundColor: Constants.surfaceColor,
            // paddingHorizontal: 5,
            borderBottomWidth: 0,
            // paddingVertical: 3,
            color: Constants.basicFontColor,
            fontSize: 16,
            lineHeight: 18,
            paddingVertical: 8,
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            paddingHorizontal:10,
            marginBottom:15,
            width: '100%',
            borderRadius: 4,
            }}>
            <Text
              style={{
                color: Constants.basicFontColor,
                fontSize: 17,
                lineHeight: 22,
                textAlign: 'left',
              }}>
              {userData.userName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 22,
              color: Constants.textColor,
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            Email
          </Text>
          <View
            style={{
               backgroundColor: Constants.surfaceColor,
            // paddingHorizontal: 5,
            borderBottomWidth: 0,
            // paddingVertical: 3,
            color: Constants.basicFontColor,
            fontSize: 16,
            lineHeight: 18,
            paddingVertical: 8,
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            paddingHorizontal:10,
            marginBottom:15,
            width: '100%',
            borderRadius: 4,
            }}>
            <Text
              style={{
                color: Constants.basicFontColor,
                fontSize: 17,
                lineHeight: 22,
                textAlign: 'left',
              }}>
              {userData.email}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 22,
              color: Constants.textColor,
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            Mobile Number
          </Text>
          <View
            style={{
               backgroundColor: Constants.surfaceColor,
            // paddingHorizontal: 5,
            borderBottomWidth: 0,
            // paddingVertical: 3,
            color: Constants.basicFontColor,
            fontSize: 16,
            lineHeight: 18,
            paddingVertical: 8,
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            paddingHorizontal:10,
            marginBottom:15,
            width: '100%',
            borderRadius: 4,
            }}>
            <Text
              style={{
                color: Constants.basicFontColor,
                fontSize: 17,
                lineHeight: 22,
                textAlign: 'left',
              }}>
             {userData.phone}
            </Text>
          </View>
        </View>

      </ScrollView>
      
      <Button mode="contained" buttonColor={Constants.gradientTwo} 
      onPress={()=>{
        handleLogout(false)
      }}
      style={{marginTop: 15,bottom:20,width:'95%',alignSelf:'center',position:'absolute'}}>
        Log Out
      </Button>
    </SafeAreaView>
  );
};

export default Profile;
