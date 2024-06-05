import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from '../../header/header'
import Footer from '../../footer/footer'
import './user_res.css'
const UserRes=()=>{
    const location=useLocation()
    const email=location.state?.mail || ''
    const [attempts,setAttempts]=useState([])
    const [name,setName]=useState('')

    useEffect(() => {      
        fetch(`https://quiz-platform-server.onrender.com/user/${email}`)
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              console.error(data.error);
            } else {
              setName(data.name);
            }
        })
        }, [email])


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
        return [dateString,timeString]

      };

    return(<>
        <Header page='user_res'/>
        <div className="cont">
          
          <div className="infoo">
            <h2>NAME : {name}</h2>
            <h3>E-MAIL : {email} </h3>
          </div>

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
        </div>
       
      <Footer/>
    </>)
}

export default UserRes