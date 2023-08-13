import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import Film from '../../assets/film.png';
import Input from '../Components/Input';
import Constants from '../Constants';
import Button from '../Components/Button';
import SInfo from 'react-native-sensitive-info';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const SignIn = ({handleIsLogin}) => {
  const navigation = useNavigation()
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const [showPass, setShowPass] = useState(false);
// console.log(navigation);
  useEffect(() => {
    getData()
    _startAnimation();
  }, []);
  
const  getData=async()=>{
    const encryptedUserData = await SInfo.getItem('user_data', {});
    console.log(encryptedUserData);
  }

  const _startAnimation = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 2000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const onChange = (name, input) => {
    if (name === 'userName') {
      setUserName(input);
    } else if (name === 'password') {
      setPassword(input);
    }
  };

  const handleSignin = async () => {
    if (!userName || !password) {
      ToastAndroid.show(
        'Username and password are required',
        ToastAndroid.SHORT,
      );
      return;
    }
    setLoading(true);
    try {
      // Retrieve user data
      const encryptedUserData = await SInfo.getItem('user_data', {});
      const userDataArray = JSON.parse(encryptedUserData) || [];
console.log(userName,password);
      const user = userDataArray.find(
        user => user.userName.trim() === userName.trim() && user.pass.trim() === password.trim(),
      );

      if (user) {
        ToastAndroid.show('Signin successful', ToastAndroid.SHORT);
        const token = user.token;
        await AsyncStorage.setItem('Token', token);
        await AsyncStorage.setItem('user_profile_data', JSON.stringify(user));
        setLoading(false);
        handleIsLogin(true)
        // Use the token for further authentication
      } else {
        ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      ToastAndroid.show('Error signing in:', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const _logo = {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    zIndex: 2,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Constants.gradientTwo,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar backgroundColor={Constants.gradientTwo} />
      <Animated.View
        style={{
          width: width * 2,
          height: height,
          borderRadius: 400,
          backgroundColor: Constants.gradientTwo,
          position: 'absolute',
          top: -(height / 2) + 100,
          zIndex: -1,
          transform: [{scale}],
        }}
      />
      <LinearGradient
        style={{
          position: 'absolute',
          zIndex: -2,
          bottom: 0,
          height: height / 1.25,
          width,
          backgroundColor: Constants.baseColor,
        }}
        colors={[Constants.baseColor, Constants.baseColor]}
      />
      <ScrollView
        style={{
          width: '100%',
          paddingHorizontal: 32,
          height,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: height - 20,
          }}>
          <Image source={Film} style={_logo} />
          <View
            style={{
              elevation: 2,
              backgroundColor: Constants.textColor,
              paddingVertical: 16,
              paddingHorizontal: 16,
              alignItems: 'center',
              borderRadius: 14,
              width: '99%',
              minHeight: height / 2.5,
            }}>
            <Text
              style={{
                textTransform: 'capitalize',
                color: Constants.gradientTwo,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Constants.basicFontColor,
                marginBottom: 30,
              }}>
              Please sign in to continue
            </Text>
            <Input
              value={userName}
              onChangeText={value => {
                onChange('userName', value);
              }}
              style={{
                color: Constants.basicFontColor,
              }}
              placeholder={'User Name'}
            />
            <View style={{position: 'relative', width: '100%'}}>
              <Input
                name="password"
                value={password}
                onChangeText={value => {
                  onChange('password', value);
                }}
                style={{
                  marginBottom: 12,
                  color: Constants.basicFontColors,
                }}
                placeholder={'Password'}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  right: 0,
                  top: 12,
                }}
                onPress={() => {
                  setShowPass(!showPass);
                }}>
                <Icon
                  size={20}
                  color={Constants.placeholderColor}
                  name={showPass ? 'eye' : 'eye-with-line'}
                />
              </TouchableOpacity>
            </View>
            <Button
              title={'SIGN IN'}
              style={{
                backgroundColor:Constants.gradientTwo
              }}
              onPress={() => {
                handleSignin();
              }}
              loading={loading}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 16,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 22,
                  color: '#fff',
                  textTransform: 'capitalize',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
