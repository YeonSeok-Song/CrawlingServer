import { Router } from "express";
import { logContainer } from "../mw/errorMW";
import { userService } from "../controllers/userController";

const userRouter = Router();
const log = logContainer.get('user');

// ajax 따로 새로고침하지 않고도 서버에 데이터를 요청하고 응답받기 위한 JS라이브러리
// 필요한 부분만 랜더링이 가능함.

userRouter.post('/user/login', (req, res) => {
    console.log(req.body);
    log.log('info', `Login Success - ${req.body.email}`);
    res.send(`login success : ${req.body.email}`);
})

userRouter.get('/user/logout', (req, res) => {
    console.log();
    res.send("logout");
})

userRouter.get('/user/:id', (req, res) => {

    const id = req.params("id");
    console.log(id);
    res.send("send userData success");
})

export default userRouter;