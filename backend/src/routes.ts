
import { Router } from 'express';
import multer from 'multer';

import uploadsConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadsConfig);

routes
  .post('/orphanages', upload.array('images'), OrphanagesController.create);
routes
  .get('/orphanages', OrphanagesController.index)
  .get('/orphanages/:id', OrphanagesController.show);

export default routes;