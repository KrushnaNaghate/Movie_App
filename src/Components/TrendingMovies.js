import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {POSTER_IMAGE} from '../config';
import {GET} from '../Services/API';
import Styles from '../Styles';
import Loader from './Loader';

const TrendingMovies = props => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();

  useEffect(() => {
    const getMovies = async () => {
      const data = await GET(props.url);
      console.log("data[0]",data[0]);
      setMovies(data.results);
      setLoading(false);
    };

    getMovies();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text style={Styles.heading}>{props.title}</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={movies}
            horizontal
            renderItem={item => displayMovies(item, props)}
          />
        </View>
      )}
    </View>
  );
};

const displayMovies = ({item}, props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.url.includes("similar")) {
          props.navigation.push('MovieDetails', {movieId: item.id});
        } else {
          props.navigation.navigate('MovieDetails', {movieId: item.id});
        }
      }}
      style={{marginHorizontal: 10,width:110}}>
      <Image
        source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
        style={Styles.posterImage}
      />
      <Text style={Styles.movieTitle}>{item.original_title}</Text>
    </TouchableOpacity>
  );
};

export default TrendingMovies;
