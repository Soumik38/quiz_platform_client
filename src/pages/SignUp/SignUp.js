import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './SignUp.css'
const SignUp = () => {
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [name,setName]=useState('')
  const nav=useNavigate()
  
  const submit=async(e)=>{
    e.preventDefault()
    try{
      if(!name || !email || !pass) {
        alert('Fill all required fields.')
      }
      await axios.post(`http://localhost:4000/signup`,{name,email,pass}).then(res=>{
        console.log(res.data)
        if(res.data==='exists'){
          alert('User already exists.')   
        }else if(res.data==='notexists'){
          localStorage.setItem('jwt', JSON.stringify('loggedin'))
          localStorage.setItem('myEmail', JSON.stringify(email))
          nav('/',{state:{email}})
        
        }
      })
    }catch(e){
      alert('invalid')
    }
  }

  
  return (
    <div className='container'>
      <div className='signup-container'>
        <h1 className='text-4xl font-extrabold'>Welcome</h1>
        <form action='POST'>
          {/* <label for="name">Name</label> */}
          <input type='text' name='Name' id='name' placeholder='Enter name' onChange={(e)=>{setName(e.target.value)}}/>
          {/* <label for="email">Email Address</label> */}
          <input type='email' name='email' id='email' placeholder='Email Address' onChange={(e)=>{setEmail(e.target.value)}}/>
          {/* <label for="password">Password</label> */}
          <input name='password' type='password' id='password' placeholder='Set password' onChange={(e)=>{setPass(e.target.value)}}/>
          {/* <label for="confirmPassword">Confirm Password</label> */}
          {/* <input name='confirmPassword' type='password' id='password' placeholder='Confirm password' onChange={(e)=>{setPass(e.target.value)}}/>
           */}
          
          <button type='submit' onClick={submit} className='signup-button'>Sign Up</button>
        </form>
        {/* <small>By creating an account, you agree to the <a >Terms of Use</a> and <a>Privacy Policy</a>.</small> */}
        <div className='mt-4'>
        <small onClick={()=>nav('/signin')} >Already have an account ?</small>
        </div>
      </div>
    </div>
  )
}

export default SignUp