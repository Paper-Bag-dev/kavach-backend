import express from "express";

import { LoginInitiate } from "../controller/AuthController/loginInitiate.js";
import { roleIntiate } from "../controller/AuthController/roleInitiate.js";
import getUserDataUsingEmail from "../controller/UserController/getUserDataUsingEmail.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

import { register } from "../controller/AuthController/register.js"
import { login } from "../controller/AuthController/login.js"
import { verifyToken } from "../middlewares/verifyToken.js"
import { getUserData } from "../controller/UserController/getUserData.js";
import { refreshToken } from "../controller/AuthController/refreshToken.js";
import { logout } from "../controller/AuthController/logout.js";
import passport from '../utils/passportConfig.js';
import { googleAuth } from "../controller/AuthController/googleAuth.js";


import { casesSolvedCounter } from "../controller/FirController/AllfirMain.js";
import { getFeedback } from "../controller/FeedbackController/AllFeedbackMain.js"

// import { register } from "../controller/AuthController/register.js"
// import { login } from "../controller/AuthController/login.js"
// import { verifyToken } from "../middlewares/verifyToken.js"
// import { getUserData } from "../controller/UserController/getUserData.js";
// import { refreshToken } from "../controller/AuthController/refreshToken.js";
// import { logout } from "../controller/AuthController/logout.js";
// import passport from '../utils/passportConfig.js';
// import { googleAuth } from "../controller/AuthController/googleAuth.js";

import { getMyProfile } from "../controller/UserController/user.js";
import { createFir, deleteFir, updateFir, getFIR } from "../controller/FirController/AllfirMain.js";
// import { getFeedback } from "../controller/FeedbackController/AllFeedbackMain.js"

import { createPost, fetchFeed } from "../controller/SocialController/AllFeedMain.js";


const router = express.Router();
router.get('/', (req, res) => res.send('Welcome to Kavach Backend Api Layer'))




// import { getMyProfile, login, logout, register } from "../controller/UserController/user.js";
// import { getFIR, casesSolvedCounter, createFir, deleteFir, updateFir } from "../controller/FirController/AllfirMain.js";
// import { getFeedback } from "../controller/FeedbackController/AllFeedbackMain.js"

// import { createPost, fetchFeed, likeUpdate } from "../controller/SocialController/AllFeedMain.js";
router.get('/', (req, res) => res.send('Welcome to Kavach Backend Api Layer'))

router.post('/register', register);
router.post('/login', login);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', googleAuth);
router.get('/user', verifyToken, getUserData)
router.get('/refresh', refreshToken, verifyToken, getUserData)
router.get('/logout', logout);

// Vikalp's User Routes
// user
// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/me", isAuthenticated, getMyProfile);
router.post('/login/init', LoginInitiate)
router.post('/role/init', roleIntiate)
router.get('/user', verifyToken, getUserData)
router.get('/getdata', getUserDataUsingEmail)
router.get('/refresh', refreshToken, verifyToken, getUserData)
router.get('/logout', logout);


// router.post('/register', register);
// router.post('/login', login);
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', googleAuth);
// router.get('/user', verifyToken, getUserData)
// router.get('/refresh', refreshToken, verifyToken, getUserData)
// router.get('/logout', logout);

// Vikalp's User Routes
// user

// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/me", isAuthenticated, getMyProfile);


// FIR
router.get('/getfir', getFIR);
router.get('/getSolvedCaseCount', casesSolvedCounter);
router.post('/createFir', verifyToken, createFir);   // Auth Needed here too
router.delete('/:id', verifyToken, deleteFir);   // Authentication needed
router.put('/:id', verifyToken, updateFir);      // Authentication needed

// FEEDBACK
router.get('/getFeedback', getFeedback);

// SOCIAL
//add post
router.post("/newPost", verifyToken, createPost);
// get feed
router.get("/fetchFeed", verifyToken, fetchFeed);
// like unlike
// router.post("/liked", verifyToken, likeUpdate);

export default router;