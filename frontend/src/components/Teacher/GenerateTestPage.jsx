import React from "react";
import { useState } from "react";
import { ApiError } from "../../../../backend/utils/apiError.utils";
import axios from "axios";

function GenerateTestPage() {
  const [link, setLink] = useState("");
  const [topic, setTopic] = useState("");
  const [noOfQ, setNoOfQ] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [error,setError] = useState("");

  const getUrl = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const response = await axios.post(
       
        `${import.meta.env.VITE_BACKEND_URL}/teacher/generateTest`,
        {
          topic: topic,
          noOfQ,
          difficulty,
          duration,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setLink(
        `https://test-sphere.vercel.app/student/StudentRegister/${response.data.data.dataUrl}`
      );
      
      



    } catch (error) {
      console.error(error);
      setError("Please login !!")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Generate Test
        </h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Topic"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Number of Questions"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={noOfQ}
              onChange={(e) => {
                setNoOfQ(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              placeholder="Duration (minutes)"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 rounded hover:opacity-90 transition-opacity"
            onClick={getUrl}
          >
            Generate Test URL
          </button>
        </form>
        <div>
          {link && (
            <>
              <h1 className="text-center">{link}</h1>
              <h1 className="text-center">
                Please share this link with your class to attempt the test !
              </h1>
            </>
          )}
          {error && (
            <>
              <h1 className="text-center">Please login-in  & try again</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateTestPage;
