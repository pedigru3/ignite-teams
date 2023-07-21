import { ThemeProvider } from 'styled-components/native';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { Loading } from '@components/loading';

import theme from './src/theme';
import { StatusBar } from 'react-native';
import { Players } from '@screens/Players';

export default function App() {
  const [fontsLoad] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoad ? <Players/> : <Loading/>}
    </ThemeProvider>
  );
}
