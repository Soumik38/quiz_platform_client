import { useEffect,useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from '../../header/header'
import Footer from '../../footer/footer'
import './user_list.css'

const UserList=()=>{
    const nav=useNavigate()
    const [users,setUsers]=useState([])

    useEffect(()=>{
        fetch(`http://localhost:4000/all_users`).then(response=>response.json()).then(data=>{
        console.log(data)
        if (data.error) {
          console.error(data.error);
        } else {
          setUsers(data);
        }
      })
    },[users])

    const clickUser= async (us)=>{
        nav('/user_data',{state:{mail:us.email}})
    }

    return(<>
    <Header page='admin'/>
        <div className="container">
        <table className="table-container">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Attempts</th>
                </tr>
            </thead>
            <tbody>
                {users.map((us)=>{
                    return(<tr className="t-row" onClick={()=>clickUser(us)} >
                        <td>{us.name}</td>
                        <td>{us.email}</td>
                        <td>{us.attempts}</td>
                    </tr>)
                })}
            </tbody>
        </table>
        </div>
    <Footer/>
    </>)
}
export default UserList