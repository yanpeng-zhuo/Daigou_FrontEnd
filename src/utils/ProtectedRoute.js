/*
 * @Author: Yanpeng Zhuo
 * @Github: https://github.com/zhuoyanpeng
 * @Date: 2023-01-31 13:56:39
 * @LastEditors: Yanpeng Zhuo
 * @Description: file content
 */
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ( {children} ) => {
  const user = localStorage.getItem("isLogin");
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};