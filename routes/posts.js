import express from 'express';
import {getPostsByCreator,commentPost,getPost, getPostsBySearch, getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
const app = express();
const router = express.Router();//creates new Router object
import auth from '../middleware/auth.js';

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router; 