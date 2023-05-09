import { createTheme, NextUIProvider } from '@nextui-org/react';
import { globalStyles } from '../src/theme/styles';
import { UserProvider } from '../src/context/UserContext';
import { IUser } from '../src/interfaces/IUser';
import { useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      background: '#FFFFFF',
      text: '#000000',
    },
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#000000',
      text: '#FFFFFF',
    },
  }
})

const App = ({ Component, pageProps }) => {
  const [userData, setUserData] = useState<IUser>({
    name: null,
    email: null,
    profilePicture: null,
    token: null,
  });

  globalStyles();

  return (
    <UserProvider value={{ userData, setUserData }}>
      <NextThemesProvider
        defaultTheme="light"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </UserProvider>
  );
};

export default App;
