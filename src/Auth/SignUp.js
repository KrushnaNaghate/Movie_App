import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
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
import Constants, {generateRandomToken} from '../Constants';
import Button from '../Components/Button';
import SInfo from 'react-native-sensitive-info';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const SignUp = ({handleIsLogin}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [scale] = useState(new Animated.Value(0));
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    _starAnimation();
  }, []);

  const _starAnimation = () => {
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
  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword || !phoneNumber) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return;
    }
    if (!validateEmail(email)) {
      ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
      return;
    }

    const token = generateRandomToken(); // Generate a random token

    const newUser = {
      userName: username.trim(),
      email:email.trim(),
      pass: password.trim(),
      phone: phoneNumber.trim(),
      token,
    };

    try {
      // Retrieve existing user data or create an empty array
      const encryptedUserData = await SInfo.getItem('user_data', {});
      const existingUserData = JSON.parse(encryptedUserData) || [];

      // Add the new user to the array
      existingUserData.push(newUser);

      // Encrypt and save updated user data
      await SInfo.setItem('user_data', JSON.stringify(existingUserData), {});
      ToastAndroid.show('Signup successful..Logging In...', ToastAndroid.LONG);
      await AsyncStorage.setItem('Token', token.toString());
      await AsyncStorage.setItem('user_profile_data', JSON.stringify(newUser));
      setLoading(false);
      handleIsLogin(true);
    } catch (error) {
      console.error('Error signing up:', error);
      ToastAndroid.show('Error signing up:', ToastAndroid.SHORT);
    }
  };

  const _logo = {
    width: 130,
    height: 130,
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
          transform: [{scale: scale}],
        }}></Animated.View>
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
              Sign Up
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Constants.basicFontColor,
                marginBottom: 20,
              }}>
              Create your account
            </Text>
            <Input
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              name="email"
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              name="email"
              //   keyboardType={'email-address'}
            />
            {/* <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
              name="email"
              keyboardType={'email-address'}
            /> */}
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />
            <View style={{position: 'relative', width: '100%'}}>
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
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
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={{
                marginBottom: 12,
              }}
            />
            <Button
              title={'SIGN Up'}
              onPress={() => {
                handleSignup();
              }}
              style={{backgroundColor: Constants.gradientTwo}}
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
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 22,
                  color: '#fff',
                  textTransform: 'capitalize',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
