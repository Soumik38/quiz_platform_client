import React, { useState ,useEffect} from "react";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
const Dashboard=()=> {
    // const [count,setCount]=useState(0)
    const [qArr,setQArr]=useState([])
    const [name,setName]=useState('')
    

    const nav=useNavigate()
    const location=useLocation()

    

    const startQuiz=async(e)=>{
        e.preventDefault()
        await axios.get('http://localhost:4000/start').then((response)=>{
            setQArr([...qArr , response.data])
            nav('/quiz',{state:{array:response.data}})
        }).catch((error)=>{
            console.log(error)
        })
    }

    const logout=()=>{
      localStorage.clear()
      window.location.reload()
    }

    useEffect(() => {
      const email=location.state.email || localStorage.getItem('myEmail') ||''
      fetch(`http://localhost:4000/user/${email}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        if (data.error) {
          console.error(data.error);
        } else {
          setName(data.name);
        }
      })
      .catch(error => console.error('Error fetching user by email:', error));
		  localStorage.setItem('myName', JSON.stringify(name))
	  }, [name])

    return(
        <>
            {localStorage.getItem('token')=='true'?<div>
              <h1>{name}</h1>
              <button onClick={startQuiz}>Start</button>
              <button onClick={logout} >Log Out</button>
            </div>:<div>
              <button onClick={()=>nav('/signin')}>Sign In</button>
              <button onClick={()=>nav('/signup')}>Sign Up</button>
            </div>}
        </>
    )
}
export default Dashboard;