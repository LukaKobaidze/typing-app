import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import {
  httpClearHistory,
  httpGetHistory,
  httpGetProfile,
  httpPostCustomize,
  httpResetStats,
} from './profile.controller';

const profileRouter = Router();

profileRouter.get('/', auth, httpGetProfile);
profileRouter.get('/history', auth, httpGetHistory);
profileRouter.post('/customize', auth, httpPostCustomize);
profileRouter.post('/clear-history', auth, httpClearHistory);
profileRouter.post('/reset-stats', auth, httpResetStats);

export default profileRouter;
