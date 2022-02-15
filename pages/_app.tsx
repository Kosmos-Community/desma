import { NextUIProvider } from '@nextui-org/react';
import { globalStyles } from '../src/theme/styles';

const App = ({ Component, pageProps }) => {
  globalStyles();
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
};

export default App;
