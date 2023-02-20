import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";
import {} from 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.set("view engine", "hbs");
// app.set("views", "public");

app.get('/', (req,res)=>{
    res.render("index.hbs");
});

app.get('/registration', (req,res)=>{
    res.render("reg.hbs");
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





