import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit : "30mb",extended:true}));
app.use(bodyParser.urlencoded({limit : "30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
  
})
const PORT = process.env.PORT;


mongoose.connect(process.env.CONNECTION_URL)
  .then(()=> app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
  }))
  .catch((err)=> console.log(err));

  