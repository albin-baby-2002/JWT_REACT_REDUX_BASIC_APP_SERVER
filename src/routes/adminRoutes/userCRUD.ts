import ROLES_LIST from "../../config/allowedRoles";

import express from "express"
import verifyRoles from "../../middlewares/verifyRoles";

const router = express.Router();

router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),(req,res,next)=>{
    
    // so verify roles check the req.userinfo.roles whether the req sender have assigned roles of admin or editor
    
    res.status(200).json({'yes':'allowed for admin and editor'})
    
})

export default router

