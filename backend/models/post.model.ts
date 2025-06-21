import {model, Schema} from "mongoose";

const postSchema = new Schema({
        message: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        likers: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
    }
)

export const PostModel = model("Post", postSchema)