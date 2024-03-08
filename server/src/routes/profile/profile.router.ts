import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import { httpGetProfile, httpPostCustomize } from './profile.controller';

const profileRouter = Router();

profileRouter.get('/', auth, httpGetProfile);
profileRouter.post('/customize', auth, httpPostCustomize);

export default profileRouter;
