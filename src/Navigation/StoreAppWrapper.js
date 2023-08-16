import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Search from '../Components/Search';
import Profile from '../Components/Profile';
import SignIn from '../Auth/SignIn';
import Constants from '../Constants';
import Home from '../Home';
import SignUp from '../Auth/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieDetails from '../Components/MovieDetails';
import { CardStyleInterpolators } from '@react-navigation/stack';
import AuthLoading from '../AuthLoading';
import { persistor } from '../Redux/Store';
import { useDispatch } from 'react-redux';
import ListScreen from '../ListScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();






const StoreAppWrapper = () => {
  const userIsSignedIn = true;
  const dispatch = useDispatch();
  const [isLogin, setisLogin] = useState(true);
  const [loading, setloading] = useState(true);


  const handleIsLogin = async value => {
    setisLogin(value);
    setloading(false);
  };

  const handleLogout = async(value) => {

    try {
      // dispatch(logoutAction());

      // Clear the persisted Redux store data from AsyncStorage
      persistor.purge().then(() => {
        console.log('Redux store data cleared');
      });
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      setisLogin(value);
      setloading(true);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
    // Dispatch your logout action to clear user data in Redux

  };

  const LoginStackNavigator = () => {
    const signin = props => (
      <SignIn handleIsLogin={handleIsLogin} />
    );
    const signun = props => (
      <SignUp handleIsLogin={handleIsLogin}  />
    );
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="SignIn" component={signin}  />
      <Stack.Screen name="SignUp" component={signun} />
  
    </Stack.Navigator> 
    );
  };
  const IfSignIn=()=>{
    const userIsSignedIn = isLogin;

    const profile = () => (
      <Profile  handleLogout={handleLogout} />
    );
      return(
          <>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, colors}) => {
                let iconName;
                colors = '#fff';
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Search') {
                  iconName = 'search';
                } else if (route.name === 'SignIn') {
                  iconName = 'user';
                } else if (route.name === 'Profile' ||route.name === 'LoginStackNavigator') {
                  iconName = 'user';
                }
  
                return (
                  <View
                    style={{
                      // paddingBottom: 15,
                      // borderBottomWidth: focused ? 3 : 0,
                      borderBottomColor: Constants.fontBlue,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height:20
                    }}>
                    <Feather
                      name={iconName}
                      size={focused ? 22 : 20}
                      color={focused ? Constants.fontBlue : Constants.surfaceColor}
                    />
                  </View>
                );
              },
              tabBarBadgeStyle: () => {},
            })}
            tabBarOptions={{
              activeTintColor: Constants.fontBlue,
              inactiveTintColor:Constants.black,
              activeBackgroundColor: Constants.fontBlue,
              inactiveBackgroundColor: 'red',
              labelStyle: {
                // fontFamily: font.primaryFont,
                fontSize: 8,
                // position: 'absolute',
                // paddingBottom: '10%',
                color:Constants.textColor,
                textAlign: 'center',
              
              },
            
            }}
            activeColor={Constants.surfaceColor}
            inactiveColor={Constants.surfaceColor}
            barStyle={{ backgroundColor: Constants.gradientTwo,height:70,padding:0 }}
            >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Home' ,
                headerStyle: {backgroundColor: Constants.fontBlue},
                headerTintColor: '#fff',
              }}
            />
  
            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                title:'Search',
                headerStyle: {backgroundColor: Constants.fontBlue},
                headerTintColor: 'red',
              }}
            />
            {userIsSignedIn ? (
           <Tab.Screen
           name="Profile"
           component={profile}
           options={{
             title: 'Profile',
             headerStyle: {backgroundColor: Constants.fontBlue},
             headerTintColor: '#fff',
           }}
         />)
         :(
  
         <Tab.Screen
         name="LoginStackNavigator"
         component={LoginStackNavigator}
         options={{
           title: 'Sign In',
           headerStyle: {backgroundColor: Constants.fontBlue},
           headerTintColor: '#fff',
         }}
       />)}
          </Tab.Navigator>
          </>
      )
  }
  const AuthComp = props => {
    console.log(props);
    const Auth = () => <AuthLoading handleIsLogin={handleIsLogin} />;
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="AuthComp"
          component={Auth}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    );
  };

  const MainStack=()=>{
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Main" component={IfSignIn}  />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
  
    </Stack.Navigator> 
    )
  }


  return (
loading ? AuthComp() : MainStack() 

  )
}

export default StoreAppWrapper