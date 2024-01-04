
import express from 'express'
import { newUserRegister } from '../controllers/registerController'

const router = express.Router()

router.post('/',newUserRegister)

export default router