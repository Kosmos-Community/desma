import {
  DESIGN_USERS_URL,
  DESIGN_URL,
  PALETTE_URL,
  FONT_URL,
  SPACING_URL,
} from '../src/utils/constants';

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

export const serverSidePropsDesigner = async ({ params, req }: any): Promise<any> => {
  // Check if User is logged in
  const data = await serverSidePropsProtected({ req });

  // Redirect to / if user isn't logged in
  if (!data.hasOwnProperty('props')) return data;

  // Get the user data
  const { user } = data.props;

  // Fetch the current design system info
  const resDesigner = await fetch(`${DESIGN_URL}/${params.designer_id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  // Redirect to dashboard if the DS doesn't exist
  if (resDesigner.status == 400 || resDesigner.status == 404) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  }

  const resDesignerData = await resDesigner.json();

  data.props['info'] = resDesignerData;

  data.props['palette'] = await getColors(user.token, resDesignerData.data.paletteId);
  data.props['fonts'] = await getFonts(user.token, resDesignerData.data.fontsId);
  data.props['spacing'] = await getSpacing(user.token, resDesignerData.data.spacingsId);
  delete data.props.palette._id;
  delete data.props.fonts._id;
  delete data.props.spacing._id;

  return data;
};

const getColors = async (userToken: string, id: string) => {
  const resColors = await fetch(`${PALETTE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const resColorsData = await resColors.json();
  return resColorsData;
};

const getFonts = async (userToken: string, id: string) => {
  const resFonts = await fetch(`${FONT_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const resFontsData = await resFonts.json();
  return resFontsData;
};

const getSpacing = async (userToken: string, id: string) => {
  const resSpacing = await fetch(`${SPACING_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const resSpacingData = await resSpacing.json();
  return resSpacingData;
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
