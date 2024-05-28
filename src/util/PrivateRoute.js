import { Navigate,Outlet } from "react-router-dom";
const PrivateRoute=()=>{
    // let auth={'token':false}
    return(
        // auth.token
        localStorage.getItem('token')==='true'? <Outlet/> : <Navigate to='/signin'/>
    )
}
export default PrivateRoute