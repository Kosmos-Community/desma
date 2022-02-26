import { NextUIProvider } from '@nextui-org/react';
import { globalStyles } from '../src/theme/styles';
import { UserProvider } from '../src/context/UserContext';
import { IUser } from '../src/interfaces/IUser';
import { useState } from 'react';

const App = ({ Component, pageProps }) => {
  const [userData, setUserData] = useState<IUser>({
    name: null,
    email: null,
    profilePicture: null,
    token: null,
  });

  globalStyles();

  return (
    <NextUIProvider>
      <UserProvider value={{ userData, setUserData }}>
        <Component {...pageProps} />
      </UserProvider>
    </NextUIProvider>
  );
};

export default App;
