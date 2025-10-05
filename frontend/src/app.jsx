import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './login.jsx'; 
import Signup from './signup.jsx'; 
import Dashboard from './dashboard.jsx';
import About from './about.jsx';
import Shop from './shop.jsx';
import Blog from './blog.jsx';
import Contact from './contact.jsx';
import Admin from './admindashboard.jsx';
import Produk from './produk.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/produk" element={<Produk />} />

      
    </Routes>
  );
}