import React, { useEffect, useState, useRef } from "react";
import { X, Mic } from "lucide-react";

// Define custom Tailwind keyframes and styles directly
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 15px rgba(129, 140, 248, 0.7);
    }
    50% {
      box-shadow: 0 0 30px rgba(129, 140, 248, 1);
    }
  }

  @keyframes pulseSlow {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes wave {
    0%, 100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(1.5);
    }
  }
`;

const VirtualAssistantCard = ({ isOpen, onClose, onVoiceSubmit,botReply,shouldSpeak,onSpoken}) => {
    const [isListening, setIsListening] = useState(false);
    const [speechResult, setSpeechResult] = useState("");
    const recognitionRef = useRef(null);
    // Speak bot reply whenever it changes
  useEffect(() => {
    if (shouldSpeak && botReply) {
      speakText(botReply);
      if (onSpoken) onSpoken(); // ✅ Safely call if defined
    }
  }, [botReply,shouldSpeak, onSpoken]);

  // Function to speak text
  const speakText = (text) => {
    if (!window.speechSynthesis) {
      console.error("SpeechSynthesis not supported");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // adjust speaking speed
    utterance.pitch = 1; // adjust pitch
    window.speechSynthesis.cancel(); // Stop previous speech
    window.speechSynthesis.speak(utterance);
    
  };

    useEffect(() => {
        // Inject custom styles
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = "en-US";

                recognitionRef.current.onstart = () => {
                    setIsListening(true);
                };

                recognitionRef.current.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    // Set the state directly, without logging to console
                    setSpeechResult(transcript);
                    setIsListening(false);
                    recognitionRef.current.stop();
                    // 🔥 Send speech to chatbot automatically
                    if (onVoiceSubmit) {
                        onVoiceSubmit(transcript);
                    }
                };

                recognitionRef.current.onerror = (event) => {
                    console.error("Speech recognition error:", event.error);
                    setIsListening(false);
                    if (event.error === 'no-speech' || event.error === 'network') {
                        console.log("No speech detected, restarting listening...");
                        setTimeout(() => {
                            if (isOpen) {
                                startListening();
                            }
                        }, 500);
                    } else {
                        recognitionRef.current.stop();
                    }
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            } else {
                console.error("Speech Recognition API is not supported in this browser.");
            }
        }
    }, [onVoiceSubmit]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            stopListening();
        }
        return () => {
            document.body.style.overflow = "auto";
            stopListening();
        };
    }, [isOpen]);

    const startListening = () => {
        if (isListening || !recognitionRef.current) return;

        setSpeechResult("");

        try {
            recognitionRef.current.start();
        } catch (e) {
            console.error("Error starting speech recognition:", e);
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (!recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn transition-opacity">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-[90%] max-w-sm p-8 relative transform transition-all duration-300 scale-100">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            aria-label="Close virtual assistant"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Virtual Assistant Avatar and Content */}
                        <div className="flex flex-col items-center space-y-6">
                            <div className="relative">
                                <button
                                    onClick={isListening ? stopListening : startListening}
                                    className="rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                                    aria-label={isListening ? "Stop listening" : "Start listening"}
                                >
                                    <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isListening ? 'bg-gradient-to-tr from-blue-400 to-indigo-600 animate-[pulseGlow_2s_infinite]' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                        <Mic className={`w-14 h-14 transition-colors duration-300 ${isListening ? 'text-white animate-bounce' : 'text-gray-500'}`} />
                                    </div>
                                </button>
                                {isListening && <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-[pulseSlow_3s_infinite_ease-in-out]"></div>}
                            </div>

                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                {isListening ? "Listening..." : "Speak Now"}
                            </h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
                                {isListening
                                    ? "I'm ready when you are. Speak your query clearly."
                                    : "Click the mic to start listening."}
                            </p>

                            {/* Display Recognized Text */}
                            {speechResult && (
                                <div className="text-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl w-full">
                                    <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">
                                        Result:
                                    </p>
                                    <p className="text-md italic text-gray-600 dark:text-gray-300 mt-1">
                                        "{speechResult}"
                                    </p>
                                </div>
                            )}

                            {/* Listening Animation (Conditional) */}
                            {isListening && (
                                <div className="flex space-x-2 mt-4">
                                    <span className="w-3 h-8 bg-blue-500 rounded-full animate-[wave_1s_infinite_ease-in-out]"></span>
                                    <span className="w-3 h-10 bg-indigo-500 rounded-full animate-[wave_1s_infinite_ease-in-out_0.2s]"></span>
                                    <span className="w-3 h-12 bg-purple-500 rounded-full animate-[wave_1s_infinite_ease-in-out_0.4s]"></span>
                                    <span className="w-3 h-10 bg-indigo-500 rounded-full animate-[wave_1s_infinite_ease-in-out_0.6s]"></span>
                                    <span className="w-3 h-8 bg-blue-500 rounded-full animate-[wave_1s_infinite_ease-in-out_0.8s]"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VirtualAssistantCard;