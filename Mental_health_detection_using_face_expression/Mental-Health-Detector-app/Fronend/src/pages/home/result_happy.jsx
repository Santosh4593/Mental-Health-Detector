import React from "react";
import { useParams } from "react-router-dom";

const ResultHappy = () => {
  const { calculatedSum, emo } = useParams();

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/happy.jpeg')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto" style={{ marginLeft: '210px' }}>
        <h1 className="text-3xl font-bold mb-4 md:text-center text-cyan-600">
          Result Page
        </h1>
        <p>Total Score: {calculatedSum ? calculatedSum : 0}</p>
        <p className="text-lg mt-4">Mental Health: Happy</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">Ways to maintain mental well-being:</p>
          <ul className="list-disc list-inside">
            <li>Practice gratitude and mindfulness daily.</li>
            <li>Engage in hobbies and activities you enjoy.</li>
            <li>Stay connected with friends and family.</li>
            <li>Get regular exercise and maintain a healthy lifestyle.</li>
            <li>Set aside time for relaxation and self-care.</li>
            <li>Avoid excessive stress and prioritize self-care.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultHappy;
