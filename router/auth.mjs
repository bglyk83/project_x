import express from "express";
import session from "express-session";
import * as authController from "../controller/auth.mjs";

const router = express.Router();
router.use(
  session({
    secret: "!@#$%^&*()",
    resave: false,
    saveUnintialized: false,
    cookie: { secure: false },
  })
);

// 회원가입
// POST
// http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.signup);

// 로그인
// POST
// http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);

// 로그인 유지
router.get("/me", authController.check_me);

router.get("/logout", authController.logout);

export default router;
