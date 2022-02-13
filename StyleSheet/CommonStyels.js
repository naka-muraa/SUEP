import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  pagePadding: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
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
  basicColorTomato: {
    color: 'tomato',
  },
  basicColorGrey: {
    color: 'gray',
  },
  basicColorDimGray: {
    color: 'dimgray',
  },
  basicColorBlue: {
    color: '#00acee',
  },
});

export default CommonStyles;
