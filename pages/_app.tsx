import { NextUIProvider } from "@nextui-org/react";

const App = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
};

export default App;
