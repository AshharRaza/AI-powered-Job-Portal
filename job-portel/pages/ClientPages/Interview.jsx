import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AiInterview = () => {
  const [isListening, setIsListening] = useState(false);
  const [aiResponses, setAiResponses] = useState([]);
  const [userTranscript, setUserTranscript] = useState("");
  const navigate = useNavigate()

  // Fake AI response (replace with your backend later)
  const mockAiResponse = (text) => {
    setAiResponses((prev) => [...prev, { from: "ai", text }]);
    // Simulate text-to-speech
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  // Toggle microphone for speech-to-text
  let recognition; // 👈 keep it outside so you can stop later

const toggleMic = () => {
  if (!isListening) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = true; // 👈 keeps listening
    recognition.interimResults = false; // 👈 only final results

    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setUserTranscript(transcript);
      console.log("User said:", transcript);

      const data = await SendResponseAi(transcript);

      setAiResponses((prev) => [...prev, { from: "user", text: transcript }]);
      mockAiResponse(`${data}`);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // 👈 Restart if still in listening mode
      }
    };
  } else {
    // stop listening
    recognition.stop();
  }
  setIsListening(!isListening);
};

  // console.log(aiResponses)
    
  const SendResponseAi = async(text) => {

    console.log("text,",text)
    const res = await fetch('http://localhost:3000/airesponse',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      
      body:JSON.stringify({message:text})
    })
    const data = await res.json()
    return data
  }

  const CheckAuthInterview = async() => {

    const res = await fetch("http://localhost:3000/authinterview",{
      method:'GET',
      credentials:'include'
    })
    console.log(res)
    if(!res.ok){
      alert("Please Login")
      navigate("/login")
      
    }

  }

  useEffect(() => {

    CheckAuthInterview()

  },[])


  return (
   <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
            <h1 className="text-2xl font-bold text-gray-800">AI Interview Platform</h1>
            <p className="text-sm text-gray-500">Powered by xAI</p>
          </header>

          {/* Main */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Section - Video Call */}
            <div className="flex-1 flex flex-col items-center justify-center bg-white relative">
              {/* AI Avatar */}
              <div className="absolute top-6 left-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg border border-indigo-300 transition-transform hover:scale-105">
                  <span className="text-white font-semibold text-lg">AI</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">Interviewer</p>
              </div>

              {/* Candidate Avatar */}
              <div className="absolute bottom-6 right-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center shadow-lg border border-gray-200 transition-transform hover:scale-105">
                  <span className="text-gray-800 font-semibold text-lg">You</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">Candidate</p>
              </div>

              {/* Center Placeholder */}
              <div className="text-center">
                <p className="text-gray-500 text-lg font-medium animate-pulse">
                  AI Interview in Progress...
                </p>
              </div>

              {/* Mic Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={toggleMic}
                  className={`p-4 rounded-full shadow-xl transition-all duration-300 ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
              </div>
            </div>

            {/* Right Section - Chat */}
            <div className="w-1/3 bg-gray-50 p-6 flex flex-col border-l border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Conversation
              </h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {aiResponses.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl max-w-[80%] shadow-md transition-all duration-200 ${
                      msg.from === "ai"
                        ? "bg-indigo-600 text-white self-start rounded-bl-sm"
                        : "bg-white text-gray-800 self-end rounded-br-sm border border-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* User transcript hint */}
              <div className="mt-4 text-sm text-gray-600 italic">
                {userTranscript && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    </svg>
                    You said: "{userTranscript}"
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
