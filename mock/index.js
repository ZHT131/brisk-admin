import Mock from 'mockjs'
import { adminUser } from "./data/admin";
import { login, loginOut, authRoutes } from "./data/user";
Mock.mock('http://127.0.0.1/api/login', 'post', login);
Mock.mock('http://127.0.0.1/api/authRoutes', 'get', authRoutes);
Mock.mock('http://127.0.0.1/api/adminUser', 'post', adminUser);

