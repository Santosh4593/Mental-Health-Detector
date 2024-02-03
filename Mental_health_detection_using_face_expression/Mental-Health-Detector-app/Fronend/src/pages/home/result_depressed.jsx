import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResultDepressed = () => {
  const { calculatedSum, emo } = useParams();

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/Sad.jpeg')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto" style={{ marginRight: '150px' }}>
        <h1 className="text-3xl font-bold mb-4 md:text-center text-cyan-600">
          Result Page
        </h1>
        <p>Total Score: {calculatedSum}</p>
        <p className="text-lg mt-4">Mental Health: Depressed</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">Ways to cope with depression:</p>
          <ul className="list-disc list-inside">
            <li>Seek professional help or counseling.</li>
            <li>Engage in regular physical activity.</li>
            <li>Practice relaxation techniques such as meditation or deep breathing exercises.</li>
            <li>Connect with supportive friends and family members.</li>
            <li>Set small, achievable goals to regain a sense of accomplishment.</li>
            <li>Avoid alcohol and drugs, as they can worsen depression.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultDepressed;
