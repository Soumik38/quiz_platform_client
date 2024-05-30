import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from '../../header/header'
import Footer from '../../footer/footer'

const UserRes=()=>{
    const location=useLocation()
    const email=location.state?.mail || ''
    const [attempts,setAttempts]=useState([])
    const [name,setName]=useState('')

    useEffect(() => {      
        fetch(`http://localhost:4000/user/${email}`)
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

    return(<>
        <Header page='user_res'/>
        <div className="container">
          <h1>Q</h1>
                  <div>
                    <h1>NAME : {name}</h1>
                    <h2>E-MAIL : {email} </h2>
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
                <h2>q</h2>
                <Footer/>
    </>)
}

export default UserRes