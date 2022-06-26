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
  const [user, setUser] = useState([])
  const [invoiceList, setInvoiceList] = useState([])
  

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser()
      console.log(userData)
      setUser(userData.user)
      
    }

    const getInvoices = async () => {
      const fetchedInvoices = await fetchInvoices()
      setInvoiceList(fetchedInvoices)
    }

    getUser()
    getInvoices()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/login/success', {
        method: 'GET',
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      })
        const data = await response.json()
        return data
      } catch (err) {
        console.error(err)
      }
    }

  const fetchInvoices = async () => {
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
      return data.invoices
    } catch (err) {
      console.error(err)
    }
  }
 
  return ( 
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route>
            <Route path='/' element={user ? <Home invoices={invoiceList} user={user}/> : <Navigate to="/login" />} />
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route path='/invoice/:id' element={user ? <Invoice invoices={invoiceList} /> : <Navigate to="/login" />} />
            <Route path='/accountsettings/:user' element={<AccountSettings user={user}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
