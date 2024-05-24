import React from "react"
import { useNavigate,useLocation } from "react-router-dom"

const Result=()=>{
    const location=useLocation()
    const nav=useNavigate()
    const re =location.state.final_result || ''
    const marks=location.state.marks || 0

    return(<>
        you have {re}
        <h1>{marks}/10</h1>
    </>)

}
export default Result