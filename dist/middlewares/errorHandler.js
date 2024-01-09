"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerErrorHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
};
exports.errorHandler = errorHandler;
const multerErrorHandler = (err, req, res, next) => {
    console.log(err);
    return res.status(400).json({ "success": false, "message": "Img uploading Failed : wrong img type , Insert correct Img and try Again!" });
};
exports.multerErrorHandler = multerErrorHandler;
