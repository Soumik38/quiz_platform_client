import React,{useState} from 'react'
import axios from 'axios'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const nav=useNavigate()
    
    const submit=async (e)=>{
      e.preventDefault()
        try{
          await axios.post(`http://localhost:4000/signin`,{email,pass}).then(res=>{
            console.log(res)
            if(res.data==='authorize'){
              localStorage.setItem('token',true)
              localStorage.setItem('myEmail', email)
              nav('/')
            }else if(res.data==='notexists'){
              alert('User does not exist.')
            }else if(res.data==='wrongpass'){
              alert('Wrong password')
            }
          })
        }catch(e){
          alert('Error')
        }
    }


  return (
    <div className='container'>
      <div className='login-container'>
        <h1 className='text-4xl font-extrabold'>Welcome Back</h1>
        <form action='POST' className=''>
          {/* <label for="email">Email Address</label> */}
          <input type='email' name='email' placeholder='Email Address' onChange={(e)=>{setEmail(e.target.value)}} className='email'/>
          {/* <label for="password">Password</label> */}
          <input name='password' type='password' id='password' placeholder='Password' onChange={(e)=>{setPass(e.target.value)}}/>
          <button type='submit' onClick={submit} className='login-button'>Login</button>
        </form>
        <div className='mt-4'>
        <small onClick={()=>nav('/signup')} >Do not have an account ?</small>
        </div>
      </div>
    </div>
  )
}

export default SignIn