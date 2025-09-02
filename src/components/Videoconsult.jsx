import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, Send, Sparkles, Heart, Star } from 'lucide-react';

const MedicalConsultationPlatform = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const localVideoRef = useRef(null);
  const callTimerRef = useRef(null);

  // Call timer effect
  useEffect(() => {
    if (isInCall) {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isInCall]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Handle video stream assignment
  useEffect(() => {
    const videoElement = localVideoRef.current;
    
    if (stream && videoElement && isInCall) {
      console.log('Setting up video stream');
      
      videoElement.srcObject = null;
      videoElement.srcObject = stream;
      
      const playVideo = async () => {
        try {
          await videoElement.play();
          console.log('Video playing successfully');
        } catch (error) {
          console.error('Error playing video:', error);
          setCameraError('Failed to display video. Please try again.');
        }
      };
      
      videoElement.addEventListener('loadedmetadata', playVideo);
      
      return () => {
        videoElement.removeEventListener('loadedmetadata', playVideo);
      };
    }
  }, [stream, isInCall]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = async () => {
    try {
      setIsConnecting(true);
      setCameraError('');
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      console.log('Requesting media access...');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'user'
        }, 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log('Media stream obtained:', mediaStream);
      
      const videoTracks = mediaStream.getVideoTracks();
      if (videoTracks.length === 0) {
        throw new Error('No video track available');
      }
      
      setStream(mediaStream);
      setIsInCall(true);
      setIsConnecting(false);
      
    } catch (error) {
      setIsConnecting(false);
      console.error('Error accessing media devices:', error);
      
      if (error.name === 'NotAllowedError') {
        setCameraError('Camera access denied. Please allow camera and microphone permissions and try again.');
      } else if (error.name === 'NotFoundError') {
        setCameraError('No camera found. Please make sure your camera is connected.');
      } else if (error.name === 'NotReadableError') {
        setCameraError('Camera is already in use by another application.');
      } else {
        setCameraError(`Camera error: ${error.message}`);
      }
    }
  };

  const endCall = () => {
    console.log('Ending call...');
    
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track.kind);
      });
      setStream(null);
    }
    
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    
    setIsInCall(false);
    setIsVideoOn(true);
    setIsAudioOn(true);
    setCallDuration(0);
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
        console.log('Video toggled:', videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
        console.log('Audio toggled:', audioTrack.enabled);
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: false
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate doctor response
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me help you with that.",
          "Thank you for sharing that information. Could you tell me more?",
          "That's helpful to know. How long have you been experiencing this?",
          "I see. Let's discuss this in more detail.",
          "Based on what you're telling me, I'd like to ask a few questions.",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const doctorResponse = {
          id: Date.now() + 1,
          sender: 'Dr. Sarah Johnson',
          message: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: true
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 1500);
    }
  };

  // Connecting Screen
  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-white border-opacity-30 rounded-full animate-ping flex items-center justify-center">
            <Video size={40} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Connecting to Dr. Sarah Johnson...</h2>
        <p className="text-blue-100">Please wait while we establish the connection</p>
      </div>
    );
  }

  // Welcome Screen
  if (!isInCall) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center p-8 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white bg-opacity-30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 20}%`,
                animationDelay: `${i}s`,
                animationDuration: '6s'
              }}
            />
          ))}
        </div>

        <div className="bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-white border-opacity-20 animate-pulse">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
              <Heart size={35} className="text-white animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              HealthConnect Pro
            </h1>
            <p className="text-gray-600 font-medium">Your trusted medical consultation platform</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 shadow-inner border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-4xl">👩‍⚕️</div>
              <div className="text-left flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Dr. Sarah Johnson</h3>
                <p className="text-sm text-gray-600 mb-2">General Medicine Specialist</p>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600">(324 reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Available now
                </div>
              </div>
            </div>
          </div>
          
          {cameraError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-700">
              <span className="text-lg">⚠️</span>
              <span className="text-sm font-medium">{cameraError}</span>
            </div>
          )}
          
          <button 
            onClick={startCall} 
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 mb-6"
          >
            <Sparkles size={20} className="animate-spin" />
            Start Video Consultation
          </button>
          
          <div className="flex justify-center gap-8 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Video size={14} />
              <span>HD Video Call</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles size={14} />
              <span>Instant Connect</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Video Call Interface
  return (
    <div className="flex h-screen bg-gray-50 pt-30">
      {/* Video Area */}
      <div className="flex-1 relative bg-black flex flex-col">
        {/* Remote Video (Doctor) */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">👩‍⚕️</div>
            <h3 className="text-2xl font-semibold mb-2">Dr. Sarah Johnson</h3>
            <p className="text-blue-100 mb-4">General Medicine Specialist</p>
            <div className="inline-flex items-center gap-2 bg-green-500 bg-opacity-20 border border-green-400 rounded-full px-4 py-2 animate-pulse">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              Connected
            </div>
            
            {/* Audio Wave Animation */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-green-400 rounded-full animate-pulse"
                  style={{
                    height: '20px',
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Local Video PiP */}
          <div className="absolute top-5 right-5 w-48 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-black">
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline
              muted 
              className={`w-full h-full object-cover ${isVideoOn && stream ? 'block' : 'hidden'}`}
            />
            {(!isVideoOn || !stream) && (
              <div className="absolute inset-0 bg-gray-700 flex flex-col items-center justify-center text-white">
                <VideoOff size={24} className="mb-2" />
                <span className="text-xs">
                  {!stream ? 'No Camera' : 'Camera Off'}
                </span>
              </div>
            )}
            <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs text-center">
              You {!isVideoOn && '(Camera Off)'}
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black bg-opacity-80 backdrop-blur-lg p-4 rounded-full border border-white border-opacity-10">
          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg ${
              isAudioOn 
                ? 'bg-white text-gray-800 hover:bg-gray-100' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            title={isAudioOn ? 'Mute' : 'Unmute'}
          >
            {isAudioOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg ${
              isVideoOn 
                ? 'bg-white text-gray-800 hover:bg-gray-100' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>
          
          <button 
            onClick={endCall} 
            className="w-14 h-14 rounded-full border-none bg-red-500 hover:bg-red-600 text-white cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
            title="End call"
          >
            <Phone size={20} className="transform rotate-45" />
          </button>
        </div>

        {/* Call Info */}
        <div className="absolute top-5 left-5 flex gap-4">
          <div className="bg-black bg-opacity-70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white border-opacity-10">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="font-mono text-sm">{formatTime(callDuration)}</span>
          </div>
          <div className="bg-black bg-opacity-70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white border-opacity-10">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-green-400 rounded-full animate-pulse"
                  style={{
                    height: i === 1 ? '12px' : '8px',
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <span className="text-xs">Excellent</span>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-96 bg-white flex flex-col border-l border-gray-200 shadow-xl">
        {/* Chat Header */}
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl border-2 border-white border-opacity-30">
              👩‍⚕️
            </div>
            <div>
              <h3 className="font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-sm text-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Online • Responds quickly
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Heart size={24} className="mx-auto mb-4 text-red-400 animate-pulse" />
              <p className="font-medium mb-1">Welcome! Feel free to ask any health questions.</p>
              <span className="text-sm">Dr. Johnson is here to help you</span>
            </div>
          )}
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.isDoctor ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                  message.isDoctor 
                    ? 'bg-gray-100 text-gray-900 rounded-bl-md' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                }`}>
                  <p className="text-sm mb-1 font-medium leading-relaxed">{message.message}</p>
                  <span className="text-xs opacity-70">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="flex gap-3 bg-gray-50 rounded-full p-2 border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700 font-medium placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={`w-10 h-10 rounded-full border-none flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                newMessage.trim() 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer shadow-lg hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MedicalConsultationPlatform;