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

  const createInvoice = async () => {
    const inputs = Array.from(document.querySelectorAll('input'))
    const response = await fetch('http://localhost:8000/invoice/newinvoice' , {
        method: 'post', 
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }, 
        body: JSON.stringify({
            payPeriodStart: inputs[0].value,
            payPeriodEnd: inputs[1].value,
            holidayStart: inputs[3] ? inputs[3].value : null,
            holidayEnd: inputs[4] ? inputs[4].value : null
        })
    })
    const data = await response.json()
    setInvoiceList([...invoiceList, data])
    console.log(data)
  }

  const deleteInvoice = async (invoiceId) => {
    const response = await fetch('http://localhost:8000/invoice/delete' , {
        method: 'delete', 
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            id: invoiceId
        })
    })
    
    const data = await response.json()
    setInvoiceList(invoiceList.filter(invoice => invoice._id !== invoiceId))
    console.log(data)
}

 
  return ( 
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route>
            <Route path='/' element={user ? <Home invoices={invoiceList} user={user} onAdd={createInvoice} onDelete={deleteInvoice}/> : <Navigate to="/login" />} />
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route path='/invoice/:id' element={user ? <Invoice invoices={invoiceList} /> : <Navigate to="/login" />} />
            <Route path='/accountsettings/' element={<AccountSettings user={user}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
