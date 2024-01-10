"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewUserHandler = exports.editUserInfoHandler = exports.deleteUserHandler = exports.getUsersData = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userModel_1 = __importDefault(require("../../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsersData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}, '_id username email phone ');
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getUsersData = getUsersData;
const deleteUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }
        const deletedUser = yield userModel_1.default.findOneAndDelete({ _id: userId });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found ' });
        }
        console.log('deleted ', deletedUser._id);
        res.status(200).json({ message: 'User successfully deleted' });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        next(error);
    }
});
exports.deleteUserHandler = deleteUserHandler;
const editUserInfoHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { username, phone } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }
        if (typeof username !== 'string' || !username.trim()) {
            return res.status(400).json({ message: 'Invalid username' });
        }
        if (typeof phone !== 'string' || !phone.match(/\d{10}/)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { $set: { username, phone } }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully updated', updatedUser });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        next(error);
    }
});
exports.editUserInfoHandler = editUserInfoHandler;
const addNewUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd, email, phone } = req.body;
    if (!user || !pwd || !email || !phone)
        return res.status(400).json({ 'message': 'All fields are required.' }); // bad request
    try {
        const duplicate = yield userModel_1.default.findOne({ email });
        if (duplicate)
            return res.sendStatus(409); // Conflict 
        const hashedPwd = yield bcrypt_1.default.hash(pwd, 10);
        const newUser = new userModel_1.default({
            username: user,
            password: hashedPwd,
            email,
            phone
        });
        newUser.save();
        res.status(201).json({ 'success': `New user ${user} created!` });
    }
    catch (err) {
        next(err);
    }
});
exports.addNewUserHandler = addNewUserHandler;
