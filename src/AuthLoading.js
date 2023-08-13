import { View, Text,SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'
import { color } from '../constant/constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import Indicator from './Components/Indicator';
import Constants from './Constants';


const AuthLoading = ({handleIsLogin}) => {
    const route = useRoute();
    const param = route;


    useEffect(() => {
        checkLoginStatus()
    }, [])

   const checkLoginStatus = async() =>{
    const userToken = await AsyncStorage.getItem('Token');
    handleIsLogin(userToken ? true : false)
   } 
    
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Constants.baseColor,  justifyContent: 'center',
    alignItems: 'center'}}>
        <Indicator colors={Constants.textColor} size={30}/>
    </SafeAreaView>
  )
}

export default AuthLoading