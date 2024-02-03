import React from "react";
import { useParams } from "react-router-dom";

const ResultAnxiety = () => {
  const { calculatedSum, emo } = useParams();

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/Sad.jpeg')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto" style={{ marginRight: '180px' }}>
        <h1 className="text-3xl font-bold mb-4 md:text-center text-cyan-600">
          Result Page
        </h1>
        <p>Total Score: {calculatedSum}</p>
        <p className="text-lg mt-4">Mental Health: Anxiety</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">Ways to handle Anxiety:</p>
          <ul className="list-disc list-inside">
            <li>Practice deep breathing techniques.</li>
            <li>Engage in grounding exercises.</li>
            <li>Challenge negative thoughts with positive affirmations.</li>
            <li>Create a routine for stability and predictability.</li>
            <li>Limit caffeine and alcohol intake.</li>
            <li>Seek professional help if symptoms persist.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultAnxiety;
