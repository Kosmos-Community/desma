import { DESIGN_USERS_URL } from '../src/utils/constants';

export const serverSideProps = async ({ req }: any): Promise<any> => {
  const user = req.session.user || null;
  if (!user) return { props: { user: null } };

  const isEmpty = Object.keys(user).length === 0;
  if (isEmpty) return { props: { user: null } };

  return {
    props: {
      user,
    },
  };
};

export const serverSidePropsDesigns = async ({ req }: any): Promise<any> => {
  const data = await serverSidePropsProtected({ req });
  if (!data.hasOwnProperty('props')) return data;
  const { user } = data.props;
  const responseDesigns = await fetch(`${DESIGN_USERS_URL}/${user.id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const userDesigns = await responseDesigns.json();
  if (responseDesigns.ok) {
    data.props['designs'] = userDesigns;
  }

  return data;
};

export const serverSidePropsProtected = async ({ req }: any): Promise<any> => {
  const user = req.session.user || null;
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const isEmpty = Object.keys(user).length === 0;
  if (isEmpty) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export const serverSidePropsAuth = async ({ req }: any): Promise<any> => {
  const user = req.session['user'] || null;
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
