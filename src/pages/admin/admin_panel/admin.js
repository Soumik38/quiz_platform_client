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
          <h1>Welcome to the admin panel</h1>
          <button className='container-sign' onClick={()=>nav('/question_list')}>Add Questions</button>
          <button className='container-sign' onClick={displayUsers}>Display users</button>
        </div>
        <Footer/>
    </>)
}
export default Admin