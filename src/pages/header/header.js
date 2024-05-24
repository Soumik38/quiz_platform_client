import { useNavigate } from 'react-router-dom'
import './header.css'
const Header=(props)=>{
    const nav=useNavigate()
    return(<div className='fix-header'>
        <div className="header">
            <h3 className='watermark'>ECL</h3>
            {props.login!==false && <h1 className='title'>Cyber-Security Quiz</h1>}
            {(props.page==='dash' && props.login===true) && 
                <button className='header-button' onClick={()=>{
                    localStorage.clear()
                    window.location.reload()
                }}>Logout</button>
            }
            {(props.page==='quiz' || props.page==='result') && 
            <button className="header-button" onClick={()=>nav('/')}>Go Back</button>}
        </div>
    </div>)
}
export default Header