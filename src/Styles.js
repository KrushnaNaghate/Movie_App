import {Dimensions, StyleSheet} from 'react-native';
import Constants from './Constants';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  sectionBg: {
    backgroundColor: Constants.baseColor,
    height: deviceHeight,
  },
  trendingPeopleImage: {
    height: 70,
    width: 70,
    borderRadius: 500,
    elevation:10
  },
  trendingPeopleName: {
    width: '100%',
    color: Constants.textColor,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontWeight:'500'
  },
  trendingPeopleContainer: {
    margin: 10,
    width:70,
    backgroundColor:Constants.baseColor
  },
  heading: {
    fontSize: 19,
    color: Constants.fadedColor,
    margin: 10,
    fontWeight:'bold'
  },
  posterImage: {
    height: 250* 0.75,
    width: 150* 0.75,
    borderRadius: 10,
  },
  posterImage2: {
    height: 270* 0.75,
    width: 170* 0.75,
    borderRadius: 10,
  },
  movieTitle: {
    color: Constants.textColor,
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
    fontWeight:'700'
  },
  imageBg: {
    width: deviceWidth,
    height: 250,
  },
  detailsMovieTitle: {
    fontSize: 28,
    color: Constants.textColor,
    textAlign: 'center',
    marginTop: -40,
  },
  linkContainer: {
    backgroundColor: Constants.secondaryColor,
    borderRadius: 100,
    padding: 10,
    width: 45,
    marginLeft: 20,
    marginTop: -20,
  },
  overview: {
    color: Constants.textColor,
    marginHorizontal: 10,
    textAlign: 'justify',
    fontSize: 16,
  },
  details: {
    color: Constants.secondaryColor,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  genreContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Constants.textColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  genre: {
    color: Constants.textColor,
    fontSize: 16,
  },
});

export default Styles;
