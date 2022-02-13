import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  viewPageContainer: {
    margin: 5,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
  },
  scrollViewPageContainer: {
    margin: 5,
    padding: 5,
    flex: 1,
  },
  largeFont: {
    fontSize: 18,
  },
  basicFont: {
    fontSize: 16
  },
  smallFont: {
    fontSize: 14
  },
  largeFontBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorTomato: {
    color: 'tomato',
  },
  colorGray: {
    color: 'gray',
  },
  colorDimGray: {
    color: 'dimgray',
  },
  colorBlue: {
    color: '#00acee',
  },
  bgColorWhite: {
    backgroundColor: 'white',
  },
  bgColorTomato: {
    backgroundColor: 'tomato',
  },
});

export default CommonStyles;
