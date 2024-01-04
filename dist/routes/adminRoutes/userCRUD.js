"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedRoles_1 = __importDefault(require("../../config/allowedRoles"));
const express_1 = __importDefault(require("express"));
const verifyRoles_1 = __importDefault(require("../../middlewares/verifyRoles"));
const router = express_1.default.Router();
router.get('/users-list', (0, verifyRoles_1.default)(allowedRoles_1.default.Admin, allowedRoles_1.default.Editor), (req, res, next) => {
    // so verify roles check the req.userinfo.roles whether the req sender have assigned roles of admin or editor
});
