import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login"
import AccountSettings from "./pages/AccountSettings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react";
import "./app.css"

function App() {
  const [user, setUser] = useState()
  const [invoices, setInvoices] = useState()
  

  useEffect(() => {
    const getUser = async () => {
      try {
      const response = await fetch('http://localhost:8000/auth/login/success', {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      })
        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        console.error(err)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await fetch('http://localhost:8000', {
          method: 'GET',
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          }
        })
        const data = await response.json()
        setInvoices(data.invoices)
      } catch (err) {
        console.error(err)
      }
    }
    getInvoices() 
  })
  console.log(invoices)
 
  return ( 
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route>
            <Route path='/' element={user ? <Home invoices={invoices} /> : <Navigate to="/login" />} />
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
