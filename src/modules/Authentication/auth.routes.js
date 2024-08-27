import { Router } from "express";
import { uniqueEmail } from "../../middleware/uniqueEmail.js";
import { changePassword, signIn, signUp } from "./auth.controller.js";

const authRouter = Router()

authRouter.post('/signup', uniqueEmail, signUp)
authRouter.post('/signin', signIn)
authRouter.patch('/change-password', changePassword)

export default authRouter