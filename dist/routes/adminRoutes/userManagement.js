"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userManagementController_1 = require("../../controllers/adminControllers/userManagementController");
const router = express_1.default.Router();
console.log('usermanagement route');
router.get('/', userManagementController_1.getUsersData);
router.delete('/:userId', userManagementController_1.deleteUserHandler);
router.patch('/:userId', userManagementController_1.editUserInfoHandler);
router.post('/', userManagementController_1.addNewUserHandler);
exports.default = router;
