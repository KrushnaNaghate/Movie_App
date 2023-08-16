import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGE_POSTER_URL} from '../config';
import {GET} from '../Services/API';
import Styles from '../Styles';
import Loader from './Loader';
import EIcon from 'react-native-vector-icons/Entypo';
import Constants from '../Constants';
import TrendingMovies from './TrendingMovies';
import TrendingPeople from './TrendingPeople';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, addToWatchLater, removeFromWatchLater } from '../Redux/slices/MovieSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieDetails = props => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.movies.favorites);
  const watchLater = useSelector(state => state.movies.watchLater);
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/movie/${props.route.params.movieId}`);
      setDetails(data);
      console.log('data',data.id);
      setLoading(false);
    };

    getDetails();
  }, []);
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

  const getGenre = () => {
    return details.genres.map(genre => (
      <>
      <View style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genre.name}</Text>
      </View>
      <View style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genre.name}</Text>
      </View>
      </>
    ));
  };

  const handleFavoriteToggle = movie => {
    if (favorites.find(item => item.id === movie.id)) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const handleWatchLaterToggle = movie => {
    if (watchLater.find(item => item.id === movie.id)) {
      dispatch(removeFromWatchLater(movie.id));
    } else {
      dispatch(addToWatchLater(movie));
    }
  };
  const isFavorite = favorites.find(fav => fav.id === details?.id);
  const isWatchLater = watchLater.find(wl => wl.id === details?.id);
  return (
    <ScrollView style={Styles.sectionBg}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <View>
            <Image
              source={{uri: `${IMAGE_POSTER_URL}${details.backdrop_path}`}}
              style={Styles.imageBg}
            />
          </View>
          {/* <Text style={Styles.detailsMovieTitle}></Text> */}
          <Text style={{width:'95%',alignSelf:'center',textAlign:'left',color:Constants.textColor,fontWeight:'bold',fontSize:26,marginVertical:20}}>{details.original_title}</Text>
                    <View
            style={{
              width: '70%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              // borderColor: color.borderColor,
              // borderBottomWidth: 0.5,
              paddingBottom: 10,
            }}>
              {userData.userName ?
              <>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                height: 40,
                alignItems: 'center',
                width: 40,
                borderRadius:25,
                backgroundColor:Constants.baseColor,
                elevation:10,
                 borderColor: Constants.textColor,
              borderWidth: 0.5,
              }}
              onPress={()=>{
                handleFavoriteToggle(details);
              }}
              >
              <Icon
                name={isFavorite ? "heart":"heart-outline"}
                size={20}
                color={isFavorite ? 'red':Constants.textColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                height: 40,
                alignItems: 'center',
                width: 40,
                borderRadius:25,
                backgroundColor:Constants.baseColor,
                elevation:10,
                 borderColor: Constants.textColor,
              borderWidth: 0.5,
              }}
              onPress={() => {
                handleWatchLaterToggle(details)
              }}>
              <EIcon name="add-to-list" size={20} color={isWatchLater ? Constants.darkPink :Constants.textColor} />
            </TouchableOpacity>
            </>:null}
            {details.homepage ? (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                height: 40,
                alignItems: 'center',
                width: 40,
                borderRadius:25,
                backgroundColor:Constants.baseColor,
                elevation:10,
                 borderColor: Constants.textColor,
              borderWidth: 0.5,
              }}
              onPress={() => {
                Linking.openURL(details.homepage);
              }}>
              <Icon name="link" size={20} color={Constants.textColor} />
            </TouchableOpacity>):null}
          </View>

          <Text style={[[Styles.heading,{fontSize:15}],{fontSize:15}]}>OVERVIEW</Text>
          <Text style={[Styles.overview,{fontSize:12}]}>{details.overview}</Text>
          <Text style={[Styles.overview,{fontSize:19,marginTop:15,fontWeight:'bold'}]}>IMDB : <Text style={{color:Constants.secondaryColor,fontWeight:'bold'}}>{details.vote_average} </Text><Icon name="star" size={15} color={Constants.secondaryColor} /></Text>

          <View style={Styles.detailsContainer}>
            <View>
              <Text style={[Styles.heading,{fontSize:15}]}>BUDGET</Text>
              <Text style={Styles.details}>$ {details.budget}</Text>
            </View>
            

            <View>
              <Text style={[Styles.heading,{fontSize:15}]}>DURATION</Text>
              <Text style={Styles.details}>{details.runtime} min.</Text>
            </View>

            <View>
              <Text style={[Styles.heading,{fontSize:15}]}>RELEASE DATE</Text>
              <Text style={Styles.details}>{details.release_date}</Text>
            </View>
          </View>

          <Text style={[Styles.heading,{fontSize:15}]}>GENRE</Text>
       
          <ScrollView horizontal>
            {getGenre()}
          </ScrollView>

          <TrendingPeople
            title="CAST"
            url={`/movie/${props.route.params.movieId}/credits`}
            isForPage="details"
          />

          <TrendingMovies
            title="SIMILAR MOVIES"
            navigation={props.navigation}
            url={`/movie/${props.route.params.movieId}/similar`}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetails;
