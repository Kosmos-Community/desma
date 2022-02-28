const { NODE_ENV, IRON_COOKIE, IRON_PASSWORD } = process.env;

export const ironOptions = {
  cookieName: IRON_COOKIE,
  password: IRON_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: NODE_ENV === 'production',
  },
};
