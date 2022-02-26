import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface IUser {
  name: string | null;
  email: string | null;
  profilePicture: string | null;
  token: string | null;
}

interface IUserContext {
  userData: IUser;
  setUserData?: Dispatch<SetStateAction<IUser>>;
}

const UserContext = createContext<IUserContext>({
  userData: {
    name: null,
    email: null,
    profilePicture: null,
    token: null,
  },
});

export const UserProvider = UserContext.Provider;

const useUserContext = () => {
  const { userData, setUserData } = useContext(UserContext);

  return { userData, setUserData };
};

export default useUserContext;
