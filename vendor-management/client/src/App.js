import React from 'react'
import {Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import Login from "./components/Login";
import NewVendorList from './components/vendorsList';
import VendorRegister from './components/VendorRegister'
import UserCart from './components/UserCart';
import UserOrder from './components/UserOrder';
import VendorListing from './components/vendorListing';
import ChooseUser from './components/ChooseUser'
import { BrowserRouter as Router,Route } from 'react-router-dom';
import CustomerRegister from './components/CustomerRegister';
import EditItem from './components/EditItem';
import VendorMenu from './components/VendorMenu';

//App.js will contain everything
//imported to index.js
// to show whatever's in index.js, document.getElementById(root)
//const { isAuthenticated } = useContext(AuthContext);
const App =()=> {
    //const {user,setUser,isAuthenticated,setIsAuthenticated}=useContext(AuthContext);
    //console.log(user);
    // console.log(isAuthenticated);
    // {{---------- Add more private routes after vendor side }}
    return (
        <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            
            <Route path="/about" element={<About/>} />
            
            <Route path="/contact" element={<Contact/>} />

            <Route path="/VendorSignup" element={<VendorRegister/>} />

            <Route path="/ChooseUser" element={<ChooseUser/>} />
            
            <Route element={<UnPrivateRoute/>}>
                 <Route path="/Login" element={<Login/>} />
                 <Route path="/Signup" element={<CustomerRegister/>} />
            </Route>            

            <Route path="/vendors" element={<NewVendorList/>} />

            <Route path="/vendors/:id" element={<VendorListing/>} />
            
            <Route element={<PrivateRoute/>}>
                 <Route path="/Cart" element={<UserCart/>}/> 
            </Route>

            <Route element={<PrivateRoute/>}>
                 <Route path="/Orders" element={<UserOrder/>}/> 
            </Route>

            {/* show error page if route doesnt match with anything */}
            <Route path="*" element={<VendorMenu/>} />
            </Routes>
        </Router>
    )
}

export default App;