import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Parameters = () => {
  const navigate = useNavigate();
  const [selectedParameter, setSelectedParameter] = useState("");
  const [calculatedSum, setInputValue] = useState("");
  const [inputvalue, setValue] = useState("");
  const token = Cookies.get("bearerToken");

  // Check if token is available, if not, navigate to the login page
  useEffect(() => {
    if (!token) {
      navigate("/auth/Login");
    }
  }, [token, navigate]);

  const parameters = [
    "Dopamine (mcg/24hr)",
    "Serotonin (ng/mL)",
    "Heart Rate (per min)",
    "Blood Pressure (mmHg)",
    "Left Ventricle (cm)",
    "Right Ventricle (cm)",
  ];

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of parameter and input value
    console.log("Selected Parameter:", selectedParameter);
    console.log("Input Value:", calculatedSum);
    // Handle submission based on the selected parameter
    if (selectedParameter==="Dopamine (mcg/24hr)"){
        if (calculatedSum>=400)
        navigate(`/result_happy/${calculatedSum}`)
        else if(calculatedSum>=250)
        navigate(`/result_anxiety/${calculatedSum}`)
        else if(calculatedSum>150)
        navigate(`/result_stressed/${calculatedSum}`)
        else
        navigate(`/result_depressed/${calculatedSum}`)
    }

    if (selectedParameter==="Serotonin (ng/mL)"){
        if (calculatedSum>=283) 
        navigate(`/result_happy/${calculatedSum}`)
        else if(calculatedSum>=200)
        navigate(`/result_anxiety/${calculatedSum}`)
        else if(calculatedSum>=150)
        navigate(`/result_stressed/${calculatedSum}`)
        else
        navigate(`/result_depressed/${calculatedSum}`)
    }

    if (selectedParameter==="Heart Rate (per min)"){
        if (calculatedSum>=60 && calculatedSum<=100)
        navigate(`/result_happy/${calculatedSum}`)
        else if(calculatedSum>100 && calculatedSum<=110)
        navigate(`/result_anxiety/${calculatedSum}`)
        else if(calculatedSum>110 && calculatedSum<=120)
        navigate(`/result_stressed/${calculatedSum}`)
        else 
        navigate(`/result_depressed/${calculatedSum}`)
    }

    if (selectedParameter==="Blood Pressure (mmHg)"){
        if (inputvalue==="Between 90/60 and 120/80")
        navigate(`/result_happy/${0}`)
        else if(inputvalue==="Less than 90/60")
        navigate(`/result_anxiety/${0}`)
        else if(inputvalue==="More than 120/80")
        navigate(`/result_depressed/${0}`)
    }

    if (selectedParameter==="Left Ventricle (cm)"){
        if (calculatedSum>=3.5 && calculatedSum<=5.3)
        navigate(`/result_happy/${calculatedSum}`)
        else if(calculatedSum>5.3 && calculatedSum<=5.6)
        navigate(`/result_anxiety/${calculatedSum}`)
        else if(calculatedSum>5.6 && calculatedSum<=5.9)
        navigate(`/result_stressed/${calculatedSum}`)
        else
        navigate(`/result_depressed/${calculatedSum}`)
    }

    if (selectedParameter==="Right Ventricle (cm)"){
        if (calculatedSum>=0.5 && calculatedSum<=2.1)
        navigate(`/result_happy/${calculatedSum}`)
        else if(calculatedSum>2.1 && calculatedSum<=2.5)
        navigate(`/result_anxiety/${calculatedSum}`)
        else if(calculatedSum>2.5 && calculatedSum<=3)
        navigate(`/result_stressed/${calculatedSum}`)
        else
        navigate(`/result_depressed/${calculatedSum}`)
    }

    

    // Reset the input fields
    setSelectedParameter("");
    setInputValue("");
  };

  const handleBloodPressureChange = (event) => {
    setValue(event.target.value);
  };
  console.log(inputvalue);

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-20 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/guidelines_bg.png')" }}>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto" style={{ marginLeft: '210px' }}>   
           <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
        Parameters
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <label htmlFor="parameterSelect" className="text-lg font-semibold mb-2 text-left">
              Select Parameter
            </label>
            <select
              id="parameterSelect"
              value={selectedParameter}
              onChange={handleParameterChange}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="">Select...</option>
              {parameters.map((parameter) => (
                <option key={parameter} value={parameter}>
                  {parameter}
                </option>
              ))}
            </select>
          </div>
          {selectedParameter === "Blood Pressure (mmHg)" && (
            <div className="w-full max-w-lg">
              <label htmlFor="inputValue" className="text-lg font-semibold mb-2 text-left">
                Input Value
              </label>
              <select
                id="inputValue"
                value={inputvalue}
                onChange={handleBloodPressureChange}
                className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select...</option>
                <option value="Less than 90/60">Less than 90/60</option>
                <option value="Between 90/60 and 120/80">Between 90/60 and 120/80</option>
                <option value="More than 120/80">More than 120/80</option>
              </select>
            </div>
          )}
          {selectedParameter !== "Blood Pressure (mmHg)" && (
            <div className="w-full max-w-lg">
              <label htmlFor="inputValue" className="text-lg font-semibold mb-2 text-left">
                Input Value
              </label>
              <input
                type="text"
                id="inputValue"
                value={calculatedSum}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-cyan-500 text-black font-semibold px-2 py-1 rounded block mb-4 mr-2"
            style={{ minWidth: '110px', fontSize: '1rem', padding: '0.7rem 1.2rem !important' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Parameters;
