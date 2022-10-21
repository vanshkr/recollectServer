import express from 'express';

const app = express();
import {signIn,signUp} from '../controllers/users.js';
const router = express.Router();//creates new Router object

router.post('/signin',signIn);
router.post('/signup',signUp);
export default router;