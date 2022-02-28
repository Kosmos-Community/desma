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
