import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Styles from './Styles';
import { POSTER_IMAGE } from './config';
import { useNavigation,useRoute } from '@react-navigation/native';
import Header from './Components/Header';
import Constants from './Constants';
const {height, width} = Dimensions.get('window');
const ListScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const {from}= route.params
    const favorites = useSelector(state => state.movies.favorites);
    const watchLater = useSelector(state => state.movies.watchLater);

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
      <Header title={from === 'fav' ? 'favorites' : 'Watch Later' } />
      {favorites.length > 0 ? (
            <FlatList
              data={from === 'fav' ? favorites: watchLater}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              style={{width:width,alignSelf:'center',marginTop:10}}
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
            />): (
              <View
                style={[
                  Styles.posterImage,
                  {
                    backgroundColor: Constants.fadedColor,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:10
                  },
                ]}>
                <Text style={{color: Constants.baseColor}}>
                  No Movies in Favorites
                </Text>
              </View>
            )}
      </View>
  )
}

export default ListScreen