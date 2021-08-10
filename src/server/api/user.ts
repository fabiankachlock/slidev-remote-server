/// <reference path="../../express-session.d.ts" />
import express from 'express';
import { ServerUserInfoResponse } from '../../../types/server';
import { UserDB } from '../../db/driver/users/UserDB';
import { isAuthenticated } from '../auth';

export const UserApi = express.Router();

UserApi.get('/info', async (req, res) => {
  let response: ServerUserInfoResponse | undefined = undefined;
  const id = req.session.user?.internalId;

  if (id) {
    const info = UserDB.user(id);
    console.log(info);
    if (info) {
      response = {
        loggedIn: info.loggedIn,
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

UserApi.get('/slides/previews', isAuthenticated, async (req, res) => {});

UserApi.get('/slides/:id', isAuthenticated, async (req, res) => {});

UserApi.delete('/slides/:id', isAuthenticated, async (req, res) => {});
