import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate,Outlet } from "react-router-dom";
const PrivateRoute=()=>{
    
    const [loggedin,setLoggedin]=useState(null)


    useEffect(()=>{

        const checkAuth = async () => {
            try {
              const token = localStorage.getItem("token");
              if (token) {
                const response = await axios.get("https://quiz-platform-server.onrender.com/checktoken", {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setLoggedin(response.data.message); // Check for specific message indicating authorization
              } else {
                setLoggedin(false);
              }
            } catch (error) {
              console.error("Error checking token:", error);
              setLoggedin(false); // Set to false on error
            }
          }
          checkAuth(); 
          console.log(loggedin)
    },[loggedin])

    if (loggedin === null) {
        return <div>Loading...</div>;
    }
    return(     
        <>
            {console.log(loggedin)}
            {loggedin? <Outlet/> : <Navigate to='/signin'/>}
        </>
    )
}
export default PrivateRoute