import express from "express";
const router = express.Router();

// 모든 포스트 가져오기
// 해당 ID에 대한 포스트 가져오기
// GET 방식
// http://127.0.0.1:8080/posts/ - 모든 포스트
// http://127.0.0.1:8080/posts?userid=?? - 해당 사용자 포스트 가져오기

// 글번호에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts/:id

// 포스트 쓰기
// Post
// http://127.0.0.1:8080/posts/
// json 형태로 입력 후 저장

// 포스트 수정
// put
// http://127.0.0.1:8080/posts/:id
// json 형태로 입력 후 저장

// 포스트 삭제
// delete
// http://127.0.0.1:8080/posts/:id

export default router;
