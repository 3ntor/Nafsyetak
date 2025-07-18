import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Booking from './pages/Booking';
import Doctor from './pages/Doctor';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';

const Placeholder = ({ text }) => <div style={{ padding: 32, textAlign: 'center' }}>{text}</div>;

function App() {
  // TODO: Replace with real auth state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
      <Routes>
        <Route path="/" element={<Placeholder text="Home Page" />} />
        <Route path="/services" element={<Placeholder text="Services Page" />} />
        <Route path="/booking" element={<Placeholder text="Booking Page" />} />
        <Route path="/blog" element={<Placeholder text="Blog Page" />} />
        <Route path="/doctor" element={<Placeholder text="Doctor Page" />} />
        <Route path="/faqs" element={<Placeholder text="FAQs Page" />} />
        <Route path="/contact" element={<Placeholder text="Contact Us Page" />} />
        <Route path="/login" element={<Placeholder text="Login Page" />} />
        <Route path="/signup" element={<Placeholder text="Sign Up Page" />} />
          <Route path="/booking" element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  } />
    <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
    <Route path="/services" element={<Services />} />
  <Route path="/booking" element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  } />
    <Route path="/blog" element={<Blog />} />
<Route path="/doctor" element={<Doctor />} />
<Route path="/faqs" element={<FAQs />} />
<Route path="/contact" element={<Contact />} />
<Route path="/" element={<Home />} />
<Route path="/admin" element={
  <ProtectedRoute role="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />
<Route path="/my-bookings" element={<MyBookings />} />
  <Route path="/my-bookings" element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  } />
      </Routes>
      <Footer />
    </Router>
    
  );

}

export default App;
