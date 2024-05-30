import { useNavigate } from 'react-router-dom'
import './header.css'
const Header=(props)=>{
    const nav=useNavigate()
    if(props.login===false){
        return(<div className='fix-header'>
            <div className="header">
                <h3 className='watermark' onClick={()=>window.location.href='https://www.easterncoal.nic.in/'}>ECL</h3>
                <h1 className='title'>Cyber-Security</h1>
            </div>
        </div>)
    }
    return(<div className='fix-header'>
        <div className="header">
            <h3 className='watermark'>ECL</h3>
            <h1 className='title'>Cyber-Security</h1>
            {props.page==='login' && 
                <button className='header-button' onClick={()=>{
                    localStorage.clear()
                    nav('/')
                }}>Logout</button>
            }
            {props.page==='quiz' && 
            <button className="header-button" onClick={()=>nav('/dashboard')}>Go Back</button>}
            {props.page==='admin' && 
            <button className="header-button" onClick={()=>nav('/admin')}>Go Back</button>}
            {props.page==='addq' && 
            <button className="header-button" onClick={()=>nav('/question_list')}>Go Back</button>}
            {props.page==='user_res' && 
            <button className="header-button" onClick={()=>nav('/user_list')}>Go Back</button>}
            {props.page==='signin' &&
            <button className="header-button" onClick={()=>nav('/')}>Go Back</button>}
        </div>
    </div>)
}
export default Header