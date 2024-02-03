import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const Guidelines = () => {
  useAuth();
  const [image, setImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [decodedImage, setDecodedImage] = useState('');
  const navigate = useNavigate();
  const videoRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setDecodedImage(''); // Reset decoded image
  };

  const decodeBase64Image = () => {
    if (!image) {
      console.error("No image available for decoding");
      return;
    }

    // Convert data URL string to Blob if necessary
    const imageData = typeof image === "string" ? dataURItoBlob(image) : image;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setDecodedImage(`data:image/jpeg;base64,${base64String}`);
    };
    reader.readAsDataURL(imageData);
  };

  // Function to convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  const handleGetStarted = async () => {
    // Check if image is available
    if (!image) {
      console.error("No image available for submission");
      return;
    }

    // Decode base64 image
    decodeBase64Image();

    // If the image is captured from the webcam, convert it to a Blob object
    let imageData = image;
    if (typeof image === "string") {
      const byteString = atob(image.split(",")[1]);
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
      imageData = new Blob([arrayBuffer], { type: mimeString });
    }

    // Create FormData object to send the image as multipart/form-data
    const formData = new FormData();
    formData.append("file", imageData, "image.jpg");

    // Make API call on submit
    try {
      const response = await fetch("http://127.0.0.1:8000/detect_emotion", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setApiResult(result);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleSurvey = () => {
    if (apiResult && apiResult.emotion) {
      if(apiResult.emotion === 'sad')
        navigate("/sad");
      else if(apiResult.emotion === 'angry')
        navigate("/angry");
      else if(apiResult.emotion === 'happy')
        navigate("/happy");
      else if(apiResult.emotion === 'neutral')
        navigate("/neutral");
    } else {
      console.error("Emotion not detected");
      // Handle the case where the emotion is not detected
      // navigate("/quiz");
    }
  };

  const handleWebcamCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setImage(dataUrl);
    setDecodedImage(dataUrl);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // stop the webcam
  };

  return (
    // <div className="h-screen mt-18 flex justify-center items-center bg-gray-100 overflow-y-auto">
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-20 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/guidelines_bg.png')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-20 mb-20 mx-auto" style={{ marginLeft: '210px' }}>
        <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
          Emotion Detection
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-2 text-left">Upload Image</h2>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleFileChange}
              className="mb-4"
            />
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-2 text-left">Webcam</h2>
            {decodedImage ? (
              <img src={decodedImage} alt="Captured Image" className="w-full h-auto max-h-48 object-cover" />
            ) : (
              <video ref={videoRef} autoPlay muted className="w-full h-auto max-h-48 object-cover" />
            )}
            <div className="flex justify-center">
              <button
                onClick={handleWebcamCapture}
                className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4 mr-2"
              >
                Open Webcam
              </button>
              {!decodedImage && (
                <button
                  onClick={captureImage}
                  className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4 mr-2"
                >
                  Capture Image
                </button>
              )}
            </div>
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4 mr-2"
            >
              Submit
            </button>
            {apiResult && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{apiResult.emotion}</h2>
                <img src={`data:image/png;base64, ${apiResult.result_image_base64}`} alt="Result Image" className="max-w-full h-auto object-cover" />
                <div className="mt-4">
                  <button
                    onClick={handleSurvey}
                    className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4 mr-2"
                  >
                    Start Survey
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
