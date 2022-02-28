import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';
import { AUTH_URL } from '../../src/utils/constants';

async function loginRoute(req, res) {
  // get user from database then:
  if (req.method === 'POST') {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (response.ok) {
      req.session.user = {
        id: data._id,
        name: data.name,
        email: data.email,
        token: data.token,
      };
      await req.session.save();
      res.send({ ok: true });
    }
  }
}

export default withIronSessionApiRoute(loginRoute, ironOptions);
