import mongoose from "mongoose";
import { Schema } from "mongoose";

const postMessageSchema = new Schema({
    title:String,
    message:String,
    creator:String,
    name:String,
    tags:[String],
    selectedFile: String,
    likes:{
        type :[String],
        default:[],
    },
    comments:{
        type :[String],
        default:[],
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
});

const postMessageModel = mongoose.model('postMessageModel',postMessageSchema);
export default postMessageModel;