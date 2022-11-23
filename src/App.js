import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupNew from "./components/SignupNew";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Navbar1 from "./components/Navbar1";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import UsersIstore from "./components/UsersIstore";
import Blockuser from "./components/Blockuser";
import UnblockUser from "./components/UnblockUser";
import Category from "./components/Category";
import PrivateRoute from "./components/PrivateRoute";
import AddCategory from "./components/AddCategory";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar1 />
        <Routes>
          <Route element={<PrivateRoute/>}>
            
          <Route path="/about" element={<About />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/product" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/usersIstore" element={<UsersIstore />} />
          <Route path="/blockuser" element={<Blockuser />} />
          <Route path="/unblockuser" element={<UnblockUser />} />
          <Route path="/category" element={<Category />} />
          <Route path="/addCategory" element={<AddCategory/>} />
          </Route>  
          <Route path="/signup" element={<SignupNew />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
