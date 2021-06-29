import Mock from 'mockjs'
import listVersion from "./data/version";
import { login, loginOut,authRoutes } from "./data/user";
Mock.mock('http://127.0.0.1/api/news', 'post', listVersion);
Mock.mock('http://127.0.0.1/api/login', 'post', login);
Mock.mock('http://127.0.0.1/api/authRoutes', 'get', authRoutes);

