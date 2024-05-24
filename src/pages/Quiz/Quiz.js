import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

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
            if (selectedOptions[qIndex] !== undefined && q.options[q.correctans] === q.options[selectedOptions[qIndex]]) {
                marks++
            }
        });
        console.log("Final Marks:", marks);
        let re
        if (marks>1) {
            re='pass'
        }else{
            re='fail'
        }
        nav('/result', { state: { marks,final_result:re} });
    };

    return (
        <div>
            {questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <h3>{q.title}</h3>
                    <div>
                        {q.options.map((op, opIndex) => (
                            <div key={opIndex}>
                                <input
                                    type="radio"
                                    onChange={() => handleOptionChange(qIndex, opIndex)}
                                />
                                <label>{op}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Quiz;
