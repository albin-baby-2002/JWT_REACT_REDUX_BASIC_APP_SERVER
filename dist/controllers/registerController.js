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
exports.newUserRegister = newUserRegister;
