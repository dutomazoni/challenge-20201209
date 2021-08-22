import { user_routes} from '../Controllers';
import { Router } from 'express';

let router = Router();

router.get(
    '/',
    user_routes.get_standard_message
);

router.get(
    '/users/:userId',
    user_routes.get_user
);

router.delete(
    '/users/:userId',
    user_routes.delete_user
);
router.put(
    '/users/:userId',
    user_routes.put_user
);

router.get(
    '/users',
    user_routes.get_users
);
router.post(
    '/users',
    user_routes.post_user
);

router.post(
    '/search_user/',
    user_routes.search_user
);

export default router;
