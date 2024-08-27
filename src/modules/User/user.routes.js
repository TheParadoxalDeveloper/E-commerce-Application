import { Router } from "express";
import { addUser, deleteUser, getAllUser, getUser, updateUser } from "./user.controller.js";
import { uniqueEmail } from "../../middleware/uniqueEmail.js";

const userRouter = Router()

userRouter.route('/').post(uniqueEmail, addUser).get(getAllUser)
userRouter.route('/:id').get(getUser).put(uniqueEmail, updateUser).delete(deleteUser)

export default userRouter