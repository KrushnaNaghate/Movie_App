import React,{useEffect,useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DiscoverMovies from './Components/DiscoverMovies';
import Styles from './Styles';
import TrendingPeople from './Components/TrendingPeople';
import TrendingMovies from './Components/TrendingMovies';
import Header from './Components/Header';
import {POSTER_IMAGE} from './config';
import {useSelector, useDispatch} from 'react-redux';
import Constants from './Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';



const Home = props => {
  const favorites = useSelector(state => state.movies.favorites);
  const watchLater = useSelector(state => state.movies.watchLater);
  console.log('favorites', favorites);
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
  const displayMovies = ({item}, props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('MovieDetails', {movieId: item.id});
        }}
        style={{marginHorizontal: 10, width: 110}}>
        <Image
          source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
          style={Styles.posterImage}
        />
        <Text style={Styles.movieTitle}>{item.original_title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.sectionBg}>
      <Header rightComponent={
          <View style={{flexDirection:'row',paddingHorizontal:10,justifyContent:'space-between',alignItems:'center',width:90}}>
            <TouchableOpacity
                        onPress={()=>{
                          props.navigation.navigate('ListScreen',{from:'fav'})
                        }}>
            <Icon
                name={ "heart"}
                size={25}
                color={ Constants.textColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
                        onPress={()=>{
                          props.navigation.navigate('ListScreen',{from:'Later'})
                        }}>
            <EIcon name="add-to-list" size={25} color={ Constants.textColor} />
            </TouchableOpacity>
          </View>
      }/>
      <DiscoverMovies navigation={props.navigation} />
      <ScrollView>
        <TrendingPeople title="Trending People" url="/trending/person/week" />
        <TrendingMovies
          title="Trending Movies"
          url="/movie/top_rated"
          navigation={props.navigation}
        />
        {userData.userName ?
        <>
          <View style={{marginTop: 15}}>
            <View style={{flexDirection:'row',paddingHorizontal:10,justifyContent:'space-between',alignItems:'center'}}>
            <Text style={Styles.heading}>Favorites</Text>
            <TouchableOpacity
            
            onPress={()=>{
              props.navigation.navigate('ListScreen',{from:'fav'})
            }}>
            <Text style={{color: Constants.gradientTwo,paddingHorizontal:10,fontSize:20}}>
              More
              </Text>
            </TouchableOpacity>
            </View>
            {favorites.length > 0 ? (
            <FlatList
              keyExtractor={item => item.id}
              data={favorites}
              horizontal
              renderItem={item => displayMovies(item, props)}
            />): (
              <TouchableOpacity
              style={[
                Styles.posterImage,
                {
                  backgroundColor: Constants.fadedColor,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius:10
                },
              ]}
              onPress={()=>{
                props.navigation.navigate('Search')
              }}
              >
              <Text style={{color: Constants.baseColor,paddingHorizontal:10,fontSize:10}}>
                No Movies in Favorites,
                do you Want to Add click Here
              </Text>
            </TouchableOpacity>
            )}
          </View>
        <View style={{marginTop: 15}}>
        <View style={{flexDirection:'row',paddingHorizontal:10,justifyContent:'space-between',alignItems:'center'}}>
            <Text style={Styles.heading}>Watch Later</Text>
            <TouchableOpacity
            
            onPress={()=>{
              props.navigation.navigate('ListScreen',{from:'Later'})
            }}>
            <Text style={{color: Constants.gradientTwo,paddingHorizontal:10,fontSize:20}}>
              More
              </Text>
            </TouchableOpacity>
            </View>
          {watchLater.length > 0 ? (
            <FlatList
              keyExtractor={item => item.id}
              data={watchLater}
              horizontal
              renderItem={item => displayMovies(item, props)}
            />
          ) : (
            <TouchableOpacity
              style={[
                Styles.posterImage,
                {
                  backgroundColor: Constants.fadedColor,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius:10
                },
              ]}
              onPress={()=>{
                props.navigation.navigate('Search')
              }}
              >
              <Text style={{color: Constants.baseColor,paddingHorizontal:10,fontSize:10}}>
                No Movies in Watch Later,
                do you Want to Add click Here
              </Text>
            </TouchableOpacity>
          )}
        </View>
        </>
        :null}
        <View style={{height: 300, width: '100%'}} />
      </ScrollView>
    </View>
  );
};

export default Home;
