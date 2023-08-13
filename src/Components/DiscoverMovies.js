import React, {useEffect, useState} from 'react';
import {View, Text,Dimensions,TouchableOpacity,ImageBackground} from 'react-native';
import {GET} from '../Services/API';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../config';
import Constants from '../Constants';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const {width,height} =Dimensions.get('window')
const DiscoverMovies = props => {
  const navigation = useNavigation()
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [activeSlide, setactiveSlide] = useState(0);


  useEffect(() => {
    const getMovies = async () => {
      const response = await GET('/discover/movie');
      setMovies(response.results);

      const images = response.results.map(
        data => `${IMAGE_POSTER_URL}${data.backdrop_path}`,
      );

      let backImages = [];
      for (let i = 0; i < 10; ++i) {
        backImages = [...backImages, images[i]];
      }

      setImages(backImages);
    };

    getMovies();
  }, []);
const _renderItem = ({item, index}) => {
  return (
    <TouchableOpacity style={{marginVertical: 10, height: width / 2.3,width:'100%',alignSelf:'center',elevation:10,borderRadius:6}}
    onPress={()=>{
    navigation.navigate('MovieDetails', {movieId: item.id})
    }}
    >
      <ImageBackground
        source={{uri:`${IMAGE_POSTER_URL}${item.backdrop_path}`}}
        imageStyle={{height: '100%', width: '100%',borderRadius:6}}
        style={{height: '100%', width: '100%',}}
        resizeMode='cover'
/>
    </TouchableOpacity>
  );
};
  return (
    <View style={{height:height/4}}>
    <View style={{width: '100%',alignSelf:'center',
    height: width / 2,justifyContent:'center',alignItems:'center',}}>

 <Carousel
  // ref={c => {
  //   this._carousel = c;
  // }}
  data={movies}
  renderItem={_renderItem}
  sliderWidth={width - 24}
  itemWidth={width - 24}
  autoplay={true}
  loop={true}
  onSnapToItem={index => {
    setactiveSlide(index);
    // console.log(index)
  }}
/> 
<Pagination
  dotsLength={movies.length}
  activeDotIndex={activeSlide}
  containerStyle={{
    backgroundColor: 'transparent',
    marginTop: -55,
    //  justifyContent:'center',
    width: 0,
  }}
  dotStyle={{
    width: 8,
    height: 8,
    borderRadius: 8,
    // marginHorizontal: 8,/
    backgroundColor:Constants.secondaryColor,
  }}
  inactiveDotStyle={{
    // Define styles for inactive dots here
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Constants.fadedColor,
  }}
  inactiveDotOpacity={0.6}
  inactiveDotScale={1}
/>
    </View></View>
  );
};

export default DiscoverMovies;
