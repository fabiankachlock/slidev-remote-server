/// <reference path="../../express-session.d.ts" />
import express from 'express';
import { ServerUserInfoResponse } from '../../../types/server';
import { SlidesDB } from '../../db/driver/slides/SlidesDB';
import { UserDB } from '../../db/driver/users/UserDB';
import { isAuthenticated } from '../auth';
import { readSession } from '../auth/utils';

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

UserApi.get('/slides/previews', isAuthenticated, async (req, res) => {
  const data = readSession(req);
  if (data) {
    const slides = SlidesDB.getPreviews(data.internalId);
    return res.json(slides);
  }
  res.sendStatus(401);
});

UserApi.get('/slides/:id', isAuthenticated, async (req, res) => {
  const data = readSession(req);
  if (data) {
    const slide = SlidesDB.getSlide(req.params.id);
    console.log(slide);
    if ((slide && slide.owner === data.internalId) || !slide) return res.json(slide);
  }
  res.sendStatus(401);
});

UserApi.delete('/slides/:id', isAuthenticated, async (req, res) => {});
