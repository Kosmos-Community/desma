import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const reqLogin = await fetch('https://desma-test.onrender.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (reqLogin.ok) {
          const reqLoginData = await reqLogin.json();
          console.log('BACKEND', reqLoginData);
          return reqLoginData;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {},
  session: {
    token: 'test',
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
  },
});
