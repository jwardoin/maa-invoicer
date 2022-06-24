import React from "react";
import Card from "../components/Card"
import {posts} from "../data"

const Home = ({ invoices }) => {
    return (
    <div className="home">
        {/* {invoices.map(invoice => {
            <Card key={invoice._id} invoice={invoice} />
        })} */}
        {posts.map(post=>(
            <Card key={post.id} post={post}/>
        ))}
    </div>
    )
}

export default Home