const express = require("express");
const router  = express.Router();
const loginController = require("../controller/login-controller");
const registerController = require("../controller/register-controller");
router.get("/login",loginController.login);
router.get("/register",registerController.register);
router.post("/register",registerController.postRegister);
module.exports =router;