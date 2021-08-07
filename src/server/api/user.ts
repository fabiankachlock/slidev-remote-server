/// <reference path="../../express-session.d.ts" />
import { ApiRouter } from '../api';
import { ServerUserInfoResponse } from '../../../types/server';
import { UserDB } from '../../db/driver/users/UserDB';

ApiRouter.get('/user/info', async (req, res) => {
  let response: ServerUserInfoResponse | undefined = undefined;
  const id = req.session.user?.internalId;

  if (id) {
    const info = UserDB.user(id);
    console.log(info);
    if (info) {
      response = {
        loggedIn: true,
        email: info.email
      };
    }
  }

  if (!response) {
    response = {
      loggedIn: false
    };
  }

  console.log(response);
  res.json(response);
});
