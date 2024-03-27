import { Router } from 'express';
import {
  httpChangePassword,
  httpChangeUsername,
  httpCreateAccount,
  httpLogin,
  httpLogout,
} from './auth.controller';
import auth from '../../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/create-account', httpCreateAccount);
authRouter.post('/login', httpLogin);
authRouter.post('/logout', httpLogout);
authRouter.post('/change-username', auth, httpChangeUsername);
authRouter.post('/change-password', auth, httpChangePassword);

export default authRouter;
