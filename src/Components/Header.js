import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions, StatusBar, Animated } from 'react-native';
import Constants from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('screen');

const Header = (props) => {
  let str = props.title ? props.title : 'Home Screen';
  let str2 = str?.charAt(0).toUpperCase() + str?.slice(1);
  let str3 = str2.substr(0, 30);
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
    <Animated.View style={{ width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 2,
    height:height/16,
    backgroundColor: Constants.gradientTwo,
    flexDirection: 'row',
    justifyContent: 'space-between',borderBottomRightRadius:0,borderBottomLeftRadius:0,
    ...props.style,}}>
     
        {props.leftComponent ? props.leftComponent : null}
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'left',
            minWidth: '50%',
            letterSpacing: 1,
            ...props.titleStyle,
          }}>
          {props.title ? props.title : userData.userName ? `Hello ${userData.userName}` : 'Hello'}
        </Text>
        {userData.userName ?  props.rightComponent ? props.rightComponent : <View style={{ flex: 1 }}></View>:<View style={{ flex: 1 }}></View>}
    </Animated.View>
  );
};

export default Header;
