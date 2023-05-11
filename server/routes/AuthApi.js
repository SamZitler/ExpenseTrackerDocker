import Router from "express";
import User from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import * as AuthController from "../controller/AuthController.js";
const router = Router();

router.post('/register', AuthController.register);

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    // console.log(email + password);
    const user = await  User.findOne({email: email});
    if(!user){
        res.status(406).json({message: "Credentials not found"});
        return;
    }
    // console.log(user.email + user.password);
    const matched = await bcrypt.compare(password, user.password)
    if(!matched){
        res.status(406).json({message: "Credentials not found"});
        return;   
    }
    // console.log(matched);
    const payload = {
        username: email,
        _id: user._id,
    };
    // console.log(user._id);
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({message: 'Successfully Loged In', token, user});

})
export default router