import Navbar from "../src/components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Security, LoginCallback } from '@okta/okta-react';
import home from "../src/components/home";
import cart from "../src/components/cart";
import checkout from "../src/components/checkout";
import Allorders from "../src/components/allorders";
import React from 'react';
import "./App.css";
import Unauthorized from "./components/NotAuthorized";
import oktaAuth from "./components/oktaAuth";

function App() {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(originalUri || '/');
  };
  const allowedGroup = "order_management";
  return (
    <div className="App">
      <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Navbar/>
        <Routes>
          <Route exact path="/" Component={home} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route exact path="/cart" Component={cart} />
          <Route path="/checkout" Component={checkout} />
          <Route path="/allorders" Component={(props) => <Allorders {...props} allowedGroup={allowedGroup} />} />
          <Route path="/unauthorized" Component={Unauthorized} />
        </Routes>
      </Security>
      </Router>
    </div>
  );
}

export default App;
