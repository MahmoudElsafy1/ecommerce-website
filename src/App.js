import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/website/home/Home";
import Login from "./pages/Auth/authOpration/login/Login";
import Register from "./pages/Auth/authOpration/register/Register";
import Users from "./pages/dashborad/userPage/Users/Users";
import GoogleCallBack from "./pages/Auth/authOpration/googleRegister/GoogleCallBack";
import Dashborad from "./pages/dashborad/dashborad/Dashborad";
import RequireAuth from "./pages/Auth/portected/requireAuth/RequireAuth";
import User from "./pages/dashborad/userPage/user/User";
import AddUser from "./pages/dashborad/userPage/addUser/AddUser";
import Err403 from "./pages/Auth/error/403/Err403";

import Err404 from "./pages/Auth/error/404/Err404";
import RequireBack from "./pages/Auth/portected/requireBack/RequireBack";
import Categories from "./pages/dashborad/categoryPage/categories/Categories";
import AddCategory from "./pages/dashborad/categoryPage/addCategory/AddCategory";
import Category from "./pages/dashborad/categoryPage/category/Category";
import Products from "./pages/dashborad/product/products/Products";
import AddProduct from "./pages/dashborad/product/addProduct/AddProduct";
import UpdateProduct from "./pages/dashborad/product/updateProduct/UpdateProduct";
import WebsiteCategories from "./pages/website/categories/Categories";
import Website from "./pages/website/Website";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Website />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<WebsiteCategories />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashborad" element={<Dashborad />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="403" element={<Err403 />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* category route */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* product route */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              {/* <Route path="writer" element={<Writer />} /> */}
            </Route>
          </Route>
        </Route>
        <Route path="/*" element={<Err404 />} />
      </Routes>
    </div>
  );
}

export default App;
