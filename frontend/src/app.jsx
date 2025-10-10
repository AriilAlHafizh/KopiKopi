import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Dashboard from './dashboard.jsx';
import About from './about.jsx';
import Shop from './shop.jsx';
import Blog from './blog.jsx';
import Contact from './contact.jsx';
import Produk from './produk.jsx';
import AdminPengguna from './admin/usertable/UserList.jsx';
import AdminProduk from './admin/produk/ProduksList.jsx';
import AdminDashboard from './admin/dashboard.jsx';
import SellerDashboard from './seller/dashboard';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Dashboard />} />
      
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/usertable/UserList" element={<AdminPengguna />} />
      <Route path="/admin/produktable" element={<AdminProduk />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/produk" element={<Produk />} />
      
      {/* </Route> */}
    </Routes>
  );
}