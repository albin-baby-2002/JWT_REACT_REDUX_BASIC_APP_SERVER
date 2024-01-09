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
exports.handleProfileImg = exports.getProfileDataHandler = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const getProfileDataHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield userModel_1.default.findById(id);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ 'message': "failed to access user data" });
        }
        res.status(200).json({ username: user.username, email: user.email, phone: user.phone, image: user.image });
    }
    catch (err) {
    }
});
exports.getProfileDataHandler = getProfileDataHandler;
const handleProfileImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        const userId = (_c = req.userInfo) === null || _c === void 0 ? void 0 : _c.id;
        console.log(image, '', userId);
        const result = yield userModel_1.default.findByIdAndUpdate(userId, { $set: { image } });
        console.log(result);
        res.sendStatus(200);
    }
    catch (err) {
        console.log('error \t \t ', err);
        next(err);
    }
});
exports.handleProfileImg = handleProfileImg;
