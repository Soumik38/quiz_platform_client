import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from '../header/header'
import Footer from '../footer/footer'
import './Result.css'
const Result=()=>{
    const location=useLocation()
    const marks=location.state.marks || 0
    const full=location.state.full || 0
    const result=location.state.qualify || false

    

    return(<>
        <Header page='quiz' />
        <div className="result-container">
            <div className="result-content">
                {result===true?<h1>Congratulations</h1>:<h1>Try Again</h1>}
                <h4>You have scored :</h4>
                <h2>{marks}/{full}</h2>
            </div>
        </div>
        <Footer/>
    </>)
    
}
export default Result