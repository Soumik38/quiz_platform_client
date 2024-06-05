import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'

const SignIn = () => {
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const [adminChecked,setAdminChecked]=useState(false)
    const nav=useNavigate()
    

    const newLogin=()=>{
      localStorage.clear()
    }

    useEffect(()=>{
      newLogin()
    },[])


    const submit=async (e)=>{
      e.preventDefault()
        try{
          // console.log(adminChecked)
          if(!email || !pass) {
            alert('Fill all required fields.')
          }else{
            await axios.post(`https://quiz-platform-server.onrender.com/signin`,{email,pass,adminChecked}).then(res=>{
              // console.log(res.data)
              if(res.data.auth==='authorize'){
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('loggedin',true)
                localStorage.setItem('myEmail', email)
                adminChecked===true?nav('/admin'):nav('/')
              }else if(res.data.auth==='notexists'){
                alert('User does not exist.')
              }else if(res.data.auth==='wrongpass'){
                alert('Wrong password')
              }
            })
          }
        }catch(e){
          alert('Error')
        }
    }

  return (
    <>
      <Header page='signin'/>
      <div className='container'>
      <div className='login-container'>
        <h1 className='text-4xl font-extrabold'>Welcome Back</h1>
        <form action='POST' className=''>
          <input type='email' name='email' placeholder='Email Address' onChange={(e)=>{setEmail(e.target.value)}} className='email'/>
          <input name='password' type='password' id='password' placeholder='Password' onChange={(e)=>{setPass(e.target.value)}}/>
          <div className='checked'>
            <input type='checkbox' onChange={e=>setAdminChecked(e.target.checked)}/>
            <span>Login as Administrator</span>
          </div>
          <button type='submit' onClick={submit} className='login-button'>Login</button>
        </form>
        <div className='mt-4'>
          <small onClick={()=>nav('/signup')} >Do not have an account ?</small>
        </div>
      </div>
    </div>
    <Footer/>
      
    </>
  )
}

export default SignIn