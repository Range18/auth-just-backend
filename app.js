import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";
import {} from 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { nextTick } from "process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', profileRouter);


app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});





async function StartApp(port){
    try{
        await mongoose.connect(process.env.DB_CONN);
        app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`));
    }
    catch(e){
        console.log(e);
    }
};

StartApp(PORT);





