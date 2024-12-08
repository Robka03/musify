import './App.css';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './components/notfound/NotFound';
import Login from './components/login/Login';
import RegistrationContainer from './components/register/RegistrationContainer';
import Logout from './components/logout/Logout';
import Profile from './components/profile/Profile';
import Cart from './components/cart/Cart';
import Order from './components/order/Order';
import OrderSuccess from './components/order/OrderSuccess';
// import About from './About';
// import Contact from './Contact';

function App() {

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
            <Route path="/cart" element={<Cart/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/ordersuccess" element={<OrderSuccess/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
