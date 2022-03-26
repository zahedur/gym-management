const express = require('express');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const UserController = require("../controllers/UserController");
const router = express.Router();

//User
router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.get("/user", AuthMiddleware, UserController.User);
router.post("/update-user", AuthMiddleware, UserController.UpdateUser);
