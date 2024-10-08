"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// CORS configuration
exports.app.use((0, cors_1.default)({
    origin: ["https://fe-lms-vert.vercel.app"], // Allow specific origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"] // Allowed headers
}));
// routes
exports.app.use("/api/v1", user_route_1.default, course_route_1.default, order_route_1.default, notification_route_1.default, analytics_route_1.default, layout_route_1.default);
// testing API
exports.app.get("/demo", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    });
});
// Handle unknown routes
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Middleware for handling errors
exports.app.use(error_1.ErrorMiddleware);
