const User   = require("../models/user");

const login =(req,res,next)=>{
    res.render("login",{
        data:{
            pageName:"Login",
            message:"กรุณาLogin",
            class :"alert alert-primary",
            loginStatus:false
        }
    });
};
module.exports.login =login;