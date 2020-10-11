const User   = require("../models/user");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
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
const getUserData = async dataObj =>{
    const user = await User.findOne({
    username: dataObj.username});
    if(!user){
        return {id:null,username:null,loginStatus:false};
    }else{
        const result = await bcrypt.compare(dataObj.password,user.password);
        return {id:user._id,username:user.username,loginStatus:result};
    }
};
const postLogin =(req,res,next)=>{
    if(!req.body.username || !req.body.password){
        res.render("login",{
            data:{
                pageName:"Login",
                message:"กรุณากรอก usernameและ password",
                class :"alert alert-warning",
                loginStatus:false
            }
        });
        return false;
    }
    const dataObj = {
        username: req.body.username,
        password: req.body.password,
    };
    getUserData(dataObj)
    .then(result =>{
        if(result.loginStatus == true){
            const token = jwt.sign(
                {id:result.id,username:result.username,loginStatus:true},
                "SECRETKEY",
                {exiresIn:60*1}
            );
            res.setHeader("Set-Cookie","token="+token);
            res.render("profile",{
                data:{
                    pageName:"Profile",
                    message:"",
                    class :"alert alert-primary",
                    username:result.username,
                    loginStatus:false
                }
            });
        }else{
            res.render("login",{
                data:{
                    pageName:"Login",
                    message:"ชื่อ usernameหรือpasswordไม่ถูกตัอง",
                    class :"alert alert-danger",
                    loginStatus:false
                }

            });
        }
    })
    .catch(err => {
        console.log(err);
    });
};
module.exports.postLogin =postLogin;
const logout =(req,res,next)=>{
    res.clearCookie("token");
    res.render("login",{
        data:{
            pageName:"Login",
            message:"loginเข้าสู่ระบบ",
            class :"alert alert-warning",
            loginStatus:false
        }
    });
};
module.exports.logout =logout;