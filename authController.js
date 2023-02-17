import User from "./modules/User.js";
import Role from "./modules/Role.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const generateAccessToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_JWT_KEY, {expiresIn:"24h"});
}


class authController{
    async registration(req,res){
        try
        {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if(candidate){
                return res.status(400).json({message:"Пользователь с таким именем уже существует"});
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole =await Role.findOne({value:"User"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();

            return res.json({message: "Пользователь успешно зарегистрирован"});
        }            
        catch(err){
            console.log(err);
            res.status(400).json({message:'Registration error'});
        }
    }

    async signin(req,res){
        try
        {
            const {username,password}= req.body;
            console.log(req.body);
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`});
            }
            const validPasssword = bcrypt.compareSync(password, user.password);
            if(!validPasssword){
                return res.status(400).json({message: `Неверный пароль`});
            }
            const token = generateAccessToken(user._id,user.roles);
            return res.json({token});
        }       
        catch(err){
            console.log(err);
            res.status(400).json({message:'Sign in error'});
        }
    }

    async getUsers(req,res){
        try
        {
            const users = await User.find();
            res.json(users);
            
        }
        catch(err){

        }
    }

    async updateUser(req,res){
        try{
            const {username,password,newUsername} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`});
            }
            const validPasssword = bcrypt.compareSync(password, user.password);
            if(!validPasssword){
                return res.status(400).json({message: `Неверный пароль`});
            }
            await User.updateOne({username:`${username}`},{username: `${newUsername}`});
            return res.json({message:`Пользователь ${username} успешно изменил свой логин на ${newUsername}`});
        }
        catch(err){
            console.log(err);
            res.status(400).json({message: `Не удалось обновить данные`});
        }
    }
}


export default new authController();