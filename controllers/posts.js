
import mongoose from 'mongoose';
import PostMessageModel from "../models/postMessageSch.js";


export const getPosts = async (req,res) => {
    const {page} = req.query;
    try{
        const LIMIT = 6;
        const startInd =  ( (Number(page)-1)*LIMIT);
        const total = await PostMessageModel.countDocuments({});
        const posts = await PostMessageModel.find().sort({_id:-1}).limit(LIMIT).skip(startInd);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
        
    }
    catch(error)
    {
        res.status(404).json({message:error});
    }
 
};

export const getPostsBySearch = async(req,res)=>{
    const {searchQuery,tags} = req.query;
    try {
        const title = new RegExp(searchQuery,'i');
        const posts = await PostMessageModel.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
        res.json({data:posts});
    } catch (error) {
        res.status(404).json({message:error});
    }
};

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessageModel.find({ name });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessageModel.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req,res)=>{
    const userPost = req.body; 
    const newUserPost = new PostMessageModel({...userPost,creator:req.userId,createdAt:new Date().toISOString()});
    try {
        await newUserPost.save();
        res.status(201).json(newUserPost);
    } catch (error) {
        res.status(409).json({message:error});
    }
};

export const updatePost = async(req,res)=>{
    const {id:_id}  = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that ID");
    const updatedPost = await PostMessageModel.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.json(updatedPost);
};

export const deletePost = async(req,res)=>{
    const {id}  = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that ID");
    await PostMessageModel.findByIdAndRemove(id);
    res.json({message:"Post has been deleted successfully"});
};

export const likePost = async(req,res)=>{
    const {id}  = req.params;
    if(!req.userId)
        return res.json({message:"Unauthenticated"});
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that ID");
    const post = await PostMessageModel.findById(id);
    const ind = post.likes.findIndex((id)=>id===String(req.userId));
    if(ind === -1)
        post.likes.push(req.userId);
    else
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    const updatedPost = await PostMessageModel.findByIdAndUpdate(id,post,{new:true});
    res.json(updatedPost);
};

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessageModel.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessageModel.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
