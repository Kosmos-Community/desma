import { google } from "googleapis";
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../../../lib/config';
import { NextApiResponse, NextApiRequest } from "next";
import { REGISTER_URL } from "../../../../src/utils/constants";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/register/google'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
  from: 'http://localhost:3000/auth/register'
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
    
    const randomPassword = 'RandomPassword123#';
    const user = {
      googleId: data.id,
      name: data.name,
      email: data.email,
      password: randomPassword,
    }
    console.log(REGISTER_URL);
    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    console.log(response);


    const userData = await response.json();

    console.log(userData);

    // Save user to session
    if (response.ok) {
      req.session.user = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        token: userData.token,
      };
      await req.session.save();
      res.redirect('/dashboard');
    }
  }

}

export default withIronSessionApiRoute(googleAuth, ironOptions);
