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
        await axios.get('https://quiz-platform-server.onrender.com/start').then((response)=>{
            setQArr([...qArr , response.data])
            nav('/quiz',{state:{array:response.data,email}})
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
      setEmail(localStorage.getItem('myEmail') ||'')
      
      fetch(`https://quiz-platform-server.onrender.com/user/${email}`)
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
      fetch(`https://quiz-platform-server.onrender.com/get_attempts/${email}`).then(response=>response.json()).then(data=>{
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
      return (<>
        <td>{dateString}</td>
        <td>{timeString}</td></>)
    };

    return(
        <>
          <Header page='signin'/>
            <div className="d-container">
            
            <button className='login-button' onClick={startQuiz}>Start Quiz</button>
                  {attempts?.length>0 && <div className="t-container">
                    <h2>My Attempts :</h2>
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
                          {DateTimeExtractor(att.date)}
                          <td>{att.marks}</td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                    </div>}
              </div>
              
          <Footer/>
        </>
    )
}
export default Dashboard;