import { NextUIProvider } from '@nextui-org/react';
import { globalStyles } from '../src/theme/styles';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  globalStyles();

  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
};

export default App;
