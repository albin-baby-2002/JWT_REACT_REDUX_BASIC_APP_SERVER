"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileControllers_1 = require("../../controllers/userControllers/profileControllers");
const multerForProfile_1 = require("../../middlewares/multerForProfile");
const errorHandler_1 = require("../../middlewares/errorHandler");
const router = express_1.default.Router();
router.get('/profile/data', profileControllers_1.getProfileDataHandler);
router.post('/profile/image', multerForProfile_1.upload.single('profileImg'), errorHandler_1.multerErrorHandler, profileControllers_1.handleProfileImg);
exports.default = router;
