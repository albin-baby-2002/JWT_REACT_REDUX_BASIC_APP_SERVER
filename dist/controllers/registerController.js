"use strict";
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
exports.newUserRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const newUserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    // 400 -bad request
    if (!user || !pwd)
        return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = yield userModel_1.default.findOne({ username: user });
    if (duplicate)
        return res.sendStatus(409); // 409 - Conflict 
    try {
        //encrypt the password
        const hashedPwd = yield bcrypt_1.default.hash(pwd, 10);
        //create and store the new user
        const newUser = new userModel_1.default({
            username: user,
            password: hashedPwd
        });
        newUser.save();
        console.log(newUser);
        res.status(201).json({ 'success': `New user ${user} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
});
exports.newUserRegister = newUserRegister;
