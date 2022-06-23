import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login"
import AccountSettings from "./pages/AccountSettings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./app.css"

function App() {
  const user = false;
  return ( 
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route path='/invoice/:id' element={user ? <Invoice /> : <Navigate to="/login" />} />
            <Route path='/accountsettings/:user' element={<AccountSettings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
