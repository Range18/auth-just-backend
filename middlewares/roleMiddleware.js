import jwt from "jsonwebtoken";
import {} from "dotenv/config";


export default function(roles){
    return function(req,res,next)
    {
        if (req.method==="OPTIONS") {
            next();
        }

        try {   
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(403).json({message:"Пользователь не авторизован"});
            }
            const {roles: userRoles} = jwt.verify(token, process.env.SECRET_JWT_KEY);
            let hasRoles=false;
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRoles = true;
                }
            });
            if(!hasRoles){
                return res.status(403).json({message:"Нет доступа"});
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({message:"Пользователь не авторизован"});
        }
    }

}