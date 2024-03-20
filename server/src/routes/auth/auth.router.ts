import { Router } from 'express';
import { httpCreateAccount, httpLogin, httpLogout } from './auth.controller';

const authRouter = Router();

authRouter.post('/create-account', httpCreateAccount);
authRouter.post('/login', httpLogin);
authRouter.post('/logout', httpLogout);

export default authRouter;
