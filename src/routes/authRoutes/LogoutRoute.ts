
import express from 'express'

import handleLogout from '../../controllers/LogoutController'

const router = express.Router()

router.post('/',handleLogout)

export default router