import { useContext } from "react";
import AuthContext from "../context/CheckAuth";
import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Regist from "../pages/Registration";
import Busket from "../pages/Busket";
import List from "../pages/ProductList";
import Profile from "../pages/Profile";

export default function MainRoutes() {
    const { checkAuth } = useContext(AuthContext);
  
    return (
      <Routes>
        {checkAuth ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
          </>
        ) : (
          <>
            <Route path="/busket" element={<Busket />} />
            <Route path="/productlist" element={<List />} />
            <Route path="/productlist/:category" element={<List />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    );
  }