import * as React from 'react'
import { Global } from '@emotion/react';

const Fonts= () => (
  <Global
    styles={`
      @font-face {
        font-family: 'SourceSansPro-Black';
        src: url('../assets/fonts/SourceSans/SourceSansPro-Black.ttf');
        font-display: swap;
      }
      @font-face {
        font-family: 'SourceSansPro-Bold';
        src: url('../assets/fonts/SourceSans/SourceSansPro-Bold.ttf');
        font-display: swap;
      }
      @font-face {
        font-family: 'SourceSansPro-ExtraLight';
        font-style: normal;
        font-display: swap;
        font-weight: 200;
        src: url('../assets/fonts/SourceSans/SourceSansPro-ExtraLight.ttf') format('ttf');
      }
      @font-face {
        font-family: 'SourceSansPro-Light';
        src: url('../assets/fonts/SourceSans/SourceSansPro-Light.ttf');
        font-display: swap;
      }
      @font-face {
        font-family: 'SourceSansPro-Regular';
        src: url('../assets/fonts/SourceSans/SourceSansPro-Regular.ttf');
        font-display: swap;
      }
      @font-face {
        font-family: 'SourceSansPro-Semibold';
        src: url('../assets/fonts/SourceSans/SourceSansPro-Semibold.ttf');
        font-display: swap;
      }
      `}
  />
);

export default Fonts;
