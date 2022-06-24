import React from "react";
import Card from "../components/Card"


const Home = ( {invoices} ) => { 
    return (
    <div className="home">
        {invoices.map(i=>(
            <Card key={i._id} invoice={i} />
        ))}
    </div>
    )
}

export default Home