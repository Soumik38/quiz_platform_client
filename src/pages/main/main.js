import React from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import { Timeline} from 'react-twitter-widgets'
import './main.css'
import { useNavigate } from "react-router-dom"
const Main=()=>{
    const nav=useNavigate()
    return(<>
    <Header/>
        <div className="container">
        <div className="master-container">
            <div className="class-buttons">
            <div className="buttons">
                <button onClick={()=>nav('/dashboard')} className="submit-button">Take Quiz</button>
                <button  className="submit-button">Feed</button>
            </div>
            </div>
            <div className="timeline">
            <Timeline dataSource={{sourceType: 'profile',screenName: 'StaySafeOnline'}} options={{height: '500',width:'500'}}/>
            </div>
        </div>
        </div>
    <Footer/>
    </>)
}
export default Main 