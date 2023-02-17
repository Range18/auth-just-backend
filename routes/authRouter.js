import Router  from "express";
const router = new Router();
import controller from "../authController.js";
import { check } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

router.post('/registration',[
    check('username', "Username is empty").notEmpty(),
    check('password', "Пароль должен быть больше 8 и меньше 16 символов").isLength({ min:8, max:16})
], controller.registration);
router.post('/signin', controller.signin);
router.get('/users', roleMiddleware(['Admin']), controller.getUsers);
router.put('/update',[
    check('newUsername', "NEW username is empty").notEmpty()
],controller.updateUser);
export default router;