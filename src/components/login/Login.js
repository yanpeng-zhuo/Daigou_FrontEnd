/*
 * @Author: Yanpeng Zhuo
 * @Github: https://github.com/zhuoyanpeng
 * @Date: 2023-01-24 12:07:48
 * @LastEditors: Yanpeng Zhuo
 * @Description: file content
 */

import React from 'react';
import {postFetch} from '../../utils/fetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async() => {
    console.log(username + " " + password);
    var data = await postFetch("http://localhost:8080/auth/applyToken", {
            "username": username,
            "password": password
          });
    console.log(data);
    if(data.status === 403){
        alert("用户名密码错误请重新填写");
    } 
    else{
      localStorage.setItem("JWT", data.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("role", data.data.user.authorities[0].authority);
      navigate('/home');
    }
  };

  return (
    <div className="container">
      <div className="input_box">
        <div className="title">欢迎来到代购管理系统</div>
        <div className="input">
          用户名 
          <input value={username} onChange={changeUsername} placeholder='输入用户名'></input>
        </div>
        <div className="input">
          密码&nbsp;&nbsp;&nbsp;&nbsp; 
          <input value={password} onChange={changePassword} placeholder='输入密码'></input>
        </div>
        <button className="login_btn" onClick={handleLogin}>登录</button>
      </div>
    </div>
  );
}


export default Login;
