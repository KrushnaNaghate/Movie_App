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
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Constants from '../Constants';
import Header from './Header';
import Feather from 'react-native-vector-icons/Feather';
import Film from '../../assets/film.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Switch, Text} from 'react-native-paper';
import Input from './Input';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import {Button, Divider, List} from 'react-native-paper';
import axios from 'axios';
import {API_KEY, BASE_URL, POSTER_IMAGE} from '../config';
import Styles from '../Styles';
import BottomModal from './BottomModal';
import { Dropdown } from 'react-native-element-dropdown';
import CustomDropdown from './CustomDropdown';

const {height, width} = Dimensions.get('window');

const Search = (props) => {
  const [searchText, setSearchText] = useState({});
  const [aniVisible, setAniVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [modalVisible,setmodalVisible]=useState(false)
  const [genres, setGenres] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedGen, setSelectedGen] = useState(null);
  const [includeAdult, setIncludeAdult] = useState(false);

  const toggleSwitch = () => {
    setIncludeAdult(previousState => !previousState);
  };
  const data = [
    { label: 'Popularity Ascending', value: 'popularity.asc' },
    { label: 'Popularity descending ', value: 'popularity.desc' },
    { label: 'Revenue Ascending', value: 'revenue.asc' },
    { label: 'Revenue descending ', value: 'revenue.desc' },
    { label: 'Release Date Ascending', value: 'primary_release_date.asc' },
    { label: 'Release Date descending ', value: 'primary_release_date.desc' },
    { label: 'Vote Avg. Ascending', value: 'vote_average.asc' },
    { label: 'Vote Avg. descending ', value: 'vote_average.desc' },
    { label: 'Vote Count Ascending', value: 'vote_count.asc' },
    { label: 'Vote Count descending ', value: 'vote_count.desc' },
  ];



  // const fetchMovies = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL}/discover/movie?api_key=YOUR_API_KEY&sort_by=popularity.desc`,
  //       {params: {}},
  //     );
  //     setMovies(response.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const API_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
  const API_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&query`;
  useEffect(() => {
getAllMovie()
fetchGenres()
  }, []);

  getAllMovie=()=>{
    var url =API_URL+`&include_adult=${includeAdult}`
    // if (selectedGen) {
    //   url += `&genres=${selectedGen}`;
    // }
    if (selectedValue) {
      url += `&sort_by=${selectedValue}`;
    }
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setMovies(data.results);
    });
  }

  const searchMovie = async e => {
    console.log('Searching');
    try {
      const url = `${API_SEARCH}=${searchText}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log('errr',e);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
    if(!searchText){
      getAllMovie()
    }
  }, [searchText]);

  const startAni = () => {
    if (aniVisible) {
      setTimeout(() => {
        setSortVisible(false);
      }, 900);
      setAniVisible(false);
    } else {
      setSortVisible(true);
      setAniVisible(true);
    }
  };

  const applyFilter =()=>{
    setSearchText('')
    setmodalVisible(!modalVisible)
    setTimeout(() => {  getAllMovie() }, 500)
   
  }
  const reset=()=>{
    setSelectedGen(null)
    setSelectedValue(null)
    setmodalVisible(!modalVisible)
    setTimeout(() => { getAllMovie() }, 500)
  }
  const animation = aniVisible
    ? {animation: 'fadeInRightBig'}
    : {animation: 'fadeOutRightBig'};
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Constants.baseColor, zIndex: 1}}>
      <Header title={'All Movies'} />
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 0,
        }}>
        <Feather
          style={{position: 'absolute', top: 7, left: 12, zIndex: 1}}
          name="search"
          size={24}
          color={Constants.placeholderColor}
        />
        <TextInput
          value={searchText}
          placeholder={'Search'}
          onChangeText={value => {
            setSearchText(value);
            searchMovie();
          }}
          placeholderTextColor={Constants.basicFontColor}
          // onFocus={
          //   this.setState({
          //       SuggVisible: true
          //   })
          // }

          // onBlur={
          //   this.setState({
          //     SuggVisible: false
          //   })
          // }
          style={{
            backgroundColor: Constants.surfaceColor,
            // paddingHorizontal: 5,
            borderBottomWidth: 0,
            // paddingVertical: 3,
            color: Constants.basicFontColor,
            fontSize: 16,
            lineHeight: 18,
            paddingVertical: 5,
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            paddingLeft: 40,
            paddingRight: 28,
            width: '87%',
            borderRadius: 4,
            zIndex: 0,
          }}
          // width={'100%'}
          // value={this.state.searchText}
        />
        {searchText !== '' ? (
          <TouchableOpacity
            style={{position: 'absolute', top: 7, right: width / 7, zIndex: 1}}
            onPress={() => {
           setSearchText('')
            }}>
            <Entypo name="cross" size={24} color={Constants.placeholderColor} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{
            height: 38,
            width: 38,
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            backgroundColor: Constants.surfaceColor,
          }}
          onPress={()=>{
            setmodalVisible(!modalVisible)
          }}>
          <View
            style={{
              marginTop: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="sliders"
              size={16}
              color={Constants.baseColor}
              // style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 8,
                color: Constants.baseColor,
                alignSelf: 'center',
              }}>
              Filter
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={{width:width,alignSelf:'center'}}
        columnWrapperStyle={{
          justifyContent:'space-around',
          alignItems:'center',
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('MovieDetails', {movieId: item.id});
            }}
            style={{ marginBottom:40,width: width/2-50, zIndex: 1,backgroundColor:Constants.baseColor,}}>
            <Image
              source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
              style={Styles.posterImage2}
              alt={item.original_title}
            />
            <Text style={Styles.movieTitle}>{item.original_title}</Text>
          </TouchableOpacity>
        )}
      />
              <BottomModal
          isVisible={modalVisible}
          onBackButtonPress={() => {
            setmodalVisible(false)
          }}
          onBackdropPress={() => {
            setmodalVisible(false)
          }}
          component={
            <View
            style={{
              paddingHorizontal: 16,
              height:400
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                color:Constants.surfaceColor,
                fontWeight:'bold',
                marginTop:10,
                // textTransform: 'capitalize',
              }}>
             Filter Sort
            </Text>
            <Text
              style={{
                color: 'red',
                alignSelf: 'center',
                fontSize: 10,
                marginVertical: 12,
              }}>
              Due to TMDB api limitations at a time either you can search or Filter sort
            </Text>
                  <CustomDropdown
            data={data}
            placeholder="Select an sort filter "
            valueField={'value'}
            labelField={'label'}
            value={selectedValue}
            onSelect={item => setSelectedValue(item.value)}/>
            <View style={{height:20}}/>
                              {/* <CustomDropdown
            data={genres}
            placeholder="Select an Genres"
            valueField={'id'}
            labelField={'name'}
            value={selectedValue}
            onSelect={item => setSelectedGen(item.id)}/> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 15,
                color:Constants.surfaceColor,
                fontWeight:'bold',
                marginTop:10,
                // textTransform: 'capitalize',
              }}>
           Include Adult 
            </Text>
                
                  <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={includeAdult ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={includeAdult}
      />
    </View>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 ,marginTop:100}}>
      <Button
        mode="contained"
        onPress={applyFilter}
        style={{ flex: 1, marginHorizontal: 5, backgroundColor: '#4158D0' }}
      >
        Apply filter
      </Button>
      <Button
        mode="contained"
        onPress={reset}
        style={{ flex: 1, marginHorizontal: 5, backgroundColor: '#4158D0' }}
      >
        Reset
      </Button>
    </View>
            </View>
           
          }
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 16,
    opacity:1
    // marginTop:'30%'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  applyButton: {
    marginTop: 15,
  },
});

export default Search;
