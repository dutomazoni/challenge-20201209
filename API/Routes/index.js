import user_routes from './user.routes';
import { Router } from 'express';

var router = Router();

router.use(user_routes);

export default router;
