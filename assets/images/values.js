import { Platform } from 'react-native'

const ios = Platform.OS === 'ios'

module.exports = {
  VALUES: {
    minSliderPinjaman: 1000000,
    maxSliderPinjaman: 10000000,
    stepSliderPinjaman: 500000,
    minSliderDurasiHari: 1,
    maxSliderDurasiHari: 31,
    minSliderDurasiBulan: 2,
    maxSliderDurasiBulan: 3,
    stepSliderDurasi: 1
  },
  COLORS: {
    actionBarColor: '#652D90',
    colorAppTheme: '#1A9B80',
    colorBackground: '#E9E9EF',
    colorWhite: '#fff',
    colorGreen: '#1a9b80',
    textGray: '#808082',
    textGreen: '#1a9b80',
    lineGray: '#CCCECF',
    lineGraySoft: '#dddddd',
    title: '#652D90',
    subtitle: '#92a4bf',
    trans: 'transparent',
    borderButton: '#259A7F',
    button: '#0fb3e3',
    textWhite: '#fff',
    buttonDark: '#0fb3e3',
    label: '#000',
    gradientStart: '#652D90',
    gradientEnd: '#D30E8B'
  },
  DIMENS: {
    actionbarHeight: 60,
    sliderHomeHeight: 200,
    paddingIcon: 5,
    paddingSmall: 5,
    paddingMedium: 10,
    iconSize: 30,
    fontSmall: 10,
    fontMedium: 13,
    fontBig: 15,
    fontTitle: 20,
    fontSubtitle: 18,
    fontButton: 16,
    fontLabel: 18,
    fontSlider: 18,
    fontSliderName: 15,
    iconSlider: 30
  },
  FONTS: {
    montserratLight: 'Montserrat-Light',
    montserratBold: 'Montserrat-Bold',
    montserratRegular: 'Montserrat-Regular'
  }

}
