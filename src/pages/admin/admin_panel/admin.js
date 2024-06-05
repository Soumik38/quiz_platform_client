import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../header/header"
import Footer from '../../footer/footer'
const Admin=()=>{
    const nav=useNavigate()
    
    const displayUsers=()=>{
        nav('/user_list')
    }

    return(<>
        <Header page='login'/>
        <div className="container">
          <div>
            <h1>Welcome to the admin panel</h1>
            <div>
                <button className='login-button' onClick={()=>nav('/question_list')}>Add Questions</button>
                <button className='login-button' onClick={displayUsers}>Display users</button>
            </div>
          </div>
        </div>
        <Footer/>
    </>)
}
export default Admin