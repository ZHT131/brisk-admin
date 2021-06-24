import Mock from 'mockjs' 
import listVersion from "./data/version";
Mock.mock('http://127.0.0.1/api/news','post',listVersion);