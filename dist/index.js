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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const jwtVerification_1 = __importDefault(require("./middlewares/jwtVerification"));
const errorHandler_1 = require("./middlewares/errorHandler");
const authRoute_1 = __importDefault(require("./routes/authRoutes/authRoute"));
const LogoutRoute_1 = __importDefault(require("./routes/authRoutes/LogoutRoute"));
const refreshRoute_1 = __importDefault(require("./routes/authRoutes/refreshRoute"));
const registerRoute_1 = __importDefault(require("./routes/authRoutes/registerRoute"));
const credentials_1 = __importDefault(require("./middlewares/credentials"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes/userRoutes"));
const verifyRoles_1 = __importDefault(require("./middlewares/verifyRoles"));
const allowedRoles_1 = __importDefault(require("./config/allowedRoles"));
const adminAuthRoute_1 = __importDefault(require("./routes/adminRoutes/adminAuthRoute"));
const userManagement_1 = __importDefault(require("./routes/adminRoutes/userManagement"));
const PORT = process.env.PORT || 3500;
// connect to mongodb database
(0, dbConnection_1.default)();
// access-control-allow-credentials 
app.use((req, res, next) => {
    console.log(`Requested URL: ${req.url}`);
    next();
});
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
console.log(path_1.default.join(__dirname, '..', 'public'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/register', registerRoute_1.default);
app.use('/auth', authRoute_1.default);
app.use('/admin/auth', adminAuthRoute_1.default);
app.use('/refresh', refreshRoute_1.default);
app.use('/logout', LogoutRoute_1.default);
// authenticate users using jwt for private routes
app.use(jwtVerification_1.default);
app.use('/admin/users', (0, verifyRoles_1.default)(allowedRoles_1.default.Admin), userManagement_1.default);
app.use('/user', (0, verifyRoles_1.default)(allowedRoles_1.default.User), userRoutes_1.default);
// 404 Error Middleware
app.use('*', (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
// Error Handler
app.use(errorHandler_1.errorHandler);
// running the server application
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
