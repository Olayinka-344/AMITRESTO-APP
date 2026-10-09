import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import NavBarOnlyLayout from "./pages/NavBarOnlyLayout";
import Home from "./pages/home";
import Category from "./pages/Category";
import CategoryDetails from "./Component/Category-Details";
import Products from "./pages/Product";
import { useState } from "react";
import Intro from "./pages/Intro";
import Cart from "./pages/cart";
import CheckOut from "./pages/CheckOut";
import NewsLetter from "./pages/NewsLetter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./pages/search";
import "./App.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function App() {
  const [showIntro, setShowIntro] = useState(true);
  if(showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />
  }

  return (
    <>
    <Routes>
      
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/Search" element={<Search />} />
      </Route>

      <Route element={<NavBarOnlyLayout />}>
        <Route path="/category" element={<Category />}>
          <Route path=":categoryId" element={<CategoryDetails />} />
        </Route>
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
    <ToastContainer position="top-left" autoClose={3000} className="ToastContainer" />
    </>
  );
}

export default App;
