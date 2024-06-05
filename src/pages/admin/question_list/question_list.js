import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './question_list.css'

import Header from "../../header/header"
import Footer from "../../footer/footer"

const QuestionList=()=>{
    const [qArr,setQArr]=useState([])
    const nav=useNavigate()

    const fetchQ=async()=>{
        
        try{
            await axios.get('https://quiz-platform-server.onrender.com/all_questions').then((response)=>{
            setQArr(response.data)})
        }catch(error){
            console.log(error)
        }
    }

    const deleteQ=async(q)=>{
        try{
            await axios.post(`https://quiz-platform-server.onrender.com/deleteq`,{id:q._id}).then(res=>{
                if(res.data==='success'){
                    alert('Question Deleted')
                    fetchQ()
                }
            })
        }catch(e){
            alert('Error')
        }
    }

    useEffect(()=>{
        fetchQ()
    },[])

    return(<>
        <Header page='admin'/>
        <div className="quiz-container">
                <div className="submit-container">
                    <button onClick={()=>nav('/addq')} className="submit-button">Add Question</button>
                </div>
                    {qArr?.map((q, qIndex) => (
                        <div key={qIndex} className="question-block">
                            <div className="question-header">
                                <h3 className="question-title">{qIndex+1}. {q.title}</h3>
                                <span className='delete-button' onClick={()=>deleteQ(q)}>X</span>
                            </div>
                            <div className="options-container">
                                {q.options.map((op, opIndex) => (
                                    <div className="option">
                                        <span className={`${(opIndex===q.correctans && `table-container-qualified`)}`}>
                                            {opIndex+1}. {op}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            <Footer/>
    </>)
}
export default QuestionList