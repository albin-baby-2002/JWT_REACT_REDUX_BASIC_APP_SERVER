

import express from "express"
import { addNewUserHandler, deleteUserHandler, editUserInfoHandler, getUsersData } from "../../controllers/adminControllers/userManagementController";


const router = express.Router();

console.log('usermanagement route')

router.get('/', getUsersData);

router.delete('/:userId', deleteUserHandler)

router.patch('/:userId', editUserInfoHandler)

router.post('/',addNewUserHandler)

export default router

