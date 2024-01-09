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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleAdminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pwd } = req.body;
    if (!email || !pwd)
        return res.status(400).json({ 'message': 'Username and password are required.' });
    try {
        const foundUser = yield userModel_1.default.findOne({ email });
        if (!foundUser)
            return res.sendStatus(404); // 401 - User Not found 
        // evaluate password 
        const match = yield bcrypt_1.default.compare(pwd, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);
            console.log(roles);
            if (!roles.find((role) => role === 5150))
                return res.sendStatus(403);
            const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
            const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
            if (!ACCESS_SECRET || !REFRESH_SECRET) {
                throw new Error('Failed to create access / refresh token');
            }
            const accessToken = jsonwebtoken_1.default.sign({
                "UserInfo": {
                    "id": foundUser._id,
                    "username": foundUser.username,
                    "roles": roles
                }
            }, ACCESS_SECRET, { expiresIn: '30s' });
            const refreshToken = jsonwebtoken_1.default.sign({ "username": foundUser.username, "id": foundUser._id, }, REFRESH_SECRET, { expiresIn: '1d' });
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = yield foundUser.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({ roles, accessToken, user: foundUser.username });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.default = handleAdminLogin;
