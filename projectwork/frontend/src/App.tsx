import './App.css';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './components/notfound/NotFound';
import Login from './components/login/Login';
import RegistrationContainer from './components/register/RegistrationContainer';
import { getCurrentUser } from './network/currentUser';
import { useEffect } from 'react';
import {  useUser } from './components/context/UserContext';
import Logout from './components/logout/Logout';
import Profile from './components/profile/Profile';
// import About from './About';
// import Contact from './Contact';

function App() {
  const { user, setUser } = useUser();

  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationContainer />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
