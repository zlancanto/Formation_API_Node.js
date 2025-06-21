import {Request, Response} from "express";
import {PostModel} from "../models/post.model";

/* Get all */
export const getPostList = async (_: Request, res: Response) => {
    const postList = await PostModel.find()
    res.status(200).json(postList)
}

/* Create */
export const setPost = async (req: Request, res: Response) => {
    if (!req.body.message) {
        res.status(400).json({ message: 'Veuillez écrire un message' })
    }

    /* Création d'un nouvel objet */
    const newPost = await PostModel.create({
        message: req.body.message,
        author: req.body.author,
    })
    res.status(200).json({
        message: 'Post created successfully',
        data: newPost,
    })
}

/* Edit */
export const updatePost = async (req: Request, res: Response) => {
    const postToUpdate = await PostModel.findById(req.params.id)
    if (!postToUpdate) {
        res.status(404).json({message: 'Post not found'})
    }

    const postUpdated = await PostModel.findByIdAndUpdate(
        postToUpdate,
        req.body,
        {new: true}
    )

    res.status(200).json({
        message: 'Post updated successfully',
        data: postUpdated
    })
}

/* Delete */
export const deletePost = async (req: Request, res: Response) => {
    const postToDelete = await PostModel.findById(req.params.id)
    if (!postToDelete) {
        res.status(404).json({message: 'Post not found'})
    }

    const postDeleted = await PostModel.findByIdAndDelete(postToDelete)
    res.status(200).json({
        message: 'Post deleted successfully',
        data: postDeleted
    })
}

/* Like Post */
export const likePost = async (req: Request, res: Response) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.userId }
            },
            {new: true}
        ).then(data => res.status(200).send(data))
    }
    catch (error) {
        res.status(400).json(error)
    }
}

/* Dislike Post */
export const dislikePost = async (req: Request, res: Response) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.userId }
            },
            {new: true}
        ).then(data => res.status(200).send(data))
    }
    catch (error) {
        res.status(400).json(error)
    }
}