import { Router } from 'express';
import { httpCreateAccount, httpLogin } from './auth.controller';

const authRouter = Router();

authRouter.post('/create-account', httpCreateAccount);
authRouter.post('/login', httpLogin);

export default authRouter;
