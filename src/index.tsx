import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { persistor, store } from './store';
import { costomTheme } from './styles/theme';
import '@fontsource/source-sans-pro';
import Fonts from './styles/Fonts';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={costomTheme}>
      <Fonts />
      <ColorModeScript />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
