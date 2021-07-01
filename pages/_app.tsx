import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import '../styles/globals.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import Head from 'next/head'
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
          <Layout>
              <Head>
              <title>MobiStore - Online Mobile Store</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} />
          </Layout>
      </Provider>
)
}
export default MyApp
