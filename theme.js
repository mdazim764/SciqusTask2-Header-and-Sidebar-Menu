// theme.js
import {MD3LightTheme} from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1568ed',
    accent: '#6b5b95',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    // Add or override MD3 variants:
    labelLarge: {
      fontFamily: 'Poppins', // Must match the linked font name
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
    },
    // If you want to define your own, e.g., bodyMedium, bodySmall, etc.
    bodyMedium: {
      fontFamily: 'Poppins',
      fontSize: 14,
      lineHeight: 20,
    },
    // You can override as many variants as you want here...
  },
};
