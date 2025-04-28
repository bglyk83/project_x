//import e from "express";
//import s from "express-session";
import * as authRepository from "../data/auth.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretKey = config.jwt.secretKey;
const bcryptSaltRounds = config.bcrypt.saltRound;
const jwtExpiresInDays = config.jwt.expiresInSec;

async function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

//회원 중복 체크
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
  }

  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
  const users = await authRepository.createUser(userid, hashed, name, email);
  const token = await createJwtToken(users.id);

  if (users) {
    res.status(201).json({ token, userid });
  }
}

//구 회원 가입
//export async function signup(req, res, next) {
// const { userid, password, name, email } = req.body;
// const users = await authRepository.createUser(userid, password, name, email);
//if (users) {
//   res.status(201).json(users);
//  }
//}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserid(userid, password);
  if (!user) {
    res.status(401).json(`${userid} 를 찾을 수 없습니다.`);
  }
  const inValiddPassword = await bcrypt.compare(password, user.password);
  if (inValiddPassword) {
    return res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
  }
  const token = await createJwtToken(user.id);
  res.status(200).json({ token, userid });
}

export async function verrify(req, res, next) {
  const id = req.id;
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(400).json({ message: "사용자 인증 실패" });
  }
}

export async function me(req, res, next) {
  const user = await authRepository.findByid(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}

export async function check_me(req, res, next) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

export async function logout(req, res, next) {
  if (req.session.user) {
    req.session.destroy(() => {
      res.send("로그아웃 되었습니다.");
    });
  } else {
    res.status(401).send("로그인 된 기록이 없습니다");
  }
}
