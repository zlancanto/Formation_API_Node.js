import express, {Router} from 'express'
import {updatePost, getPostList, setPost, deletePost, likePost, dislikePost} from "../controllers/post.controller";

const postRouter: Router = express.Router()

postRouter.get('/', getPostList)
postRouter.post('/', setPost)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost)
postRouter.patch('/likePost/:id', likePost)
postRouter.patch('/dislikePost/:id', dislikePost)

export default postRouter