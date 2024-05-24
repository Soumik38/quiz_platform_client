import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css'
import Header from "../header/header";
import Footer from '../footer/footer'
function Quiz() {
    const location = useLocation();
    const nav = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({}); // To keep track of selected options

    const questions = location.state?.array || [];

    const handleOptionChange = (qIndex, opIndex) => {
        setSelectedOptions({
            ...selectedOptions,
            [qIndex]: opIndex
        });
    };

    const handleSubmit = () => {
        let marks=0
        questions.forEach((q, qIndex) => {
            console.log(q.options[q.correctans],'===',q.options[selectedOptions[qIndex]])
            if (selectedOptions[qIndex] !== undefined && q.options[q.correctans] === q.options[selectedOptions[qIndex]]) {
                marks++
                console.log('correct')
            }
        });
        console.log("Final Marks:", marks);
        nav('/result', { state: { marks,full:questions.length} });
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
