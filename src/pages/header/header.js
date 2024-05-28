import { useNavigate } from 'react-router-dom'
import './header.css'
const Header=(props)=>{
    const nav=useNavigate()
    return(<div className='fix-header'>
        <div className="header">
            <h3 className='watermark'>ECL</h3>
            <h1 className='title'>Cyber-Security</h1>
            {(props.page==='dash' && props.login===true) && 
                <button className='header-button' onClick={()=>{
                    localStorage.clear()
                    window.location.reload()
                }}>Logout</button>
            }
            {(props.page==='quiz' || props.page==='result') && 
            <button className="header-button" onClick={()=>nav('/dashboard')}>Go Back</button>}
            {props.page==='admin' && 
            <button className="header-button" onClick={()=>nav('/admin')}>Go Back</button>}
            {props.page==='addq' && 
            <button className="header-button" onClick={()=>nav('/question_list')}>Go Back</button>}
            {props.page==='user_res' && 
            <button className="header-button" onClick={()=>nav('/user_list')}>Go Back</button>}
            {props.page==='admin_panel' && 
            <button className='header-button' onClick={()=>{
                localStorage.clear()
                nav('/signin')
            }}>Logout</button>
            }
        </div>
    </div>)
}
export default Header