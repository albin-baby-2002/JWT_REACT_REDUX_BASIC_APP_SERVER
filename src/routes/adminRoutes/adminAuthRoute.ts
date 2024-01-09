

import express from "express"
import handleAdminLogin from "../../controllers/adminControllers/adminAuthController";

const router = express.Router();

router.post('/',handleAdminLogin)

export default router

