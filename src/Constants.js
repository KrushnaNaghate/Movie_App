const Constants = {
  textColor: '#fff',
  baseColor: '#151C26',
  fadedColor: '#969696',
  secondaryColor: '#F4C10F',
  fontBlue:'#37367C',
  blueThree:'#00ADEF',
  gadientOne:'#C850C0',
  gradientTwo:'#4158D0',
  borderColor: 'rgba(174, 172, 172, 0.7)',
  placeholderColor: 'rgba(174, 172, 172, 0.8)',
    secondaryFontColor: '#888888',
    basicFontColor: '#222',
    taskColor: '#7d49c2',

    darkPurple:'#9D0191',
    lightPurple:'#9C19E0',
    darkPink:'#FD3A69',
    faintPink:'#FF5DA2',
    yellow:'#FECD1A',
    skyBlue:'#99DDCC',
    primaryBlue:'#000D6B',
    secondaryBLue:'#3A0CA3',

    colorOne:'#f07167',
    colorTwo:'#fed9b7',
    colorThree:'#db00b6',
    coloFour:'#a44a3f',
    black:'#000000',
    surfaceColor:'#fff'
};

export const generateRandomToken = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 32;
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};


export default Constants;

// import Carousel, { Pagination } from 'react-native-snap-carousel';
// 
// <View style={{justifyContent: 'center', alignItems: 'center'}}>
// <Carousel
//   // ref={c => {
//   //   this._carousel = c;
//   // }}
//   data={arr}
//   renderItem={_renderItem}
//   sliderWidth={width - 10}
//   itemWidth={width - 10}
//   autoplay={true}
//   loop={true}
//   onSnapToItem={index => {
//     setactiveSlide(index);
//     // console.log(index)
//   }}
// />
// <Pagination
//   dotsLength={arr.length}
//   activeDotIndex={activeSlide}
//   containerStyle={{
//     backgroundColor: 'transparent',
//     marginTop: -55,
//     //  justifyContent:'center',
//     width: 0,
//   }}
//   dotStyle={{
//     width: 8,
//     height: 8,
//     borderRadius: 8,
//     // marginHorizontal: 8,/
//     backgroundColor: 'rgba(255, 255, 255, 0.90)',
//   }}
//   inactiveDotStyle={{
//     // Define styles for inactive dots here
//     width: 8,
//     height: 8,
//     borderRadius: 8,
//     backgroundColor: color.placeholderColor,
//   }}
//   inactiveDotOpacity={0.6}
//   inactiveDotScale={1}
// />
// </View>

// const _renderItem = ({item, index}) => {
//   return (
//     <TouchableOpacity style={{marginBottom: 5, height: width / 4}}>
//       <ImageBackground
//         source={item}
//         imageStyle={{height: '100%', width: '100%'}}
//         style={{height: '100%', width: '100%'}}
//         resizeMode="cover"></ImageBackground>
//     </TouchableOpacity>
//   );
// };