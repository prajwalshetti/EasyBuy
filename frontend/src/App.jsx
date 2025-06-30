import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register.jsx'
import {BrowserRouter,Route, Routes} from "react-router-dom"; 
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx'
import Cart from './components/Cart.jsx'
import AdminDashboard from './components/adminComponents/AdminDashboard.jsx'
import Category from './components/adminComponents/Category.jsx'
import Product from './components/adminComponents/Product.jsx'
import SeeUsers from './components/adminComponents/SeeUsers.jsx'
import CreateProduct from './components/adminComponents/CreateProduct.jsx'
import SingleProduct from './components/adminComponents/SingleProduct.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Order from './components/Order.jsx'
import ManageOrder from './components/adminComponents/ManageOrder.jsx'
import Chat from './components/Chat.jsx'
import AdminChat from './components/AdminComponents/dminChat.jsx'
import Vapi from './components/Vapi.jsx'
import AIAgent from './components/AIAgent.jsx'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/aiagent' element={<AIAgent/>}/>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="order" element={<Order/>}/>
          <Route path="cart" element={<Cart />} /> 
          <Route path='chat' element={<Chat/>}/>
          {/* Elements not inserted */}
          <Route path='adminDashboard' element={<AdminDashboard/>}>
            <Route index element={<Category/>}/>
            <Route path='createProduct' element={<CreateProduct/>}/>
            <Route path="productList" element={<Product/>}/>
            <Route path="seeUsersList" element={<SeeUsers/>}/>
            <Route path="product/:id" element={<SingleProduct/>}/>
            <Route path="manageOrder" element={<ManageOrder/>}/>
            <Route path='adminChat' element={<AdminChat/>}/>
          </Route>
          <Route path='productDetails/:id' element={<ProductDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App