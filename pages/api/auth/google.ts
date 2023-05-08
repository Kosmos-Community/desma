import { google } from "googleapis";
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../../lib/config';
import { NextApiResponse, NextApiRequest } from "next";
import { AUTH_URL } from "../../../src/utils/constants";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENTE_SECRET } = process.env;


const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENTE_SECRET,
  'http://localhost:3000/api/auth/google'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
  from: 'http://localhost:3000/api/auth/google'
});

async function googleAuth(req, res: NextApiResponse) {
  if (req.method === "GET" && req.query?.code === undefined) {
    res.status(200).json({ url: authUrl });
    res.end();
  }
  else {
    const code = req.query.code as string;
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);
    const { data } = await google.oauth2("v2").userinfo.get({
      auth: oauth2Client,
    });

    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId: data.id,
      }),
    });

    const dataUser = await response.json();
    if (response.ok) {
      req.session.user = {
        id: dataUser._id,
        name: dataUser.name,
        email: dataUser.email,
        token: dataUser.token,
      };
      await req.session.save();
      res.redirect('/dashboard');
    }
    else {
      res.status(400).redirect('/auth/login');
    }
  }

}

export default withIronSessionApiRoute(googleAuth, ironOptions);
