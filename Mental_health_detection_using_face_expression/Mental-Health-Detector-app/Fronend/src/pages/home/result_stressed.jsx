import React from "react";
import { useParams } from "react-router-dom";

const ResultStress = () => {
  const { calculatedSum, emo } = useParams();

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/Sad.jpeg')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto" style={{ marginRight: '200px' }}>
        <h1 className="text-3xl font-bold mb-4 md:text-center text-cyan-600">
          Result Page
        </h1>
        <p>Total Score: {calculatedSum}</p>
        <p className="text-lg mt-4">Mental Health: Stressed</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">Ways to handle Stress:</p>
          <ul className="list-disc list-inside">
            <li>Deep breathing for instant calm.</li>
            <li>Regular exercise for endorphin release.</li>
            <li>Healthy lifestyle choices for resilience.</li>
            <li>Efficient time management to reduce overwhelm.</li>
            <li>Mindfulness and meditation for mental clarity.</li>
            <li>Seek support from loved ones or professionals.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultStress;
