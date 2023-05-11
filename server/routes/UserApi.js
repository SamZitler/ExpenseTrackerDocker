import Router from "express";
import User from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as UserController from '../controller/UserController.js'
const router = Router();

router.get('/',passport.authenticate('jwt', {session: false}), UserController.index );

export default router;