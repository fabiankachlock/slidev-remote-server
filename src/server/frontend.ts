import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const FrontendRouter = express.Router();

if (process.env.NODE_ENV !== 'production') {
  FrontendRouter.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true
    })
  );
} else {
  FrontendRouter.use(express.static('dist/frontend'));

  FrontendRouter.use((_req, res, _next) => {
    res.sendFile('dist/frontend/index.html');
  });
}
