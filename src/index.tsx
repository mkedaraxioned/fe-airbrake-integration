import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { costomTheme } from './styles/theme';
import { persistor, store } from './redux';
// import ErrorBoundary from '../src/components/errorBoundary/index';
// import {ErrorBoundary} from 'react-error-boundary';
// const ErrorFallback = ({error: any, resetErrorBoundary: any}) => {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   )
// }
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={costomTheme}>
      <ColorModeScript />
      <CSSReset />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
