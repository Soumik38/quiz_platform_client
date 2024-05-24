import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from '../header/header'
import Footer from '../footer/footer'
import './Result.css'
const Result=()=>{
    const location=useLocation()
    const marks=location.state.marks || 0
    const full=location.state.full || 0
    const [result,setResult]=useState()

    useEffect(()=>{
        const points=marks/full
        setResult(points>=0.5?'Congratulations!':'Try Again')
    },[marks,full])

    return(<>
        <Header page='result' />
        <div className="result-container">
            <div className="result-content">
                <h1>{result}</h1>
                <h4>You have scored :</h4>
                <h2>{marks}/{full}</h2>
            </div>
        </div>
        <Footer/>
    </>)
    
}
export default Result