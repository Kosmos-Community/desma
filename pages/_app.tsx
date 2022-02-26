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

  //globalStyles();

  return (
    <UserProvider value={{ userData, setUserData }}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </UserProvider>
  );
};

export default App;
