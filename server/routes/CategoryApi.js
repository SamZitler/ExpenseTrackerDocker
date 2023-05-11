import Router from "express";
import User from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as CategoryController from "../controller/CategoryController.js";
const router = Router();

router.delete("/:id", CategoryController.destroy);
router.post("/", CategoryController.create);
router.patch("/:id", CategoryController.update);

export default router;
