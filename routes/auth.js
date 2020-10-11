const express = require("express");
const router  = express.Router();
const loginController = require("../controller/login-controller");
const registerController = require("../controller/register-controller");
const profileController = require("../controller/profile-controller");
const authChecker = require("../middlewares/auth-middleware");
router.get("/login",loginController.login);
router.get("/login",loginController.postLogin);
router.get("/logout",loginController.logout);
router.get("/register",registerController.register);
/*router.post("/register",registerController.postRegister);
router.post("/profile",authChecker.profileController);*/
router.post("/register", function(req, res){registerController.register});
router.post("/profile", function(req, res){authChecker.profileController});
module.exports =router;