import React, { useState } from "react";
import axios from "axios";
const AddQ=()=>{

    const [title,setTitle]=useState('')
    const [ans1,setans1]=useState('')
    const [ans2,setans2]=useState('')
    const [ans3,setans3]=useState('')
    const [ans4,setans4]=useState('')
    const [correctans,setcans]=useState()

    const submit=async(e)=>{
        e.preventDefault()
        if(!title || !ans1 || !ans2 ||!ans3 ||!ans4 || !correctans) {
            alert('Fill all required fields.')
        }
        setcans(correctans - 1)
        try{
            await axios.post(`http://localhost:4000/addq`,{title,ans1,ans2,ans3,ans4,correctans}).then(res=>{
                if(res.data==='success'){
                    alert('Question Added')
                    window.location.reload()
                }
            })
        }catch(e){
            alert('Error')
        }
    }

    return(
        <>
            <div className='container'>
                <div className='login-container'>
                    <form action='POST' className=''>
                        <input type='text' name='email' placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}}/>
                        <input type='text' name='ans1' placeholder='Option 1' onChange={(e)=>{setans1(e.target.value)}}/>
                        <input type='text' name='ans2' placeholder='Option 2' onChange={(e)=>{setans2(e.target.value)}}/>
                        <input type='text' name='ans3' placeholder='Option 3' onChange={(e)=>{setans3(e.target.value)}}/>
                        <input type='text' name='ans4' placeholder='Option 4' onChange={(e)=>{setans4(e.target.value)}}/>
                        <input type='number' name='cans' placeholder='Correct Option' onChange={(e)=>{setcans(e.target.value)}}/>
                        <button type='submit' onClick={submit} className='login-button'>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AddQ