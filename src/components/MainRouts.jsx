import { useContext } from "react";
import AuthContext from "../context/CheckAuth";
import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Regist from "../pages/Registration";
import Busket from "../pages/Busket";
import List from "../pages/ProductList";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import AllProduct from "./AllProduct";

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
            <Route path="/productlist" element={<AllProduct />} />
            <Route path="/productlist/allProduct" element={<AllProduct />} />
            <Route path="/productlist/:category" element={<List />} />
            <Route path="/productlist/product/:prodID" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    );
  }