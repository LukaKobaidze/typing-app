import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import {
  httpGetHistory,
  httpGetProfile,
  httpPostCustomize,
} from './profile.controller';

const profileRouter = Router();

profileRouter.get('/', auth, httpGetProfile);
profileRouter.get('/history', auth, httpGetHistory);
profileRouter.post('/customize', auth, httpPostCustomize);

export default profileRouter;
