// theme.js
import {DefaultTheme} from 'react-native-paper';

// The font family name should match the linked font's name exactly
// If you have multiple weights (Regular, Bold, etc.), define them here
export const theme = {
  ...DefaultTheme,
  fonts: {
    regular: {
      fontFamily: 'Poppins',
    },
    medium: {
      fontFamily: 'Poppins',
    },
    light: {
      fontFamily: 'Poppins',
    },
    thin: {
      fontFamily: 'Poppins',
    },
    bold: {
      fontFamily: 'Poppins',
    },
  },
  // You can also override Paper colors if you want
  colors: {
    ...DefaultTheme.colors,
    primary: '#1568ed',
    accent: '#6b5b95',
  },
};
