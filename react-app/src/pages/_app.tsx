
import React from 'react';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import objStore from 'src/store/config/getStore';
import '../styles/globals.css'


const { store } = objStore;

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}><Component {...pageProps} /></Provider>;
}

export default MyApp
