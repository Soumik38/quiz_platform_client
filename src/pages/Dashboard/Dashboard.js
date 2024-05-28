import React, { useState ,useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import Header from "../header/header"
import Footer from "../footer/footer"
import './Dashboard.css'

const Dashboard=()=> {
    // const [count,setCount]=useState(0)
    const [qArr,setQArr]=useState([])
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [attempts,setAttempts]=useState()

    const nav=useNavigate()
    
    const startQuiz=async(e)=>{
        e.preventDefault()
        await axios.get('http://localhost:4000/start').then((response)=>{
            setQArr([...qArr , response.data])
            nav('/quiz',{state:{array:response.data,email}})
        }).catch((error)=>{
            console.log(error)
        })
    }

    

    useEffect(() => {
      setEmail(localStorage.getItem('myEmail') ||'')
      
      fetch(`http://localhost:4000/user/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
          } else {
            setName(data.name);
          }
      })
      .catch(error => console.error('Error fetching user by email:', error));
		  localStorage.setItem('myName', JSON.stringify(name))
	  }, [name,email])
    
    useEffect(()=>{
      fetch(`http://localhost:4000/get_attempts/${email}`).then(response=>response.json()).then(data=>{
        console.log(data)
        if (data.error) {
          console.error(data.error);
        } else {
          setAttempts(data);
        }
      })
    },[email])


    const DateTimeExtractor = (timestamp) => {
      const date = new Date(timestamp);
      const dateString = date.toISOString().split('T')[0];

      const timeString = date.toISOString().split('T')[1].split('.')[0];
      return [dateString,timeString]
    };


    return(
        <>
          {localStorage.getItem('token')==='true'?<Header page='dash' login={true}/>:<Header page='dash' login={false}/>}
            <div className="box">
              {localStorage.getItem('token')==='true'?
              <div className="login-view">
                
                {attempts?.length>0 && <div className="container">
                  <table className="table-container">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts?.map((att,attIn)=>{
                        return(<tr className={att.qualify===true && "table-container-qualified"} >
                          <td>{DateTimeExtractor(att.date)[0]}</td>
                          <td>{DateTimeExtractor(att.date)[1]}</td>
                          <td>{att.marks}</td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                </div>}

                <div className="container">
                  <h1>Welcome <span className="user-name">{name}</span></h1>
                  <button className='container-sign' onClick={startQuiz}>Start</button>
                </div>


              </div>
              :<div className="container">
                <h1>Welcome to the  <span className="user-name">Cyber-Security Quiz</span></h1>
                <h3>Sign In or Sign Up to get started</h3>
                <button className='container-sign' onClick={()=>nav('/signin')}>Sign In</button>
                <button className='container-sign' onClick={()=>nav('/signup')}>Sign Up</button>
              </div>}
            </div>
          <Footer/>
        </>
    )
}
export default Dashboard;