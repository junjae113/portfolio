import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("jwt_token");
  console.log(localStorage.getItem("jwt_token"))

    if (!isLoggedIn) {
      window.alert("로그인 후 이용하실 수 있습니다");
      window.open("/sign-in", "_self")
    }

  return children;
} 

export default ProtectedRoute;