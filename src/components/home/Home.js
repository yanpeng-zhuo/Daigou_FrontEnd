/*
 * @Author: Yanpeng Zhuo
 * @Github: https://github.com/zhuoyanpeng
 * @Date: 2023-01-24 12:07:48
 * @LastEditors: Yanpeng Zhuo
 * @Description: file content
 */
import React from "react";
import './Home.css';
import ProductManage from "../OrderManagement/OrderManagement";
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";
  const handleLogout = () =>{
    localStorage.removeItem("isLogin");
    localStorage.removeItem("JWT");
    localStorage.removeItem("username");
    navigate('/login');
  }

  return (
    <div className="home_container">
      <div className="header">
        <div className="header_title">代购管理系统</div> 
        <div className="user">
          <div className="header_username">欢迎, {username}</div> 
          <button className="btn_logout" onClick={handleLogout}>登出</button> 
        </div>
      </div>
      <div className="content">
        <div className="menu">

        </div>
        
        <ProductManage></ProductManage>
      </div>
      
    </div>
  );
};
  


export default Home;
