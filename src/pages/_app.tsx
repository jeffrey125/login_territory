import { Global, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';

import { rtlCache } from '@src/rtl-chache';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Jeffrey Asilo</title>
        <meta name='description' content='Technical Examination' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div dir='rtl'>
        <Global
          styles={(theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },

            html: {
              height: '100%',
              scrollBehavior: 'smooth',
            },

            '#__next': {
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              margin: 0,
            },

            section: {
              maxWidth: 1536,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 20,
              marginRight: 20,

              [theme.fn.largerThan('sm')]: {
                marginLeft: 40,
                marginRight: 40,
              },

              [theme.fn.largerThan('md')]: {
                marginLeft: 80,
                marginRight: 80,
              },

              [`@media (min-width: 1600px)`]: {
                marginLeft: 'auto',
                marginRight: 'auto',
              },
            },
          })}
        />
        <MantineProvider
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            focusRing: 'auto',
            fontFamily: 'Roboto, sans-serif',
            dir: 'rtl',
          }}
          emotionCache={rtlCache}>
          <NotificationsProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </NotificationsProvider>
        </MantineProvider>
      </div>
    </>
  );
};

export default App;
