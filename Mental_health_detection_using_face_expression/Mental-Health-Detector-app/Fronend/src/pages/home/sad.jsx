import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sad = () => {
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [userSelections, setUserSelections] = useState([]);
  const [sum, setSum] = useState(0);

  const navigate = useNavigate();
  const fetchSurveyQuestions = async (props) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/detect_emotion_and_questionnaire?emotion=sad",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch survey questions");
      }

      const data = await response.json();
      setQuestions(data.questions);
      setTotalScore(data.total_score);

      // Initialize userSelections with default values
      const initialSelections = Array(data.questions.length).fill(null);
      setUserSelections(initialSelections);
    } catch (error) {
      console.error("Error fetching survey questions:", error);
      setErrorMessage("Failed to fetch survey questions");
    }
  };

  const token = Cookies.get("bearerToken");

  if (!token) {
    navigate("/auth/Login");
    return;
  }

  const saveData = async (mentalSum, mood) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/save_user_data", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // Use the token directly
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ total_score: mentalSum, mental_health: mood  }) 
        });

        console.log(response);
        console.log(mentalSum);
        console.log(mood);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};


  useEffect(() => {
    fetchSurveyQuestions();
  }, []);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    // Create a copy of the userSelections array to avoid mutating state directly
    const updatedSelections = [...userSelections];

    // Update the selected option for the current question
    updatedSelections[questionIndex] = optionIndex;

    // Update state with the new selections
    setUserSelections(updatedSelections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement logic for submitting user selections
    // You can use userSelections to send the selected options to your backend
    console.log("User Selections:", userSelections);

    const calculatedSum = userSelections.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    setSum(calculatedSum);
    console.log("Total Score", calculatedSum);

    if(calculatedSum >= 15){
      saveData(calculatedSum, "Depressed");
      navigate(`/result_depressed/${calculatedSum}`);
    }
    else if(calculatedSum >=11 && calculatedSum <15){
      saveData(calculatedSum, "Anxiety");
      navigate(`/result_anxiety/${calculatedSum}`);
    }
    else if(calculatedSum >=8 && calculatedSum <11){
      saveData(calculatedSum, "Stressed");
      navigate(`/result_stressed/${calculatedSum}`);
    }
    else if(calculatedSum < 7){
      saveData(calculatedSum, "Happy");
      navigate(`/result_happy/${calculatedSum}`);
    }
  };
  // const handleSum = () => {
  // const sum = userSelections.reduce((acc, currentValue) => acc + currentValue, 0);
  // navigate("/result")
  // };

  return (
    <div className="bg-cover bg-center h-screen overflow-y-auto" >
      <div className="absolute inset-0 overflow-y-auto" style={{backgroundImage: "url('emotion_bg.png')", backgroundSize: "cover"}}>
      <div className="bg-cover bg-center h-screen overflow-y-auto" > 
        <h1 className="mt-20 text-3xl font-bold mb-4 md:text-center text-black">
          Survey Questionnaire
        </h1>
        <form onSubmit={handleSubmit} className="text-left">
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <p className="text-xl text-black mb-2 ml-5">{question.question}</p>
              <div className="flex flex-col space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-left ml-10">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={option}
                      checked={userSelections[questionIndex] === optionIndex}
                      onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          {errorMessage && (
            <div className="text-red-500 mt-4">{errorMessage}</div>
          )}
          <button type="submit" className="block mx-auto bg-cyan-500 text-black font-semibold px-4 py-2 rounded mb-10">
          Submit
          </button>
  
        </form>
      </div>
      </div>
      </div>
    );
};
export default Sad;
