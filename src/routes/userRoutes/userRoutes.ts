
import express from 'express'
import {getProfileDataHandler, handleProfileImg} from '../../controllers/userControllers/profileControllers'
import { upload } from '../../middlewares/multerForProfile'
import { multerErrorHandler } from '../../middlewares/errorHandler'


const router = express.Router()

router.get('/profile/data',getProfileDataHandler )

router.post('/profile/image', upload.single('profileImg'),multerErrorHandler,handleProfileImg)

export default router
