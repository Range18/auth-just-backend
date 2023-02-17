import Router  from "express";
const router = new Router();
import controller from "../profileController.js"

router.get('/:username', controller.getUserProfile);


export default router;