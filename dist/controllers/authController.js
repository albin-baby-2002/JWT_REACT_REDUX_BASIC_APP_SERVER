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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = yield userModel_1.default.findOne({ username: user });
    if (!foundUser)
        return res.sendStatus(401); // 401 - Unauthorized 
    // evaluate password 
    const match = yield bcrypt_1.default.compare(pwd, foundUser.password);
    if (match) {
        res.status(200).json({ "message": "Login Successful" });
    }
    else {
        res.sendStatus(401);
    }
});
exports.default = handleLogin;
