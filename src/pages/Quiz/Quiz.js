import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css'
import Header from "../header/header";
import Footer from '../footer/footer'
import axios from "axios";
function Quiz() {
    const location = useLocation();
    const nav = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({}); // To keep track of selected options

    const questions = location.state?.array || []
    const email=location.state?.email || localStorage.getItem('myEmail') || ''
    const handleOptionChange = (qIndex, opIndex) => {
        setSelectedOptions({
            ...selectedOptions,
            [qIndex]: opIndex
        });
    };


    const handleSubmit = async() => {
        let marks=0
        questions.forEach((q, qIndex) => {
            console.log(q.options[q.correctans],'===',q.options[selectedOptions[qIndex]])
            if (selectedOptions[qIndex] !== undefined && q.options[q.correctans] === q.options[selectedOptions[qIndex]]) {
                marks++
                console.log('correct')
            }
        });
        
        console.log("Marks", marks);
        const points=marks/questions.length
        const qualify=points>=0.3?true:false

        const date = new Date();

        nav('/result', { state: { marks,full:questions.length,qualify} });

        try{
            await axios.post('http://localhost:4000/attempt',{email,marks,qualify,date}).then(res=>{
                if(res.data==='success'){
                    alert('Attempt stored')
                }
            })
        }catch (e){
            alert('Attempt not stored')
        }
    };

    return (
        <>
            <Header page='quiz'/>
            <div className="quiz-container">
                <div className="master-container">        
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="question-block">
                            <h3 className="question-title">{qIndex+1}. {q.title}</h3>
                            <div className="options-container">
                                {q.options.map((op, opIndex) => (
                                    <div key={opIndex} className="option">
                                        <input
                                            type="radio"
                                            name={`question-${qIndex}`}
                                            
                                            onChange={() => handleOptionChange(qIndex, opIndex)}
                                            id={`question-${qIndex}-option-${opIndex}`}
                                        />
                                        <span htmlFor={`question-${qIndex}-option-${opIndex}`}>
                                            {opIndex+1}. {op}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="submit-container">
                        <button onClick={handleSubmit} className="submit-button">Submit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Quiz;
