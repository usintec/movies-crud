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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const env_1 = require("./src/configuration/env");
const mysql_1 = require("./src/model/mysql");
const bodyParser = __importStar(require("body-parser"));
const user_1 = require("./src/router/user");
const movie_1 = require("./src/router/movie");
const configuration = new env_1.EnviromentSetup(process.env.ENVIROMENT).enviroment;
const app = (0, express_1.default)();
const port = configuration.portNo;
// Body parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Metheds', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Routes
app.use('/api/user', user_1.UserRouter);
app.use('/api/movies/', movie_1.MoviesRouter);
// Database syncronization
// DB.sequelize.sync()
mysql_1.DB.sequelize.sync({ force: true })
    .then(() => {
    console.log('done creating db');
    mysql_1.DB.roleModel.create({
        id: 1,
        name: mysql_1.DB.Roles[0].toString()
    }).then(() => console.log('done'))
        .catch((err) => {
        console.log(err);
        console.log(err.message);
    });
    mysql_1.DB.roleModel.create({
        id: 2,
        name: mysql_1.DB.Roles[1].toString()
    });
})
    .catch((err) => console.log(err));
// Default routes
app.get('/', () => {
    console.log('Our API is up and runnig');
});
// Start the server
try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}
catch (err) {
    console.log(`Error occurred: ${err.message}`);
}
