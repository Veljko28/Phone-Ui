import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
        <Head>
        <title>MobiStore - Online Mobile Store</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Provider>)
}
export default MyApp
