import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import { httpTypingCompleted, httpTypingStarted } from './typing.controller';

const typingRouter = Router();

typingRouter.post('/started', auth, httpTypingStarted);
typingRouter.post('/completed', auth, httpTypingCompleted);

export default typingRouter;
