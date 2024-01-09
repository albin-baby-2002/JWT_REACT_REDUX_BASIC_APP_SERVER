"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const imageTypes = /^(image\/(jpeg|png|svg|jpg|webp))$/i;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '../../public/img/profileImages'));
    },
    filename: function (req, file, cb) {
        const name = file.fieldname + Date.now() + '_' + file.originalname;
        cb(null, name);
    }
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const extname = imageTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = imageTypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        else {
            cb(new Error('Failed to add image: wrong file type'));
        }
    }
});
