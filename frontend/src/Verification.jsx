import { Camera, Check, Sparkles, Shield } from 'lucide-react';
import { useState, useRef } from 'react';
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router';


export default function Verification() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

const startCamera = async () => {
  setError(null);
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }
    });

    setStream(mediaStream);
    setIsCapturing(true); 
  } catch (err) {
    if (err.name === "NotAllowedError") {
      setError("Camera access denied.");
    } else if (err.name === "NotFoundError") {
      setError("No camera found.");
    } else {
      setError("Unable to access camera.");
    }
  }
};

useEffect(() => {
  if (isCapturing && videoRef.current && stream) {
    videoRef.current.srcObject = stream;
    videoRef.current.muted = true;

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
    };
  }
}, [isCapturing, stream]);


  const capturePhoto = () => {
  if (!videoRef.current || !canvasRef.current) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  setCapturedImage(canvas.toDataURL("image/png"));

  stream.getTracks().forEach(track => track.stop());

  setIsCapturing(false);
};

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsVerifying(false);
    setError(null);
    setVerificationComplete(false);
    startCamera();
  };

  const verifyGender = async (imageDataUrl) => {
  try {
    setIsVerifying(true);
    setError(null);

    const deviceId = localStorage.getItem("deviceId");

    // Convert data URL to a Blob so FormData sends a real file
    const res = await fetch(imageDataUrl);
    const blob = await res.blob();

    const formData = new FormData();
    formData.append("deviceId", deviceId);
    formData.append("image", blob, "selfie.jpg");

    const response = await axios.post(
      "http://localhost:3000/api/gender/verify",
      formData,
      {
        headers: {
          
        },
      }
    );

    if (response.data && response.data.success) {
      console.log("Gender verified:", response.data.gender);
      setVerificationComplete(true);
      setIsVerifying(false);
       
  
    } else {
      console.error("Verification failed:", response.data && response.data.error);
      setError(response.data && response.data.error ? response.data.error : "Verification failed. Please try again.");
      setIsVerifying(false);
    }
  } catch (err) {
    console.error("Error verifying gender:", err);
   
    const msg = err?.message || String(err);
    setError(msg.includes("Permission") || msg.includes("Camera") ? "Camera access denied. Please allow camera access." : "Failed to verify. Please try again.");
    setIsVerifying(false);
  }
   navigate('/create-profile');
};

  return (
    <div className="min-h-screen min-w-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6 animate-pulse">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl text-white mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AnonChat
            </span>
            !
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Just one quick snap and you're in!</span>
          </div>
          
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Let's verify you're human. Don't worry, we won't store your photo—it's just for verification!
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
          {/* Camera Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Take a Photo</h2>
            </div>
            
            <div className="relative bg-gray-950 rounded-2xl overflow-hidden border-2 border-gray-800 aspect-video flex items-center justify-center">
              {!isCapturing && !capturedImage && (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-500 mb-6">Camera preview will appear here</p>
                  <button
                    onClick={startCamera}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
                  >
                    Start Camera
                  </button>
                </div>
              )}
              
              {isCapturing && !capturedImage && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    onClick={capturePhoto}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg shadow-purple-500/50"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                </>
              )}
              
              {capturedImage && (
                <>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {!isVerifying && !verificationComplete && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
                      <button
                        onClick={() => verifyGender(capturedImage)}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
                      >
                        Verify Photo
                      </button>
                      <button
                        onClick={retakePhoto}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-200 border border-gray-700"
                      >
                        Retake
                      </button>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Captured
                  </div>
                  {isVerifying && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white font-semibold">Verifying...</p>
                      </div>
                    </div>
                  )}
                  {verificationComplete && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-green-400" />
                        </div>
                        <p className="text-white font-bold text-xl">Verification Complete!</p>
                        <p className="text-gray-300 text-sm mt-2">Redirecting...</p>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Your privacy matters. We only verify, never store your photos.
        </p>
      </div>
    </div>
  );
}