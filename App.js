import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeScreen from './HomeScreen';

const App = () => {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
};

export default App;
