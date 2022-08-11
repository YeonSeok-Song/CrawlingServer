import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routers/UserRouter';
import morgan from 'morgan'; // http request 정보를 logging하기 위한 Middlware
import { stream } from "../src/mw/errorMW";

const app = express();
const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"' 
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined; 
// NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발

app.use(cors());
app.use(morgan(morganFormat, {stream : stream}));
// static file 처리
// 이렇게 해주면 url을 통해 디렉토리로 바로 접근이 가능하다.
// ex) => public 바로 접근
app.use(bodyParser.json()); // json 데이터 처리
app.use(bodyParser.urlencoded({extended: true})); // encode된 url처리 (한글, 특수문자 등등)

app.use(userRouter);

export {express, app};