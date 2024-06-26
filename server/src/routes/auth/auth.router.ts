import { Router } from 'express';
import {
  httpChangePassword,
  httpChangeUsername,
  httpCreateAccount,
  httpGithubAccessToken,
  httpGithubFinalSteps,
  httpGoogleAccessToken,
  httpGoogleFinalSteps,
  httpLogin,
  httpLogout,
} from './auth.controller';
import auth from '../../middlewares/auth.middleware';

const authRouter = Router();

authRouter.get('/github/access-token', httpGithubAccessToken);
authRouter.post('/github/final-steps', httpGithubFinalSteps);

authRouter.get('/google/access-token', httpGoogleAccessToken);
authRouter.post('/google/final-steps', httpGoogleFinalSteps);

authRouter.post('/create-account', httpCreateAccount);
authRouter.post('/login', httpLogin);
authRouter.post('/logout', httpLogout);

authRouter.post('/change-username', auth, httpChangeUsername);
authRouter.post('/change-password', auth, httpChangePassword);

export default authRouter;
