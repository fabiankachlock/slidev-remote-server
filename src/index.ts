import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import sanitize from 'sanitize-filename';

const server = express();
const fileUpload = multer();
const uploadDir = 'uploads';

server.use(async (req, _res, next) => {
  console.info(`[${req.method}]  ${req.url}`);
  next();
});
server.use(express.json());

const app = express.Router();

app.get('/ping', async (req, res) => {
  res.send('pong');
});

app.post('/upload', fileUpload.array('upload-files'), (req, res) => {
  if (req.files) {
    console.log('req.files.length = ', req.files.length);
    const id = uuid();
    fs.mkdir(path.join(uploadDir, id));

    Promise.resolve(req.files)
      .then(files => {
        if (!Array.isArray(files)) return;

        for (const file of files) {
          console.log(' Writing POSTed data :', file.originalname);
          //var sanitized_filename = sanitize(file.originalname);
          const fileName = path.join(uploadDir, id, file.originalname);

          return fs.writeFile(fileName, file.buffer);
        }
      })
      .catch(err => console.log(err))
      .then(() => {
        console.log('Added files : Success');
        return res.sendStatus(200);
      });
  }
});

server.use('/api', app);
console.log();

if (process.env.NODE_ENV !== 'production') {
  server.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true
    })
  );
} else {
  server.use(express.static('dist/frontend'));

  server.use((_req, res, _next) => {
    res.sendFile('dist/frontend/index.html');
  });
}

server.use(express.static('web'));

server.listen(5000, () => console.info('Server started!'));
